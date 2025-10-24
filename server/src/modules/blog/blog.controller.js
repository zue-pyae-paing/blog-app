import blogService from "./blog.service.js";

export const getAllBlog = async (req, res, next) => {
  try {
    const { page, limit, category, search } = req.query;

    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;
    const { blogs, totalBlogs, totalPages } = await blogService.getAllBlogs(
      pageInt,
      limitInt,
      category,
      search
    );
    const currentPage = pageInt;
    const hasNextPage = pageInt < totalPages;
    const hasPreviousPage = pageInt > 1;
    const nextPageLink = hasNextPage
      ? `${req.protocol}://${req.get("host")}/api/blog/all?page=${
          pageInt + 1
        }?limit=${limitInt}`
      : null;
    const previousPageLink = hasPreviousPage
      ? `${req.protocol}://${req.get("host")}/api/blog/all?page=${
          pageInt - 1
        }?limit=${limitInt}`
      : null;
    const meta = {
      currentPage,
      nextPageLink,
      previousPageLink,
      totalBlogs,
      totalPages,
    };
    res.status(200).json({ data: { success: true, blogs, meta } });
  } catch (error) {
    next(error);
  }
};
export const getSingleBlog = async (req, res, next) => {
  try {
    const blog = await blogService.getSingleBlog(req.params.id);
    res.status(200).json({ data: { success: true, blog } });
  } catch (error) {
    next(error);
  }
};
export const getOwnBlogs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { limit, cursor } = req.query;

    const { blogs, nextCursor } = await blogService.getOwnBlogs(
      userId,
      parseInt(limit) || 10,
      cursor || null
    );

    res.status(200).json({
      data: {
        success: true,
        blogs,
        nextCursor,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTrendingBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getTrendingBlogs();
    res.status(200).json({ data: { success: true, blogs } });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await blogService.getCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const newBlog = await blogService.createBlog(
      req.user.id,
      req.body,
      req.file
    );
    res.status(201).json({ data: { success: true, newBlog } });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await blogService.updateBlog(
      req.user.id,
      req.params.id,
      req.body,
      req.file
    );
    res.status(200).json({ data: { success: true, blog } });
  } catch (error) {
    next(error);
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
    const { message } = await blogService.deleteBlog(
      req.user.id,
      req.params.id
    );
    res.status(200).json({ data: { success: true, message } });
  } catch (error) {
    next(error);
  }
};
export const likeBlog = async (req, res, next) => {
  try {
    const blog = await blogService.likeBlog(req.user.id, req.params.id);
    res.status(200).json({ data: { success: true, blog } });
  } catch (error) {
    next(error);
  }
};

export const unlikeBlog = async (req, res, next) => {
  try {
    const blog = await blogService.unlikeBlog(req.user.id, req.params.id);
    res.status(200).json({ data: { success: true, blog } });
  } catch (error) {
    next(error);
  }
};
