import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getCategories,
  getOwnBlogs,
  getSingleBlog,
  getTrendingBlogs,
  likeBlog,
  publishBlog,
  unlikeBlog,
  updateBlog,
} from "./blog.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import uplode from "../../middleware/upload.middleware.js";
import viewIncreaseMiddleware from "../../middleware/viewIncreace.middleware.js";
import optionalAuthMiddleware from "../../middleware/optionalAuth.middleware.js";

const router = Router();

// GET http://localhost:8080/api/blog/all
router.get("/", getAllBlog);

//Get http://localhost:8080/api/blog/my-blogs
router.get("/my-blogs", authMiddleware, getOwnBlogs);

// GET http://localhost:8080/api/blog/:id
router.get(
  "/detail/:id",
  optionalAuthMiddleware,
  viewIncreaseMiddleware,
  getSingleBlog
);

// GET http://localhost:8080/api/blog/trending
router.get("/trending", getTrendingBlogs);

// GET http://localhost:8080/api/blog/category
router.get("/category", getCategories);

// POST http://localhost:8080/api/blog/create
router.post("/create", authMiddleware, uplode.single("image"), createBlog);

// PUT http://localhost:8080/api/blog/update/:id
router.put("/update/:id", authMiddleware, updateBlog);

// PATCH http://localhost:8080/api/blog/like/:id
router.patch("/like/:id", authMiddleware, likeBlog);

//PATCH  http://localhost:8080/api/blog/unlike/:id
router.patch("/unlike/:id", authMiddleware, unlikeBlog);

//PATCH  http://localhost:8080/api/blog/publish/:id
router.patch("/publish/:id", authMiddleware, publishBlog);

// DELETE http://localhost:8080/api/blog/delete/:id
router.delete("/delete/:id", authMiddleware, deleteBlog);

export default router;
