import { PieChartIcon } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./custom-legend";
import useAdminCategoryChart from "../hooks/useAdminCategoryChart";

const generateColors = (count: number) => {
  return Array.from({ length: count }).map(
    () =>
      `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`
  );
};

const CategoriesPieChart = () => {
  const { chartData, handleSort } = useAdminCategoryChart();

  // Generate colors dynamically based on chartData
  const colorSet = generateColors(chartData.length);

  return (
    <div className="card bg-primary-content p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">Category Distribution</h3>
          <p className="text-sm text-slate-500 mt-1">
            Content breakdown by category
          </p>
        </div>
        <div className="p-2 h-10 w-10 shadow-lg rounded-lg bg-blue-50 flex items-center justify-center">
          <PieChartIcon size={20} className="text-secondary" />
        </div>
      </div> 

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData ?? []}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="blogs"
            nameKey="name"
            label
            isAnimationActive={true}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorSet[index % colorSet.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={<CustomLegend />} layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoriesPieChart;
