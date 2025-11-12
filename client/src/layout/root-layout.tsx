import { Outlet } from "react-router";
import Navbar from "../components/nav-bar";
import Footer from "../components/footer";
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
