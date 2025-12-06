import createError from "http-errors";
import Blog from "../../../model/blog.model.js";
import User from "../../../model/user.model.js";
import Comment from "../../../model/comment.model.js";
import { imagekit } from "../../../utils/imageKit.js";

const adminBlogService = {
  getAllBlog: async (
    userId,
    limit = 6,
    page = 1,
    search = "",
    status = "",
    categorySlug = "",
    sortBy = "createdAt",
    orderBy = "asc"
  ) => {
    if (!userId) throw createError.BadRequest("User ID is required");
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");

    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (categorySlug) {
      filter.categorySlug = { $regex: categorySlug, $options: "i" };
    }

    if (status) {
      filter.status = status;
    }
    const sortOptions = {};
    const allowedSortBy = ["createdAt", "views", "title"];
    if (sortBy && allowedSortBy.includes(sortBy))
      sortOptions[sortBy] = orderBy === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(filter)
      .select("-content -imageId -comments -likes -catergorySlug -readingTime")
      .populate("author", "username avatar email")
      .populate("categoryId", "name slug")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBlogs = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalBlogs / limit);
    const totalViews = blogs
      .map((blog) => blog.views)
      .reduce((a, b) => a + b, 0);

    const meta = {
      totalBlogs,
      totalPages,
      pageSize: limit,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return {
      blogs,
      meta,
      totalViews,
    };
  },

  getBlog: async (userId, blogId) => {
    if (!userId) throw createError.BadRequest("User ID is required");
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const blog = await Blog.findById(blogId)
      .select(" -imageId -likes")
      .populate("author", "username avatar email")
      .populate("categoryId", "name")
      .lean();
    return blog;
  },
  deleteBlog: async (userId, blogId) => {
    if (!userId) throw createError.BadRequest("User ID is required");
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const blog = await Blog.findByIdAndDelete(blogId);
    if (blog.imageId) {
      await imagekit.deleteFile(blog.imageId);
    }
    await Comment.deleteMany({ blog: blog._id });
    return { message: "Blog deleted successfully" };
  },

 getBlogsGrowth: async (userId, range = "month") => {
  if (!userId) throw createError.BadRequest("User ID is required");
  const admin = await User.findOne({ _id: userId, role: "admin" });
  if (!admin) throw createError.Unauthorized("You are not authorized");

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

 
  if (range === "week") {
    const today = new Date();
    const labels = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      labels.push(dayNames[d.getDay()]);
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);

    const rawData = await Blog.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { day: { $dayOfWeek: "$createdAt" } },
          blogs: { $sum: 1 },
          views: { $sum: "$views" }
        }
      },
      {
        $project: {
          dayName: {
            $arrayElemAt: [dayNames, { $subtract: ["$_id.day", 1] }]
          },
          blogs: 1,
          views: 1,
          _id: 0
        }
      }
    ]);

    const map = new Map(rawData.map(item => [item.dayName, item]));

    const data = labels.map(name => ({
      date: name,
      blogs: map.get(name)?.blogs ?? 0,
      views: map.get(name)?.views ?? 0
    }));

    return { range, data };
  }

 
  if (range === "month") {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const totalDays = endOfMonth.getDate();

    const days = Array.from({ length: totalDays }, (_, i) => String(i + 1));

    const rawData = await Blog.aggregate([
      { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
      {
        $group: {
          _id: { day: { $dayOfMonth: "$createdAt" } },
          blogs: { $sum: 1 },
          views: { $sum: "$views" }
        }
      },
      {
        $project: {
          date: { $toString: "$_id.day" },
          blogs: 1,
          views: 1,
          _id: 0
        }
      }
    ]);

    const map = new Map(rawData.map(i => [i.date, i]));

    const data = days.map(day => ({
      date: day,
      blogs: map.get(day)?.blogs || 0,
      views: map.get(day)?.views || 0
    }));

    return { range, data };
  }

 
  if (range === "year") {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    const rawData = await Blog.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          blogs: { $sum: 1 },
          views: { $sum: "$views" }
        }
      },
      {
        $project: {
          monthIndex: { $subtract: ["$_id.month", 1] },
          blogs: 1,
          views: 1,
          _id: 0
        }
      }
    ]);

    const map = new Map(rawData.map(i => [i.monthIndex, i]));

    const data = monthNames.map((name, index) => ({
      date: name,
      blogs: map.get(index)?.blogs || 0,
      views: map.get(index)?.views || 0
    }));

    return { range, data };
  }
}

};

export default adminBlogService;
