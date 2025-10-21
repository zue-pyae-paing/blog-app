import authService from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, userData } = await authService.register(
      req.body
    );
    res
      .status(201)
      .json({ data: { success: true, accessToken, refreshToken, userData } });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, userData } = await authService.login(
      req.body
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ data: { success: true, accessToken, userData } });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await authService.refreshToken(refreshToken);
    res
      .status(200)
      .json({ data: { success: true, accessToken: user.accessToken } });
  } catch (error) {
    next(error);
  }
};


export const forgetPassword = async (req, res, next) => {
  try {
    const { resetToken } = await authService.forgetPassword(req.body.email);
    const link = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail(req.body.email, "Reset Password", link);
    res
      .status(200)
      .json({ data: { success: true, message: "Please check your email" } });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { message } = await authService.resetPassword(req.params.token);
    res.status(200).json({ data: { success: true, message } });
  } catch (error) {
    next(error);
  }
};