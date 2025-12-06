import HomePage from "../feature/home/pages/page";
import RootLayout from "../layout/root-layout";
import TrendingPage from "../feature/trending/page/page";
import ProfilePage from "../feature/profile/page/page";
import SettingPage from "../feature/profile/page/setting-page";
import BlogCreatePage from "../feature/blog/page/blog-create-page";
import BlogUpdatePage from "../feature/blog/page/blog-update-page";
import BlogDetailPage from "../feature/blog/page/blog-detail-page";
import BlogPage from "../feature/blog/page/blog-page";
import { protectLoader } from "../utils/protectLoader";

export const mainRoutes = {
  path: "/",
  Component: RootLayout,
  children: [
    { index: true, Component: HomePage },
    { path: "blog", Component: BlogPage },
    { path: "blog/:blogId", Component: BlogDetailPage },
    { path: "trending", Component: TrendingPage },

    { path: "profile", loader: protectLoader, Component: ProfilePage },
    { path: "setting", loader: protectLoader, Component: SettingPage },
    { path: "create", loader: protectLoader, Component: BlogCreatePage },
    { path: "edit/:blogId", loader: protectLoader, Component: BlogUpdatePage },
  ],
};
