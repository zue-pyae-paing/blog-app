import { createBrowserRouter } from "react-router";
import ErrorPage from "../components/error-page";
import { mainRoutes } from "./main.routes";
import { adminRoutes } from "./admin.routes";
import { authRoutes } from "./auth.routes";

const router = createBrowserRouter([
  {
    ...mainRoutes,
    ErrorBoundary: ErrorPage,
  },
  adminRoutes,
  ...authRoutes,
]);

export default router;
