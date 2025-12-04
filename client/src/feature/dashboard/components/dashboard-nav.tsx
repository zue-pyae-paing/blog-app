import {
  FileText,
  HomeIcon,
  LayoutDashboardIcon,
  Tag,
  UserRound,
} from "lucide-react";

import { NavLink } from "react-router";
import ThemeBtn from "../../../components/theme-btn";

const DashboardNav = () => {
  return (
    <aside className="w-1/5 h-full flex flex-col justify-between border-r border-base-300 ">
      <div>
        <div className=" border-b border-base-300 p-4 relative">
          <h2 className=" font-bold text-2xl  text-primary">Admin Pannel</h2>
          <div className="absolute top-4 right-4">
            <ThemeBtn />
          </div>
        </div>
        <div className=" p-4 space-y-3">
          <NavLink
            to={"/dashboard"}
            className={"btn justify-start gap-3 btn-block btn-ghost  "}
          >
            <LayoutDashboardIcon size={18} className=" text-primary" />
            <span className=" md:flex hidden">Dashboard</span>
          </NavLink>
          <NavLink
            to={"/dashboard/blog-manage"}
            className={"btn justify-start gap-3 btn-block btn-ghost"}
          >
            <FileText size={18} className=" text-primary" />
            <span className=" md:flex hidden"> Blog Management</span>
          </NavLink>
          <NavLink
            to={"/dashboard/user-manage"}
            className={"btn justify-start gap-3 btn-block btn-ghost "}
          >
            <UserRound size={18} className=" text-primary" />
            <span className=" md:flex hidden">User Management</span>
          </NavLink>
          <NavLink
            to={"/dashboard/category-manage"}
            className={"btn btn-block justify-start gap-3 btn-ghost "}
          >
            <Tag size={18} className=" text-primary" />
            <span className=" md:flex hidden">Categories</span>
          </NavLink>
        </div>
      </div>
      <div className=" border-t border-base-300 relative py-2 px-2">
        <NavLink
          to={"/"}
          className={"btn justify-start gap-3 btn-block btn-ghost "}
        >
          <HomeIcon size={18} className=" text-primary" />
          <span className=" md:flex hidden">Back to Home</span>
        </NavLink>

        <p className=" text-center  text-xs text-slate-500">
          v1.0.0 Admin &copy; 2025
        </p>
      </div>
    </aside>
  );
};

export default DashboardNav;
