import LoginPage from "../feature/auth/page/login-page";
import RegisterPage from "../feature/auth/page/register-page";
import ForgotPasswordPage from "../feature/auth/page/forgot-password-page";
import ResetPasswordPage from "../feature/auth/page/reset-password-page";

export const authRoutes = [
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  { path: "/forgot-password", Component: ForgotPasswordPage },
  { path: "/reset-password/:token", Component: ResetPasswordPage },
];
