import adminUserService from "./admin.user.service.js";

export const getAllUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { limit, page, search, status, sortBy, orderBy } = req.query;

    const { users, meta } = await adminUserService.getAllUser(
      id,
      limit,
      page,
      search,
      status,
      sortBy,
      orderBy
    );
    res.status(200).json({
      data: {
        success: true,
        users,
        meta,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const banUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    await adminUserService.banUser(id, userId);
    res.status(200).json({ data: { success: true } });
  } catch (error) {
    next(error);
  }
};

export const unbanUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    await adminUserService.unbanUser(id, userId);
    res.status(200).json({ data: { success: true } });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    await adminUserService.deleteUser(id, userId);
    res.status(200).json({ data: { success: true } });
  } catch (error) {
    next(error);
  }
};

export const getUserGrowth = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { range } = req.query;
    const growthData = await adminUserService.getUserGrowth(id, range);
    res.status(200).json({ data: { success: true, growthData } });
  } catch (error) {
    next(error);
  }
};
