import { Router } from "express";
import { banUser, deleteUser, getAllUser, unbanUser } from "./admin.user.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/checkAdmin.middleware.js";

const router = Router();

//GET http://localhost:8080/api/admin/users
router.get("/users", authMiddleware, isAdmin, getAllUser);

//PATCH http://localhost:8080/api/admin/user/:id/ban
router.patch("/users/:userId/ban", authMiddleware, isAdmin,banUser);

//PATCH http://localhost:8080/api/admin/user/:id/unban
router.patch("/users/:userId/unban", authMiddleware, isAdmin,unbanUser);

//DELETE http://localhost:8080/api/admin/user/:id
router.delete("/users/:userId", authMiddleware, isAdmin,deleteUser);

export default router;
