import { useEffect, useState } from "react";
import {
  adminUserApiUrl,
  getUsersGrowth,
} from "../../../services/admin.service";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

interface UserChartProps {
  date: string;
  users: number;
  blogs: number;
}

const useAdminUserChart = () => {
  const [chartData, setChartData] = useState<UserChartProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [fetchUrl, setFetchUrl] = useState<string>(`${adminUserApiUrl}/growth`);

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
        ? `${adminUserApiUrl}/growth?${updatedSearch}`
        : `${adminUserApiUrl}/growth`
    );
  };

  useEffect(() => {
    const fetachUsers = async () => {
      try {
        const res = await fetch(adminUserApiUrl, {
          method: "GET",
        });
        const { data } = await res.json();
        console.log(data, "total users data");
        // setTotalUsers(data.totalUsers);
      } catch (error) {
        toast.error("Failed to fetch total users");
      }
    };
    fetachUsers();
  }, []);

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
      const res = await getUsersGrowth(fetchUrl);
      const { data } = await res.json();
      setChartData(data.growthData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, [fetchUrl]);

  return { handleSort, chartData };
};

export default useAdminUserChart;
