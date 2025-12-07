import { useEffect, useRef, useState, useCallback } from "react";
import useAdminBlogStore from "../../../store/useAdminBlogStore";
import { toast } from "react-toastify";
import {
  getAdminBlogs,
  adminBlogApiUrl,
  deleteBlog,
} from "../../../services/admin.service";
import { useSearchParams } from "react-router";
import { debounce } from "lodash";

const useAdminBlog = () => {
  const [ascTitle, setAscTitle] = useState(true);
  const [ascDate, setAscDate] = useState(true);
  const [ascViews, setAscViews] = useState(true);


  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState<string>(adminBlogApiUrl);

  const setBlogs = useAdminBlogStore((state) => state.setBlogs);
  const setLoading = useAdminBlogStore((state) => state.setLoading);
  const setDeleteLoading = useAdminBlogStore((state) => state.setDeleteLoading);
  const setTotalBlogs = useAdminBlogStore((state) => state.setTotalBlogs);
  const setTotalViews = useAdminBlogStore((state) => state.setTotalViews);
  const setMeta = useAdminBlogStore((state) => state.setMeta);
  const meta = useAdminBlogStore((state) => state.meta);

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

  const debounceSearch = useCallback(
    debounce((value: string) => {
      updateUrlParams({ search: value });
    }, 500),
    []
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  const clearSearchInput = () => {
    if (searchRef.current) searchRef.current.value = "";
    updateUrlParams({ search: undefined, page: "1" });
  };

  const handleCategoryChange = (value: string) => {
    updateUrlParams({ categorySlug: value, page: "1" });
  };

  const handlePageChange = (page: number) => {
    updateUrlParams({ page: `${page}` });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrlParams({ status: e.target.value });
  };

  const handleSort = (
    field: "title" | "createdAt" | "views",
    orderBy: "asc" | "desc"
  ) => {
    updateUrlParams({ sortBy: field, orderBy: orderBy });

    if (field === "title") setAscTitle(orderBy === "asc" ? false : true);
    if (field === "createdAt") setAscDate(orderBy === "asc" ? false : true);
    if (field === "views") setAscViews(orderBy === "asc" ? false : true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAdminBlogs(fetchUrl);

      if (!res.ok) {
        toast.error("Something went wrong");
        return;
      }
      const { data } = await res.json();
      setBlogs(data.blogs || []);
      setTotalBlogs(data.meta.totalBlogs || 0);
      setTotalViews(data.totalViews || 0);
      setMeta(data.meta);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId: string | undefined) => {
    try {
      setDeleteLoading(true);
      const res = await deleteBlog(blogId);
      if (!res.ok) {
        toast.error("Something went wrong");
        return;
      }
      toast.success("Blog deleted successfully");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
    finally {
      setDeleteLoading(false);
    }
  }

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
    handleFilterChange,
    meta,
    handleDeleteBlog
  };
};

export default useAdminBlog;
