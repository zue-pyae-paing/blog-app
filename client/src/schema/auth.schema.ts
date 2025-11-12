import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z.string().email(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const forgetPasswordSchema = z.object({ email: z.string().email() });

export const resetPasswordSchema = z.object({
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
