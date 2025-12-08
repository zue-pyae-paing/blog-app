import Blog from "../../model/blog.model.js";
import Comment from "../../model/comment.model.js";
import Category from "../../model/category.model.js";
import { imagekit } from "../../utils/imageKit.js";
import createError from "http-errors";

const blogService = {
  getAllBlogs: async (page, limit, search, category) => {
    if (!page || !limit)
      throw createError.BadRequest("Page and limit are required");
    const filter = { status: "publish" };

    if (search) filter.title = { $regex: search, $options: "i" };

    if (category) filter.categorySlug = { $regex: category, $options: "i" };
    const blogs = await Blog.find(filter)
      .select("-content -imageId -comments -likes")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("author", "username avatar email")
      .populate("categoryId", "name slug")
      .lean();
    const totalBlogs = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalBlogs / limit);
    return { blogs, totalBlogs, totalPages };
  },
  // Get single blog
  getSingleBlog: async (blogId) => {
    if (!blogId) throw createError.BadRequest("Blog ID is required");
    const blog = await Blog.findById(blogId)
      .select("-imageId ")
      .populate("author", "username avatar email")
      .populate("categoryId", "name slug")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username avatar " },
      })
      .lean();
    if (!blog) throw createError.NotFound("Blog not found");
    return blog;
  },
  getOwnBlogs: async (userId, limit = 10, cursor = null, status = "") => {
    if (!userId) throw createError.BadRequest("User ID is required");
    const filter = { author: userId };
    if (status) {
      filter.status = status;
    }
    if (cursor) {
      filter._id = { $lt: cursor };
    }
    const blogs = await Blog.find(filter)
      .select("-imageId -content -comments -likes")
      .populate("categoryId", "name slug")
      .sort({ _id: -1 })
      .limit(limit)
      .lean();

    const nextCursor =
      blogs.length === limit ? blogs[blogs.length - 1]._id : null;
    const hasMore = nextCursor !== null && blogs.length === limit;
    const totalBlogs = await Blog.countDocuments(filter);

    return { blogs, nextCursor, totalBlogs, hasMore };
  },

  // Get trending blogs
  getTrendingBlogs: async () => {
    const blogs = await Blog.find({ status: "publish" })
      .select("-content -imageId")
      .sort({ views: -1, createdAt: -1 })
      .limit(9)
      .populate("author", "username avatar email")
      .populate("categoryId", "name slug")
      .populate("comments", "content author")
      .lean();

    return blogs;
  },
  getCategories: async () => {
    const categories = await Category.find().lean();
    return categories;
  },
  // Create blog
  createBlog: async (userId, blog, file) => {
    if (!file) throw createError.BadRequest("File is required");
    if (!blog) throw createError.BadRequest("Blog is required");
    if (!userId) throw createError.BadRequest("User ID is required");

    const uploaded = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: "/blogs",
    });

    if (!uploaded || uploaded.error) {
      throw createError.InternalServerError(
        uploaded?.error?.message || "ImageKit upload failed"
      );
    }
    const words = blog.content?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(words / 200);

    const categorySlug = await Category.findOne({ _id: blog.categoryId });
    if (!categorySlug) throw createError.BadRequest("Category not found");

    const newBlogData = {
      ...blog,
      image: uploaded.url,
      imageId: uploaded.fileId,
      categoryId: blog.categoryId,
      categorySlug: categorySlug.slug,
      author: userId,
      readingTime,
    };

    const newBlog = await Blog.create(newBlogData);
    return newBlog;
  },
  // Update blog
  updateBlog: async (userId, blogId, blog, file) => {
    if (!blogId) throw createError.BadRequest("Blog ID is required");

    const blogToUpdate = await Blog.findById(blogId);
    if (!blogToUpdate) throw createError.NotFound("Blog not found");

    if (blogToUpdate.author.toString() !== userId.toString()) {
      throw createError.Unauthorized(
        "You are not authorized to update this blog"
      );
    }

    if (file) {
      try {
        const base64Data = file.buffer.toString("base64");
        const uploaded = await imagekit.upload({
          file: base64Data,
          fileName: file.originalname,
          folder: "/blogs",
        });

        if (!uploaded || uploaded.error) {
          throw createError.InternalServerError(
            uploaded?.error?.message || "ImageKit upload failed"
          );
        }

        if (blogToUpdate.imageId) {
          try {
            await imagekit.deleteFile(blogToUpdate.imageId);
          } catch (err) {
            throw createError.InternalServerError("ImageKit delete failed");
          }
        }

        blogToUpdate.image = uploaded.url;
        blogToUpdate.imageId = uploaded.fileId;
      } catch (err) {
        throw createError.InternalServerError("ImageKit upload failed");
      }
    }

    if (blog.title) blogToUpdate.title = blog.title;
    if (blog.content) blogToUpdate.content = blog.content;
    if (blog.categoryId) blogToUpdate.categoryId = blog.categoryId;
    if (
      blog.categoryId &&
      blogToUpdate.categoryId.toString() !== blog.categoryId.toString()
    ) {
      const category = await Category.findById(blog.categoryId);
      if (!category) throw createError.BadRequest("Category not found");
      blogToUpdate.categorySlug = category.slug;
    }

    if (blog.description) blogToUpdate.description = blog.description;

    const updatedBlog = await blogToUpdate.save();
    return updatedBlog;
  },
  // Delete blog
  deleteBlog: async (userId, blogId) => {
    if (!blogId) throw createError.BadRequest("Blog ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw createError.NotFound("Blog not found");

    if (blog.author.toString() !== userId)
      throw createError.Unauthorized(
        "You are not authorized to delete this blog"
      );

    if (blog.imageId) {
      try {
        await imagekit.deleteFile(blog.imageId);
      } catch (error) {
        throw createError.InternalServerError(
          "Failed to delete blog image from ImageKit"
        );
      }
    }
    await Comment.deleteMany({ blogId });
    await blog.deleteOne();
    return { message: "Blog deleted successfully" };
  },
  // Publish Blog
  publishBlog: async (blogId, userId) => {
    if (!blogId) throw createError.BadRequest("Blog ID is required");
    if (!userId) throw createError.BadRequest("User ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw createError.NotFound("Blog not found");
    if (blog.author.toString() !== userId)
      throw createError.Unauthorized(
        "You are not authorized to publish this blog"
      );
    blog.status = "publish";
    await blog.save();
    return blog;
  },
  draftBlog: async (blogId, userId) => {
    if (!blogId) throw createError.BadRequest("Blog ID is required");
    if (!userId) throw createError.BadRequest("User ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw createError.NotFound("Blog not found");
    if (blog.author.toString() !== userId)
      throw createError.Unauthorized(
        "You are not authorized to draft this blog"
      );
    blog.status = "draft";
    await blog.save();
    return blog;
  },
};

export default blogService;
