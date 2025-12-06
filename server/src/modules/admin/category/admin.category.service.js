import User from "../../../model/user.model.js";
import Blog from "../../../model/blog.model.js";
import Category from "../../../model/category.model.js";
import Comment from "../../../model/comment.model.js";
import createError from "http-errors";
import { imagekit } from "../../../utils/imageKit.js";


const adminCategoryService = {
  getAllCategory: async (
    userId,
    search,
    limit = 6,
    page = 1,
    orderBy = "asc"
  ) => {
    if (!page && limit)
      throw createError.BadRequest(
        "Page number is required when limit is specified"
      );
    if (!userId) throw createError.BadRequest("User ID is required");

    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");

    let filter = {};

    if (search) {
      filter = { name: { $regex: search, $options: "i" } };
    }

    let skip = (page - 1) * limit;
    let sortOption = {};

    if (orderBy === "asc") {
      sortOption = { createdAt: 1 };
    } else if (orderBy === "desc") {
      sortOption = { createdAt: -1 };
    }
    const categories = await Category.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortOption)
      .lean();

    const currentPage = Number(page);
    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories / limit);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    const pageSize = Number(limit);

    const meta = {
      currentPage,
      totalCategories,
      totalPages,
      pageSize,
      hasNextPage,
      hasPrevPage,
    };

    const categoryWithValue = await Promise.all(
      categories.map(async (category) => {
        const blogCount = await Blog.countDocuments({
          categoryId: category._id,
        });
        return {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          value: blogCount,
          createdAt: category.createdAt,
        };
      })
    );

    return {
      categories: categoryWithValue,
      meta,
    };
  },
  getCategory: async (id, slug) => {
    if (!id) throw createError.BadRequest("User ID is required");
    const admin = await User.findOne({ _id: id, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const category = await Category.findOne({ slug }).lean();
    if (!category) throw createError.NotFound("Category not found");
    return category;
  },
  addCategory: async (userId, name) => {
    if (!userId) throw createError.BadRequest("User ID is required");
    const slug = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) throw createError.Conflict("Category already exists");
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const newCategory = await Category.create({
      name,
      slug,
    });
    return newCategory;
  },
  updateCategory: async (userId, slug, category) => {
    if (!userId) throw createError.BadRequest("User ID is required");

    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const newSlug = category.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
    const updatedCategory = await Category.findOneAndUpdate(
      { slug },
      { name: category, slug: newSlug },
      { new: true }
    );

    return updatedCategory;
  },

  deleteCategory: async (userId, slug) => {
    if (!userId) throw createError.BadRequest("User ID is required");
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    if (!slug) throw createError.BadRequest("Category slug required");
    const category = await Category.findOne({ slug });
    if (!category) throw createError.NotFound("Category not found");

    const blogs = await Blog.find({ categoryId: category._id }).lean();

    if (blogs.length === 0) {
      await Category.deleteOne({ _id: category._id });
      return {
        success: true,
        message: "Category deleted successfully",
        deletedCategory: category,
      };
    }

    for (const blog of blogs) {
      if (blog.imageId) {
        try {
          await imagekit.deleteFile(blog.imageId);
        } catch (err) {
          throw createError.InternalServerError(
            "Failed to delete blog image from ImageKit: " + err.message
          );
        }
      }
    }
    await Blog.deleteMany({ categoryId: category._id });
    await Comment.deleteMany({
      blogId: { $in: blogs.map((b) => b._id) },
    });
    await Category.deleteOne({ _id: category._id });
    return {
      success: true,
      message: "Category deleted successfully",
      deletedCategory: category,
    };
  },
  getCategoryGrowth: async (userId, range = "month") => {
    if (!userId) throw createError.BadRequest("User ID is required");
    const admin = await User.findOne({ _id: userId, role: "admin" });
    if (!admin) throw createError.Unauthorized("You are not authorized");
    const categories = await Category.find().lean();
    let startDate = new Date();
    if (range === "week") {
      startDate.setDate(startDate.getDate() - 6);
    } else if (range === "month") {
      startDate.setDate(startDate.getDate() - 29);
    } else if (range === "year") {
      startDate.setMonth(startDate.getMonth() - 11);
    } else {
      throw createError.BadRequest("Invalid range specified");
    }
    const blogs = await Blog.find({ createdAt: { $gte: startDate } }).lean();
    const growthData = categories.map((category) => {
      const categoryBlogs = blogs.filter(
        (blog) => blog.categoryId.toString() === category._id.toString()
      );
      return {
        name: category.name,
        blogs: categoryBlogs.length,
      };
    });
    return { growthData };
  },
};
export default adminCategoryService;
