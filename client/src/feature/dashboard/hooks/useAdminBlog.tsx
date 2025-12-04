import { useEffect, useRef, useState } from "react";
import useAdminBlogStore from "../../../store/useAdminBlogStore";
import { toast } from "react-toastify";
import {
  getAdminBlogs,
  adminBlogApiUrl,
} from "../../../services/admin.service";
import { useSearchParams } from "react-router";
import type { orderBy } from "lodash";

const useAdminBlog = () => {
  const [ascTitle, setAscTitle] = useState(true);
  const [ascDate, setAscDate] = useState(true);
  const [ascViews, setAscViews] = useState(true);

  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState<string>(adminBlogApiUrl);

  const setBlogs = useAdminBlogStore((state) => state.setBlogs);
  const setLoading = useAdminBlogStore((state) => state.setLoading);
  const setTotalBlogs = useAdminBlogStore((state) => state.setTotalBlogs);
  const setTotalViews = useAdminBlogStore((state) => state.setTotalViews);


  const updateUrlParams = (newParams: Record<string, string | undefined>) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newParams };

    Object.keys(merged).forEach((key) => {
      if (!merged[key]) delete merged[key];
    });

    const updated = new URLSearchParams(merged as any).toString();
    
    setSearchParams(merged as any);
    setFetchUrl(updated ? `${adminBlogApiUrl}?${updated}` : adminBlogApiUrl);
  };

  
  useEffect(() => {
    const query = searchParams.toString();
    setFetchUrl(query ? `${adminBlogApiUrl}?${query}` : adminBlogApiUrl);
  }, [searchParams]);

  
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrlParams({ search: e.target.value, page: "1" });
  };

  const clearSearchInput = () => {
    if (searchRef.current) searchRef.current.value = "";
    updateUrlParams({ search: undefined, page: "1" });
  };

  // 🧩 Category Filter
  const handleCategoryChange = (value:string) => {
    updateUrlParams({ categorySlug: value, page: "1" });
  };

  // 📄 Pagination
  const handlePageChange = (page: number) => {
    updateUrlParams({ page: `${page}` });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrlParams({ status: e.target.value, page: "1" });
  };

  // 🔽 Sorting (FULL FIX)
  const handleSort = (
    field: "title" | "createdAt" | "views",
    order: "asc" | "desc"
  ) => {
    updateUrlParams({ sortBy: field, orderBy: order, page: "1" });

    if (field === "title") setAscTitle(order === "asc" ? false : true);
    if (field === "createdAt") setAscDate(order === "asc" ? false : true);
    if (field === "views") setAscViews(order === "asc" ? false : true);
  };

  // 📡 Fetch API
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAdminBlogs(fetchUrl);

      if (!res.ok) {
        toast.error("Something went wrong");
        return;
      }

      const result = await res.json();

      setBlogs(result.data.blogs || []);
      setTotalBlogs(result.data.meta.totalBlogs || 0);
      setTotalViews(result.data.totalViews || 0);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  return {
    ascTitle,
    ascDate,
    ascViews,
    searchRef,
    handleSearchInput,
    clearSearchInput,
    handleSort,
    handleCategoryChange,
    handlePageChange,
    handleFilterChange
  };
};

export default useAdminBlog;
