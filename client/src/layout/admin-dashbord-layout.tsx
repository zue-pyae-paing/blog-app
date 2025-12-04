import { Outlet } from "react-router";
import DashboardNav from "../feature/dashboard/components/dashboard-nav";

const AdminDashboardLayout = () => {
  return (
    <div className=" flex h-screen relative">
      <DashboardNav />
      <div className="flex-1 h-full  overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
