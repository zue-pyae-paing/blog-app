import Blog from "../../model/blog.model.js";
import Comment from "../../model/comment.model.js";
import { imagekit } from "../../utils/imageKit.js";

const blogService = {
  // Get all blogs with pagination
  getAllBlogs: async (page, limit, category, search) => {
    if (!page || !limit) throw new Error("Page and limit are required");
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };
    const blogs = await Blog.find(filter)
      .select("-content -imageId ")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("author", "username avatar email")
      .lean();
    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);
    return { blogs, totalBlogs, totalPages };
  },
  // Get single blog
  getSingleBlog: async (blogId) => {
    if (!blogId) throw new Error("Blog ID is required");
    const blog = await Blog.findById(blogId)
      .select("-imageId ")
      .populate("author", "username avatar email")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username avatar " },
      })
      .lean();
    if (!blog) throw new Error("Blog not found");
    return blog;
  },
  getOwnBlogs: async (userId, limit = 10, cursor = null) => {
    if (!userId) throw new Error("User ID is required");
    const filter = { author: { $eq: userId } };
    if (cursor) {
      filter._id = { $lt: cursor };
    }
    const blogs = await Blog.find(filter)
      .select("-imageId -content")
      .sort({ _id: -1 })
      .limit(limit)
      .populate("author", "username avatar email")
      .lean();

    const nextCursor = blogs.length ? blogs[blogs.length - 1]._id : null;
    return { blogs, nextCursor };
  },
  // Get trending blogs
  getTrendingBlogs: async () => {
    const blogs = await Blog.find()
      .select("-content -imageId")
      .sort({ views: -1, createdAt: -1 })
      .limit(10)
      .populate("author", "username avatar email")
      .lean();

    return blogs;
  },
  getCategories: async () => {
    const categories = await Blog.distinct("category");
    return categories;
  },
  // Create blog
  createBlog: async (userId, blog, file) => {
    if (!file) throw new Error("Image is required");
    if (!blog) throw new Error("Blog is required");
    if (!userId) throw new Error("User ID is required");

    const uploaded = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: "/blogs",
    });

    if (!uploaded || uploaded.error) {
      throw new Error(uploaded?.error?.message || "ImageKit upload failed");
    }
    const words = blog.content?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(words / 200);

    const newBlogData = {
      ...blog,
      image: uploaded.url,
      imageId: uploaded.fileId,
      author: userId,
      readingTime,
    };

    const newBlog = await Blog.create(newBlogData);
    return newBlog;
  },
  // Update blog
  updateBlog: async (userId, blogId, blog, file) => {
    if (!blogId) throw new Error("Blog ID is required");

    const blogToUpdate = await Blog.findById(blogId);
    if (!blogToUpdate) throw new Error("Blog not found");

    if (blogToUpdate.author.toString() !== userId.toString()) {
      throw new Error("You are not authorized to update this blog");
    }

    if (file) {
      try {
        const uploaded = await imagekit.upload({
          file: file.buffer,
          fileName: file.originalname,
          folder: "/blogs",
        });

        if (!uploaded || uploaded.error) {
          throw new Error(uploaded?.error?.message || "ImageKit upload failed");
        }

        if (blogToUpdate.imageId) {
          try {
            await imagekit.deleteFile(blogToUpdate.imageId);
          } catch (err) {
            console.error("Failed to delete old image:", err.message);
          }
        }

        blogToUpdate.image = uploaded.url;
        blogToUpdate.imageId = uploaded.fileId;
        await blogToUpdate.save();
        return blogToUpdate;
      } catch (err) {
        throw new Error("Image upload failed: " + err.message);
      }
    }

    if (blog.title) blogToUpdate.title = blog.title;
    if (blog.content) blogToUpdate.content = blog.content;
    if (blog.category) blogToUpdate.category = blog.category;
    if (blog.tags) blogToUpdate.tags = blog.tags;
    if (blog.description) blogToUpdate.description = blog.description;

    const updatedBlog = await blogToUpdate.save();
    return updatedBlog;
  },
  // Delete blog
  deleteBlog: async (userId, blogId) => {
    if (!blogId) throw new Error("Blog ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");

    if (blog.author.toString() !== userId)
      throw new Error("You are not authorized to delete this blog");

    if (blog.imageId) {
      try {
        await imagekit.deleteFile(blog.imageId);
      } catch (error) {
        throw new Error("Error deleting image from ImageKit");
      }
    }
    await Comment.deleteMany({ blogId });
    await blog.deleteOne();
    return { message: "Blog deleted successfully" };
  },
  // Like blog
  likeBlog: async (userId, blogId) => {
    if (!userId) throw new Error("User ID is required");
    if (!blogId) throw new Error("Blog ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");
    blog.likes.push(userId);
    await blog.save();
    return blog;
  },
  // Unlike blog
  unlikeBlog: async (userId, blogId) => {
    if (!userId) throw new Error("User ID is required");
    if (!blogId) throw new Error("Blog ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");
    blog.likes.pull(userId);
    await blog.save();
    return blog;
  },
};

export default blogService;
