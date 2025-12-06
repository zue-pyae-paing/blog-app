import { AreaChartIcon } from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import ChartTooltipContent from "./chart-tooltiop-content";
import CustomLegend from "./custom-legend";
import useAdminBlogChart from "../hooks/useAdminBlogChart";

const BlogAreaChart = () => {
  const { chartData, handleSort } = useAdminBlogChart();
  console.log(chartData);
  return (
    <div className="card bg-primary-content p-3">
      <div className=" flex justify-between">
        <div>
          <h3 className="text-lg font-bold ">Blog Growth</h3>
          <p className="text-sm text-slate-500 mt-1">
            Monthly posts and page views
          </p>
        </div>
        <select
          defaultValue="month"
          onChange={(e) => handleSort(e.target.value)}
          className="select select-sm select-primary w-30"
        >
          <option value={"week"}>Week</option>
          <option value={"month"}>Month</option>
          <option value={"year"}>Year</option>
        </select>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBlogs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="#fd0543" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3fd83a" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="#3004f5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#f0687f" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={0}
            />
            <YAxis width="auto" />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<CustomLegend />} />

            <Area
              type="monotone"
              dataKey="blogs"
              stroke="#190ef5"
              fillOpacity={1}
              fill="url(#colorBlogs)"
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#1eee0b"
              fillOpacity={2}
              fill="url(#colorViews)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BlogAreaChart;
