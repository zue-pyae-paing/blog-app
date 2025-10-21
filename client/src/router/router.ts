import { createBrowserRouter } from "react-router";
import HomePage from "../feature/home/pages/home-page";
import RootLayout from "../layout/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);

export default router;
