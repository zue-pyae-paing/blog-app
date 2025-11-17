import commentService from "./comment.service.js";

export const getAllComments = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const limit = parseInt(req.query.limit) || 10;

    const cursor = req.query.cursor || null;
    const { comments, totalPages, totalComments, nextCursor, hasMore } =
      await commentService.getComments(blogId, limit, cursor);
    res.status(200).json({
      data: {
        success: true,
        comments,
        totalComments,
        totalPages,
        nextCursor,
        hasMore,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.blogId;
    const content = req.body.content;
    const newComment = await commentService.createComment(
      userId,
      blogId,
      content
    );
    res.status(201).json({ data: { success: true, newComment } });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.blogId;
    const commentId = req.params.id;
    const comments = await commentService.getComment(blogId, userId, commentId);
    res.status(200).json({ data: { success: true, comments } });
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.blogId;
    const commentId = req.params.id;
    const content = req.body.content;
    const editedComment = await commentService.editComment(
      userId,
      blogId,
      commentId,
      content
    );
    res.status(200).json({ data: { success: true, editedComment } });
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.blogId;
    const commentId = req.params.id;
    const { message } = await commentService.deleteComment(
      userId,
      blogId,
      commentId
    );
    res.status(200).json({ data: { success: true, message } });
  } catch (error) {
    next(error);
  }
};
