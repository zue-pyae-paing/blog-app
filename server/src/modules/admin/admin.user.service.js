import User from "../../model/user.model.js";
import Blog from "../../model/blog.model.js";
import Comment from "../../model/comment.model.js";
import createError from "http-errors";
import { imagekit } from "../../utils/imageKit.js";

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

    // Search
    if (search) {
      filter.username = { $regex: search, $options: "i" };
    }

    // Status filter
    if (status) {
      const allowedStatus = ["active", "banned"];
      if (!allowedStatus.includes(status)) {
        throw createError.BadRequest("Invalid status filter");
      }
      filter.status = status;
    }

    if (sortBy) {
      const allowedSortBy = ["username", "email", "createdAt"];
      if (!allowedSortBy.includes(sortBy)) {
        throw createError.BadRequest("Invalid sortBy option");
      }
    }
    if (sortStatus) {
      const allowedSortStatus = ["asc", "desc"];
      if (!allowedSortStatus.includes(sortStatus)) {
        throw createError.BadRequest("Invalid sortStatus option");
      }
    }

    const sortOption = {};
    sortOption[sortBy] = sortStatus === "asc" ? 1 : -1;
    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .select("-password -token -resetToken -tokenExpiry")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    return {
      users,
      totalUsers,
      totalPages,
      limit,
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
};

export default adminUserService;
