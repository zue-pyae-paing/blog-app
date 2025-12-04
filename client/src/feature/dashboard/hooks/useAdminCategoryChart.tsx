import { useEffect, useState } from "react";
import {
  adminCategoryApiUrl,
  getCategoryGrowth,
} from "../../../services/admin.service";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

interface CategoryChartProps {
  name: string;
  blogs: number;
}

const useAdminCategoryChart = () => {
  const [chartData, setChartData] = useState<CategoryChartProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [fetchUrl, setFetchUrl] = useState<string>(
    `${adminCategoryApiUrl}/growth`
  );

  const updatedParams = (newParams: Record<string, string | undefined>) => {
    const currentParmas = Object.fromEntries(searchParams.entries());
    const merged = { ...currentParmas, ...newParams };

    Object.keys(merged).forEach((key) => {
      if (!merged[key]) delete merged[key];
    });

    const updatedSearch = new URLSearchParams(merged as any).toString();
    setSearchParams(merged as any);
    setFetchUrl(
      updatedSearch
        ? `${adminCategoryApiUrl}/growth?${updatedSearch}`
        : `${adminCategoryApiUrl}/growth`
    );
  };

  const handleSort = (type: string) => {
    switch (type) {
      case "week":
        updatedParams({ range: "week" });
        break;
      case "month":
        updatedParams({ range: "month" });
        break;
      case "year":
        updatedParams({ range: "year" });
        break;
    }
  };

  const getChartData = async () => {
    try {
      const res = await getCategoryGrowth(fetchUrl);
      if (!res.ok) throw new Error("Failed to fetch category growth data");
      const { data } = await res.json();
      setChartData(data.growthData);
    } catch (error) {
      toast.error("Failed to fetch chart data");
    }
  };

  useEffect(() => {
    getChartData();
  }, [fetchUrl]);

  return { handleSort, chartData };
};

export default useAdminCategoryChart;
