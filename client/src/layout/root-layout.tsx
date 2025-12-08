import { Outlet } from "react-router";
import Navbar from "../components/nav-bar";
import Footer from "../components/footer";
const RootLayout = () => {
  return (
    <div className=" h-screen relative">
      <Navbar />
      <div className=" w-full flex items-center flex-col justify-between">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
