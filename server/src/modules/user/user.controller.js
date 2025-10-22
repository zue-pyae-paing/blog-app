import userService from "./user.service.js";
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await userService.getUser(req.user.id);
    res.status(200).json({ data: { success: true, user } });
  } catch (error) {
    next(error);
  }
};
export const changeEmail = async (req, res, next) => {
  try {
    const user = await userService.changeEmail(req.user.id, req.body.email);
    res.status(200).json({ data: { success: true, user } });
  } catch (error) {
    next(error);
  }
};
export const changeUserName = async (req, res, next) => {
  try {
    const user = await userService.changeUsername(
      req.user.id,
      req.body.username
    );
    res.status(200).json({ data: { success: true, user } });
  } catch (error) {
    next(error);
  }
};
export const changeAvatar = async (req, res, next) => {
  try {
    const user = await userService.changeAvatar(req.user.id, req.file);
    res.status(200).json({ data: { success: true, user } });
  } catch (error) {
    console.error("Change Avatar Error:", error.message || error);
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const user = await userService.changePassword(
      req.user.id,
      req.body.currentPassword,
      req.body.newPassword
    );
    res.status(200).json({ data: { success: true, user } });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.id);
    res.clearCookie("refreshToken");
    res.status(200).json({ data: { success: true, message: "Logged out successfully" } });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const user = await userService.deleteAccount(req.user.id);
    res.status(200).json({ data: { success: true, user } });
  } catch (error) {
    next(error);
  }
};
