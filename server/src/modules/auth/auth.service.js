import User from "../../model/user.model.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import {
  generateAcceptToken,
  generateRefreshToken,
} from "../../utils/token.js";

const authService = {
  register: async ({ username, email, password }) => {
    const user = await User.findOne({ email });
    if (user) {
      throw createError.Conflict("User already exists");
    }
    const isAdmin = "admin@gmail.com" === email && "admin123" === password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: isAdmin ? "admin" : "user",
      status: "active",
    });

    const accessToken = generateAcceptToken(newUser);
    const refreshToken = genetateRefreshToken(newUser);
    const userObject = newUser.toObject();
    const { password: pwd, ...userData } = userObject;
    return { accessToken, refreshToken, userData };
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError.Unauthorized("User not found");
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw createError.Unauthorized("Invalid credentials");
    }

    const accessToken = generateAcceptToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    const userObject = user.toObject();
    const { password: pwd, ...userData } = userObject;

    return { accessToken, refreshToken, userData };
  },
refreshToken: async (refreshToken) => {
  if (!refreshToken) {
    throw createError.BadRequest("Refresh token is required");
  }
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw createError.BadRequest("Invalid refresh token");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw createError.BadRequest("User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw createError.BadRequest("Refresh token does not match stored token");
  }

  const newAccessToken = generateAcceptToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = newRefreshToken; 
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
},

  forgetPassword: async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError.BadRequest("User not found");
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const expireTime = Date.now() + 1000 * 60 * 10;
    user.tokenExpiry = expireTime;
    user.resetToken = hashedToken;
    await user.save();
    return { hashedToken };
  },
  resetPassword: async (token, password, confirmPassword) => {
    if (!token) {
      throw createError.BadRequest("Reset Token is required");
    }
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      throw createError.BadRequest("Invalid reset token");
    }
    if (user.tokenExpiry < Date.now()) {
      throw createError.BadRequest("Reset token has expired");
    }
    if (password !== confirmPassword) {
      throw createError.BadRequest("Password and confirm password do not match");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.tokenExpiry = null;
    await user.save();
    return { message: "Password reset successfully" };
  },
};

export default authService;
