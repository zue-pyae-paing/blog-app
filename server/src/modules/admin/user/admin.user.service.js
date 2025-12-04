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
    status = "active",
    sortBy = "createdAt",
    sortStatus = "asc"
  ) => {
    if (!userId) throw createError.BadRequest("User ID is required");

    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");

    const filter = { role: "user" };

    
    if (search) {
      filter.username = { $regex: search, $options: "i" };
    }

   
    if (status) {
      const allowedStatus = ["active", "banned"];
      if (!allowedStatus.includes(status)) {
        throw createError.BadRequest("Invalid status filter");
      }
      filter.status = status;
    }

    
    const allowedSortBy = ["username", "email", "createdAt"];
    const allowedSortStatus = ["asc", "desc"];
    if (!allowedSortBy.includes(sortBy))
      throw createError.BadRequest("Invalid sortBy");
    if (!allowedSortStatus.includes(sortStatus))
      throw createError.BadRequest("Invalid sortStatus");

    const sortOption = { [sortBy]: sortStatus === "asc" ? 1 : -1 };

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

    return {
      users,
      totalUsers,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
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
    let formatList = null;

   
    if (range === "week") {
      const start = new Date();
      start.setDate(start.getDate() - 6);

      match = { createdAt: { $gte: start } };

      group = {
        _id: { $dayOfWeek: "$createdAt" }, 
        count: { $sum: 1 },
      };

      formatList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }

   
    if (range === "month") {
      const start = new Date();
      start.setDate(start.getDate() - 29);

      match = { createdAt: { $gte: start } };

      group = {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      };
    }

  
    if (range === "year") {
      const start = new Date();
      start.setFullYear(start.getFullYear() - 1);

      match = { createdAt: { $gte: start } };

      group = {
        _id: { $month: "$createdAt" }, 
        count: { $sum: 1 },
      };

      formatList = [
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
    }

 
    const users = await User.aggregate([
      { $match: match },
      { $group: group },
      { $sort: { _id: 1 } },
    ]);

   
    const blogs = await Blog.aggregate([
      { $match: match },
      { $group: group },
      { $sort: { _id: 1 } },
    ]);

    
    const result = users.map((u) => {
      const blogData = blogs.find((b) => b._id === u._id);

      return {
        date:
          range === "week"
            ? formatList[u._id - 1] // Sun..Sat
            : range === "year"
            ? formatList[u._id] // Jan..Dec
            : u._id, // "YYYY-MM-DD"

        users: u.count,
        blogs: blogData ? blogData.count : 0,
      };
    });

    return result;
  },
};

export default adminUserService;
