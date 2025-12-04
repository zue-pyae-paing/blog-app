import Container from "../../../components/container";
import { Activity } from "lucide-react";
import StatusCardSection from "../components/status-card-section";
import BlogAreaChart from "../components/blog-area-chart";
import UserBarChart from "../components/user-bar-chart";
import CategoriesPieCahrt from "../components/categories-pie-cahrt";

const DashboardPage = () => {
  return (
    <Container className=" min-h-full space">
      <div className="space-y-3 mb-4">
        <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
        <div className="flex items-center gap-x-2">
          <Activity size={18} className="text-primary" />
          <p>Welcome back! Here's your admin overview</p>
        </div>
      </div>
      <StatusCardSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BlogAreaChart />
        <UserBarChart />
      </div>
      <CategoriesPieCahrt />
    </Container>
  );
};

export default DashboardPage;
