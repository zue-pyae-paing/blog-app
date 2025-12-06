import type {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "../schema/auth.schema";
import { apiWrapper } from "./api.wrapper";

const BASE_URL = import.meta.env.VITE_SERVER_URI;

// ---------------------------
// GET CATEGORIES
// ---------------------------
export const getCategory = () => {
  return apiWrapper(`${BASE_URL}/blogs/category`, { method: "GET" });
};

// ---------------------------
// LOGIN
// ---------------------------
export const login = (data: LoginSchema) => {
  return apiWrapper(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

// ---------------------------
// REGISTER
// ---------------------------
export const registerApi = (data: RegisterSchema) => {
  return apiWrapper(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

// ---------------------------
// FORGOT PASSWORD
// ---------------------------
export const forgotPassword = (data: ForgotPasswordSchema) => {
  return apiWrapper(`${BASE_URL}/auth/forget-password`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

// ---------------------------
// RESET PASSWORD
// ---------------------------
export const resetPassword = (
  token: string | undefined,
  data: ResetPasswordSchema
) => {
  return apiWrapper(`${BASE_URL}/auth/reset-password/${token}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};
