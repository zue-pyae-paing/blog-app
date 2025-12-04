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

    return {
      blogs,
      totalPages,
      totalBlogs,
      limit,
      totalViews,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
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

    let match = {};
    let group = {};
    let project = {};

    if (range === "week") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);

      match = {
        createdAt: { $gte: startDate },
      };

      group = {
        _id: { $dayOfWeek: "$createdAt" },
        
        blogs: { $sum: 1 },
        views: { $sum: "$views" },
      };

      project = {
        date: {
          $arrayElemAt: [
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            { $subtract: ["$_id", 1] },
          ],
        },
        blogs: 1,
        views: 1,
        _id: 0,
      };
    } else if (range === "month") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 29);
      match = {
        createdAt: { $gte: startDate },
      };
      group = {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        blogs: { $sum: 1 },
        views: { $sum: "$views" },
      };
      project = {
        date: "$_id",
        blogs: 1,
        views: 1,
        _id: 0,
      };
    } else if (range === "year") {
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);

      match = {
        createdAt: { $gte: startDate },
      };
      group = {
        _id: { month: { $month: "$createdAt" } },
        blogs: { $sum: 1 },
        views: { $sum: "$views" },
      };

      project = {
        date: {
          $arrayElemAt: [
            [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            { $subtract: ["$_id.month", 1] },
          ],
        },
        blogs: 1,
        views: 1,
        _id: 0,
      };
    }
    const data = await Blog.aggregate([
      { $match: match },
      { $group: group },
      { $project: project },
      { $sort: { date: 1 } },
    ]);

    return { range, data };
  },
};

export default adminBlogService;
