import { Router } from "express";
import authMiddleware from "../../../middleware/auth.middleware.js";
import isAdmin from "../../../middleware/checkAdmin.middleware.js";
import {
  deleteBlog,
  getAllBlog,
  getBlog,
  getBlogsGrowth,
} from "./admin.blog.controller.js";
const router = Router();

router.get("/", authMiddleware, isAdmin, getAllBlog);

router.get("/growth", authMiddleware, isAdmin, getBlogsGrowth);

router.get("/:blogId", authMiddleware, isAdmin, getBlog);

router.delete("/:blogId", authMiddleware, isAdmin, deleteBlog);

export default router;
