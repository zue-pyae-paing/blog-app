import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  forgetPassword,
  resetPassword,
} from "./auth.controller.js";

const router = Router();

//POST http://localhost:8080/api/auth/register
router.post("/register", register);

//POST http://localhost:8080/api/auth/login
router.post("/login", login);

//POST http://localhost:8080/api/auth/refresh-token
router.post("/refresh-token", refreshToken);

//POST http://localhost:8080/api/auth/forget-password
router.post("/forget-password", forgetPassword);

//PUT http://localhost:8080/api/auth/reset-password:token
router.put("/reset-password/:token", resetPassword);

export default router;
