import { Router } from "express";
import {
  banUser,
  deleteUser,
  getAllUser,
  getUserGrowth,
  unbanUser,
} from "./admin.user.controller.js";
import authMiddleware from "../../../middleware/auth.middleware.js";
import isAdmin from "../../../middleware/checkAdmin.middleware.js";

const router = Router();

router.get("/", authMiddleware, isAdmin, getAllUser);

router.get("/growth", authMiddleware, isAdmin, getUserGrowth);

router.patch("/:userId/ban", authMiddleware, isAdmin, banUser);

router.patch("/:userId/unban", authMiddleware, isAdmin, unbanUser);

router.delete("/:userId", authMiddleware, isAdmin, deleteUser);

export default router;
