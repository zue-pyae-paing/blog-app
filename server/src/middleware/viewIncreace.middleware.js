import Blog from "../model/blog.model.js";
import createError from "http-errors";
const viewIncreaseMiddleware = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(createError.BadRequest("Blog id is required"));
    const blog = await Blog.findById(id);
    if (!blog) return next(createError.NotFound("Blog not found"));
    if (req.user && req.user.id.toString() === blog.author.toString())
      return next();
    if (blog.status !== "publish") {
      return next();
    }
    blog.views += 1;
    await blog.save();
    next();
  } catch (error) {
    next(error);
  }
};

export default viewIncreaseMiddleware;
