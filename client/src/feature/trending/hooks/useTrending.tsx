import { useEffect, useState } from "react";
import type { Blog } from "../../../types/blog";
import { toast } from "react-toastify";

import { getTrendingBlogs } from "../../../services/blog.service";

const useTrending = () => {
  const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrendingBlogs = async () => {
    try {
      setLoading(true);
      const res = await getTrendingBlogs();
      const result = await res.json();
      if (!res.ok) {
        toast.error(result?.message || "Something went wrong");
        return;
      }
      if (result?.data?.success) {
        setTrendingBlogs(result?.data?.blogs || []);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTrendingBlogs();
  }, []);
  return {loading, trendingBlogs};
};

export default useTrending;
