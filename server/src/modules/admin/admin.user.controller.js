import adminUserService from "./admin.user.service.js";

export const getAllUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { limit, page, search, status, sortBy, sortStatus } = req.query;

    const users = await adminUserService.getAllUser(
      id,
      limit,
      page,
      search,
      status,
      sortBy,
      sortStatus
    );
    res.status(200).json({ data: { success: true, users } });
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