import { createBrowserRouter } from "react-router";
import HomePage from "../feature/home/pages/page";
import RootLayout from "../layout/root-layout";
import ErrorPage from "../components/error-page";
import TrendingPage from "../feature/trending/page/page";
import ProfilePage from "../feature/profile/page/page";
import AboutPage from "../feature/about/page/page";
import BlogCreatePage from "../feature/blog/page/blog-create-page";
import BlogUpdatePage from "../feature/blog/page/blog-update-page";
import BlogDetailPage from "../feature/blog/page/blog-detail-page";
import BlogPage from "../feature/blog/page/blog-page";
import LoginPage from "../feature/auth/page/login-page";
import RegisterPage from "../feature/auth/page/register-page";
import ForgotPasswordPage from "../feature/auth/page/forgot-password-page";
import ResetPasswordPage from "../feature/auth/page/reset-password-page";
import SettingPage from "../feature/profile/page/setting-page";
import { protectLoader } from "../utils/protectLoader";
import AdminDashboardLayout from "../layout/admin-dashbord-layout";
import DashboardPage from "../feature/dashboard/pages/dashboard-page";
import UserManagePage from "../feature/dashboard/pages/user-manage-page";
import BlogManagePage from "../feature/dashboard/pages/blog-manage-page";
import CategoryManagePage from "../feature/dashboard/pages/category-manage-page";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      { path: "blog", Component: BlogPage },
      {
        path: "trending",
        Component: TrendingPage,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "profile",
        loader: protectLoader,
        Component: ProfilePage,
      },

      {
        path: "setting",
        loader: protectLoader,
        Component: SettingPage,
      },
      { path: "create", loader: protectLoader, Component: BlogCreatePage },
      {
        path: "edit/:blogId",
        loader: protectLoader,
        Component: BlogUpdatePage,
      },
      { path: "blog/:blogId", Component: BlogDetailPage },
    ],
  },
  {
    path: "dashboard",
    loader: protectLoader,
    Component: AdminDashboardLayout,
    children: [
      { index: true, Component: DashboardPage },
      {
        path: "user-manage",
        Component: UserManagePage,
      },
      { path: "blog-manage", Component: BlogManagePage },
      { path: "category-manage", Component: CategoryManagePage },
    ],
  },

  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  { path: "/forgot-password", Component: ForgotPasswordPage },
  { path: "/reset-password/:token", Component: ResetPasswordPage },
]);

export default router;
