import { Router } from "express";
import {
  getProfile,
  changeAvatar,
  changeEmail,
  changePassword,
  changeUserName,
  logout,
  deleteAccount,
} from "./user.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";
const router = Router();

// GET http://localhost:8080/api/user/me
router.get("/me", authMiddleware, getProfile);

// PUT http://localhost:8080/api/user/change-username
router.put("/change-username", authMiddleware, changeUserName);

// PUT http://localhost:8080/api/user/change-email
router.put("/change-email", authMiddleware, changeEmail);

// PUT http://localhost:8080/api/user/change-avatar
router.put(
  "/change-avatar",
  authMiddleware,
  upload.single("avatar"),
  changeAvatar
);

// PUT http://localhost:8080/api/user/change-password
router.put("/change-password", authMiddleware, changePassword);

// POST http://localhost:8080/api/user/logout
router.post("/logout", authMiddleware, logout);

// DELETE http://localhost:8080/api/user/delete-account
router.delete("/delete-account", authMiddleware,deleteAccount);

export default router;
