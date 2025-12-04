import { BarChart3, X } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import ChartTooltipContent from "./chart-tooltiop-content";
import CustomLegend from "./custom-legend";
import useAdminUserChart from "../hooks/useAdminUserChart";
const UserBarChart = () => {
  const { handleSort, chartData } = useAdminUserChart();

  return (
    <div className="card bg-primary-content p-3">
      <div className=" flex justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold ">User Growth</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cumulative user acquisition
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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis width={"auto"} />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<CustomLegend />} />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#1121fa" radius={5} />
          <Bar dataKey="blogs" fill="#f30669" radius={5} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserBarChart;
