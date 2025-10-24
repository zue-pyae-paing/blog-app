import Comment from "../../model/comment.model.js";
import Blog from "../../model/blog.model.js";

const commentService = {
  getComments: async (blogId) => {
    if (!blogId) throw new Error("Blog ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");
    const comments = await Comment.find({ blogId }).populate(
      "author",
      "username avatar email"
    );
    return comments;
  },
  createComment: async (userId, blogId, content) => {
    if (!userId) throw new Error("User ID is required");

    if (!blogId) throw new Error("Blog ID is required");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");
    const newComment = await Comment.create({
      content,
      author: userId,
      blogId,
    });
    blog.comments.push(newComment._id);
    await blog.save();
    return newComment;
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
