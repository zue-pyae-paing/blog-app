import User from "../../../model/user.model.js";
import Blog from "../../../model/blog.model.js";
import Comment from "../../../model/comment.model.js";
import createError from "http-errors";
import { imagekit } from "../../../utils/imageKit.js";

const adminUserService = {
  getAllUser: async (
    userId,
    limit = 10,
    page = 1,
    search = "",
    status = "",
    sortBy = "createdAt",
    orderBy = "asc"
  ) => {
    if (!userId) throw createError.BadRequest("User ID is required");

    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");

    const filter = {};

    if (search) {
      filter.username = { $regex: search, $options: "i" };
    }

    if (status) {
      const allowedStatus = ["active", "banned", ""];
      if (!allowedStatus.includes(status)) {
        throw createError.BadRequest("Invalid status filter");
      }
      filter.status = status;
    }

    const allowedSortBy = ["username", "email", "createdAt"];
    const allowedSortStatus = ["asc", "desc"];
    if (!allowedSortBy.includes(sortBy))
      throw createError.BadRequest("Invalid sortBy");
    if (!allowedSortStatus.includes(orderBy))
      throw createError.BadRequest("Invalid sortStatus");

    const sortOption = { [sortBy]: orderBy === "asc" ? 1 : -1 };

    const skip = (page - 1) * limit;

    const users = await User.aggregate([
      { $match: filter },

      {
        $lookup: {
          from: "blogs",
          localField: "_id",
          foreignField: "author",
          as: "blogs",
        },
      },

      {
        $addFields: {
          totalBlogs: { $size: "$blogs" },
        },
      },

      {
        $project: {
          password: 0,
          token: 0,
          refreshToken: 0,
          tokenExpiry: 0,
          avatarId: 0,
          blogs: 0,
        },
      },

      { $sort: sortOption },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    const meta = {
      totalUsers,
      totalPages,
      pageSize: limit,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
    return {
      users,
      meta,
    };
  },
  banUser: async (userId, userIdToBan) => {
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const user = await User.findOne({ _id: userIdToBan, role: "user" });
    if (!user) throw createError.NotFound("User not found");
    user.status = "banned";
    await user.save();
  },
  unbanUser: async (userId, userIdToUnban) => {
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const user = await User.findOne({ _id: userIdToUnban, role: "user" });
    if (!user) throw createError.NotFound("User not found");
    user.status = "active";
    await user.save();
  },
  deleteUser: async (userId, userIdToDelete) => {
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const user = await User.findOne({ _id: userIdToDelete, role: "user" });

    if (user.avatarId) {
      await imagekit.deleteFile(user.avatarId);
    }

    if (!user) throw createError.NotFound("User not found");
    const blogs = await Blog.find({ author: userIdToDelete });

    for (const blog of blogs) {
      if (blog.imageId) {
        await imagekit.deleteFile(blog.imageId);
      }
    }

    await Blog.deleteMany({ author: userIdToDelete });
    await Comment.deleteMany({ author: userIdToDelete });

    await user.deleteOne();
    return { message: "User deleted successfully" };
  },

  getUserGrowth: async (userId, range = "month") => {
    if (!userId) throw createError.BadRequest("User ID is required");

    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");

    let match = {};
    let group = {};
    let timeline = [];

    const now = new Date();

    if (range === "week") {
      const start = new Date();
      start.setDate(now.getDate() - 6);

      match = { createdAt: { $gte: start } };

      group = {
        _id: { $dayOfWeek: "$createdAt" },
        count: { $sum: 1 },
      };

      const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      timeline = weekNames; 
    }

    if (range === "month") {
      const year = now.getFullYear();
      const month = now.getMonth();

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const start = new Date(year, month, 1);

      match = { createdAt: { $gte: start } };

      group = {
        _id: { $dayOfMonth: "$createdAt" },
        count: { $sum: 1 },
      };

      timeline = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }

    if (range === "year") {
      const start = new Date();
      start.setFullYear(now.getFullYear() - 1);

      match = { createdAt: { $gte: start } };

      group = {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      };

      timeline = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    const usersRaw = await User.aggregate([
      { $match: match },
      { $group: group },
      { $sort: { _id: 1 } },
    ]);

    const blogsRaw = await Blog.aggregate([
      { $match: match },
      { $group: group },
      { $sort: { _id: 1 } },
    ]);

    const userMap = Object.fromEntries(
      usersRaw.map((d) => [String(d._id), d.count])
    );

    const blogMap = Object.fromEntries(
      blogsRaw.map((d) => [String(d._id), d.count])
    );

    const monthNames = [
      "",
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
    ];
    const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const result = timeline.map((key, index) => {
      let display;

      if (range === "week") {
        display = weekNames[index];
        key = index + 1;
      } else if (range === "month") {
        display = String(key);
      } else {
        display = monthNames[key];
      }

      return {
        date: display,
        users: userMap[String(key)] || 0,
        blogs: blogMap[String(key)] || 0,
      };
    });

    return result;
  },
};

export default adminUserService;
