import useAdminBlogStore from "../../../store/useAdminBlogStore";
import useAdminBlog from "../hooks/useAdminBlog";
import useAdminCategory from "../hooks/useAdminCategory";
import StatusCard from "./status-card";
import { Users, FileText, Tag, TrendingUp } from "lucide-react";
const StatusCardSection = () => {
  const { categories } = useAdminCategory();
  useAdminBlog();
  const totalBlogs = useAdminBlogStore((state) => state.totalBlogs);
  const totalViews = useAdminBlogStore((s) => s.totalViews);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatusCard
        title="Total Blogs"
        value={totalBlogs}
        iconBg="bg-primary-content"
        valueColor="text-primary"
        icon={<FileText size={18} className=" text-primary" />}
      />
      <StatusCard
        title="Total Users"
        value={20}
        iconBg="bg-secondary-content"
        valueColor="text-success"
        icon={<Users size={18} className=" text-success" />}
      />
      <StatusCard
        title="Total Categories"
        value={categories?.length}
        valueColor="text-accent"
        iconBg="bg-primary-content"
        icon={<Tag size={18} className=" text-accent" />}
      />
      <StatusCard
        title="Total Views"
        value={totalViews}
        valueColor="text-secondary"
        iconBg="bg-secondary-content"
        icon={<TrendingUp size={18} className="text-secondary" />}
      />
    </div>
  );
};

export default StatusCardSection;
