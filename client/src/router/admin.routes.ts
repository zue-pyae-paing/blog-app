// src/routes/admin.routes.tsx
import AdminDashboardLayout from "../layout/admin-dashbord-layout";
import DashboardPage from "../feature/dashboard/pages/dashboard-page";
import UserManagePage from "../feature/dashboard/pages/user-manage-page";
import BlogManagePage from "../feature/dashboard/pages/blog-manage-page";
import CategoryManagePage from "../feature/dashboard/pages/category-manage-page";
import { protectLoader } from "../utils/protectLoader";

export const adminRoutes = {
  path: "dashboard",
  loader: protectLoader,
  Component: AdminDashboardLayout,
  children: [
    { index: true, Component: DashboardPage },
    { path: "user-manage", Component: UserManagePage },
    { path: "blog-manage", Component: BlogManagePage },
    { path: "category-manage", Component: CategoryManagePage },
  ],
};
