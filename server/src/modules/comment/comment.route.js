import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { createComment, deleteComment, getAllComments } from "./comment.controller.js";

const router = Router();

router.get("/:blogId", getAllComments);

router.post("/create/:blogId", authMiddleware, createComment);

router.delete("/delete/:blogId/:id", authMiddleware, deleteComment);

export default router;
