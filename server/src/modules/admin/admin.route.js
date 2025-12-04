import { Router } from "express";
import adminUserRouter from "./user/admin.user.route.js";
import adminBlogRouter from './blog/admin.blog.route.js'
import adminCategoryRouter from './category/admin.category.route.js'
const router = Router();

router.use("/users", adminUserRouter);

router.use("/blogs", adminBlogRouter);

router.use('/categories',adminCategoryRouter)

export default router;
