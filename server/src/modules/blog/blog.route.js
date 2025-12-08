import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getCategories,
  getOwnBlogs,
  getSingleBlog,
  getTrendingBlogs,
  publishBlog,
  updateBlog,
} from "./blog.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import uplode from "../../middleware/upload.middleware.js";
import viewIncreaseMiddleware from "../../middleware/viewIncreace.middleware.js";

const router = Router();

router.get("/", getAllBlog);

router.get("/my-blogs", authMiddleware, getOwnBlogs);

router.get(
  "/detail/:id",

  viewIncreaseMiddleware,
  getSingleBlog
);

router.get("/trending", getTrendingBlogs);

router.get("/category", getCategories);

router.post("/create", authMiddleware, uplode.single("image"), createBlog);

router.put("/update/:id", authMiddleware, uplode.single("image"), updateBlog);

router.patch("/publish/:id", authMiddleware, publishBlog);

router.patch ("/unpublish/:id", authMiddleware, publishBlog);

router.delete("/delete/:id", authMiddleware, deleteBlog);

export default router;
