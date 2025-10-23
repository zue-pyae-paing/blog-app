import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getCategories,
  getSingleBlog,
  getTrendingBlogs,
  updateBlog,
} from "./blog.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import uplode from "../../middleware/upload.middleware.js";

const router = Router();

// GET http://localhost:8080/api/blog/all
router.get("/all", getAllBlog);

// GET http://localhost:8080/api/blog/:id
router.get("/:id", getSingleBlog);

// GET http://localhost:8080/api/blog/trending
router.get("/trending", getTrendingBlogs);

// GET http://localhost:8080/api/blog/category
router.get("/category", getCategories);

//Get http://localhost:8080/api/blog/my-blogs
router.get("/my-blogs", authMiddleware, getCategories);

// POST http://localhost:8080/api/blog/create
router.post("/create", authMiddleware, uplode.single("image"), createBlog);

// PUT http://localhost:8080/api/blog/update/:id
router.put("/update/:id", authMiddleware, updateBlog);

// DELETE http://localhost:8080/api/blog/delete/:id
router.delete("/delete/:id", authMiddleware, deleteBlog);

export default router;
