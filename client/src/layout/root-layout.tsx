import { Outlet } from "react-router";
import Navbar from "../components/nav-bar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
