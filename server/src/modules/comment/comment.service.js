import Comment from "../../model/comment.model.js";
import Blog from "../../model/blog.model.js";

const commentService = {
  getComments: async (blogId, limit = 10, cursor = null) => {
    if (!blogId) throw new Error("Blog ID is required");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");

    const filter = { blogId };

    if (cursor) {
      filter._id = { $lt: cursor };
    }

    const comments = await Comment.find(filter)
      .populate("author", "username avatar email")
      .sort({ _id: -1 })
      .limit(limit)
      .lean();

    const nextCursor =
      comments.length === limit ? comments[comments.length - 1]._id : null;

    const totalComments = await Comment.countDocuments({ blogId });
    const hasMore = nextCursor !== null && comments.length === limit;

    return {
      comments,
      totalComments,
      nextCursor,
      hasMore,
    };
  },

  createComment: async (userId, blogId, content) => {
    if (!userId) throw new Error("User ID is required");
    if (!blogId) throw new Error("Blog ID is required");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");

    let newComment = await Comment.create({
      content,
      author: userId,
      blogId,
    });

    newComment = await newComment.populate("author", "username email avatar");

    blog.comments.push(newComment._id);
    await blog.save();

    return newComment;
  },

  getComment: async (blogId, userId, commentId) => {
    if (!blogId) throw new Error("Blog ID is required");
    if (!userId) throw new Error("User ID is required");
    if (!commentId) throw new Error("Comment ID is required");

    const existingBlog = await Blog.findOne({ _id: blogId, userId });
    if (!existingBlog) throw new Error("Blog not found");
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    return comment;
  },
  editComment: async (userId, blogId, commentId, content) => {
    if (!userId) throw new Error("User ID is required");
    if (!commentId) throw new Error("Comment ID is required");
    if (!blogId) throw new Error("Blog ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    if (comment.author.toString() !== userId)
      throw new Error("You are not authorized to edit this comment");
    comment.content = content;
    await comment.save();
    return comment;
  },
  deleteComment: async (userId, blogId, commentId) => {
    if (!userId) throw new Error("User ID is required");
    if (!commentId) throw new Error("Comment ID is required");
    if (!blogId) throw new Error("Blog ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    if (comment.author.toString() !== userId)
      throw new Error("You are not authorized to delete this comment");
    blog.comments.pull(commentId);
    await blog.save();
    await comment.deleteOne();
    return { message: "Comment deleted successfully" };
  },
};

export default commentService;
