import { Router } from "express";
import isAdmin from "../../../middleware/checkAdmin.middleware.js";
import authMiddleware from "../../../middleware/auth.middleware.js";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  getCategoryGrowth,
  updateCategory,
} from "./admin.category.controller.js";

const router = Router();

router.get("/", authMiddleware, isAdmin, getAllCategory);
router.get("/growth", authMiddleware, isAdmin, getCategoryGrowth);
router.get("/:slug", authMiddleware, isAdmin, getCategory);
router.post("/", authMiddleware, isAdmin, addCategory);
router.patch("/:slug", authMiddleware, isAdmin, updateCategory);
router.delete("/:slug", authMiddleware, isAdmin, deleteCategory);

export default router;
