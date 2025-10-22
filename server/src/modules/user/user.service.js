import User from "../../model/user.model.js";
import { imagekit } from "../../utils/imageKit.js";
import bcrypt from "bcryptjs";

const userService = {
  getUser: async (userId) => {
    if (!userId) throw new Error("User ID is required");
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const { password, ...userData } = user.toObject();
    return userData;
  },

  changeUsername: async (userId, newUsername) => {
    if (!userId) throw new Error("User ID is required");
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.username = newUsername;
    await user.save();
    const { password, ...userData } = user.toObject();
    return userData;
  },

  changeEmail: async (userId, newEmail) => {
    if (!userId) throw new Error("User ID is required");
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.email = newEmail;
    await user.save();
    const { password, ...userData } = user.toObject();
    return userData;
  },

  changeAvatar: async (userId, file) => {
    if (!userId) throw new Error("User ID is required");
    if (!file) throw new Error("Avatar is required");

  
    const uploaded = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: "/avatars",
    });

    if (!uploaded || uploaded.error) {
      throw new Error(uploaded?.error?.message || "ImageKit upload failed");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (user.avatarId) await imagekit.deleteFile(user.avatarId);

    user.avatar = uploaded.url;
    user.avatarId = uploaded.fileId;
    await user.save();

    const { password, ...userData } = user.toObject();
    return userData;
  },
  changePassword: async (userId, currentPassword, newPassword) => {
    if (!userId) throw new Error("User ID is required");
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Invalid current password");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const { password, ...userData } = user.toObject();
    return userData;
  },

  logout: async (userId) => {
    if (!userId) throw new Error("User ID is required");
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.refreshToken = null;
    await user.save();
    return { message: "Logout successful" };
  },

  deleteAccount: async (userId) => {
    if (!userId) throw new Error("User ID is required");
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (user.avatarId) await imagekit.deleteFile(user.avatarId);
    await user.deleteOne();

    return { message: "Account deleted successfully" };
  },
};

export default userService;
