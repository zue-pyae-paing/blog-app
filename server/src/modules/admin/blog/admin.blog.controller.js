import adminBlogService from "./admin.blog.service.js";

export const getAllBlog = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page, search, categorySlug, sortBy, orderBy, limit, status } =
      req.query;

    const { blogs, meta, totalViews } = await adminBlogService.getAllBlog(
      id,
      limit,
      page,
      search,
      status,
      categorySlug,
      sortBy,
      orderBy
    );
    res.status(200).json({
      data: {
        success: true,
        blogs,
        meta,
        totalViews,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { blogId } = req.params;
    const blog = await adminBlogService.getBlog(id, blogId);
    res.status(200).json({ data: { success: true, blog } });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { blogId } = req.params;
    await adminBlogService.deleteBlog(id, blogId);
    res.status(200).json({ data: { success: true } });
  } catch (error) {
    next(error);
  }
};

export const getBlogsGrowth = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { range } = req.query;
    const blogsGrowth = await adminBlogService.getBlogsGrowth(id, range);

    res.status(200).json({ data: { success: true, ...blogsGrowth } });
  } catch (error) {
    next(error);
  }
};
