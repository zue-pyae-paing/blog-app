import adminCategoryService from "./admin.category.service.js";

export const getAllCategory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page, limit, orderBy, search } = req.query;
    const categories = await adminCategoryService.getAllCategory(
      id,
      search,
      limit,
      page,
      orderBy
    );
    res.status(200).json({ data: { success: true, ...categories } });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { slug } = req.params;
    const category = await adminCategoryService.getCategory(id, slug);
    res.status(200).json({ data: { success: true, category } });
  } catch (error) {
    next(error);
  }
};

export const addCategory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name } = req.body;
    const newCategory = await adminCategoryService.addCategory(id, name);
    res.status(200).json({ data: { success: true, newCategory } });
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { slug } = req.params;
    const { name } = req.body;
    const updatedCategory = await adminCategoryService.updateCategory(
      id,
      slug,
      name
    );
    res.status(200).json({ data: { success: true, updatedCategory } });
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { slug } = req.params;
    await adminCategoryService.deleteCategory(id, slug);
    res
      .status(200)
      .json({ data: { success: true, message: " Category deleted" } });
  } catch (error) {
    next(error);
  }
};

export const getCategoryGrowth = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { range } = req.query;
    const { growthData } = await adminCategoryService.getCategoryGrowth(
      id,
      range
    );
    res.status(200).json({ data: { success: true, growthData } });
  } catch (error) {
    next(error);
  }
};
