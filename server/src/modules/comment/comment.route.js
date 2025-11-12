import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getComment,
} from "./comment.controller.js";

const router = Router();

router.get("/:blogId", getAllComments);

router.post("/create/:blogId", authMiddleware, createComment);

router.get("/:blogId/:id", authMiddleware, getComment);

router.put("/edit/:blogId/:id", authMiddleware, editComment);

router.delete("/delete/:blogId/:id", authMiddleware, deleteComment);

export default router;
