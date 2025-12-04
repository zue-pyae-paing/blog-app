import { useEffect, useState } from "react";
import {
  adminBlogApiUrl,
  getBlogsGrowth,
} from "../../../services/admin.service";
import { useSearchParams } from "react-router";


interface BlogChartProps {
  date: string;
  views: number;
  count: number;
}

const useAdminBlogChart = () => {
  const [chartData, setChartData] = useState<BlogChartProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [fetchUrl, setFetchUrl] = useState<string>(`${adminBlogApiUrl}/growth`);

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
        ? `${adminBlogApiUrl}/growth?${updatedSearch}`
        : `${adminBlogApiUrl}/growth`
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
      const res = await getBlogsGrowth(fetchUrl);
      const { data } = await res.json();
      setChartData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, [fetchUrl]);

  return { handleSort, chartData };
};

export default useAdminBlogChart;
