import { blogBaseApiUrl } from "../../../services/blog.service";
import { useState, useEffect, useRef } from "react";
import useBlogStore from "../../../store/useBlogStore";
import { useSearchParams } from "react-router";

interface Pagination {
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalBlogs: number;
  totalPages: number;
}

const useBlog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [links, setLinks] = useState<string[]>([]);
  const [page, setPage] = useState<Pagination>({
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalBlogs: 0,
    totalPages: 0,
  });
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState<string>(`${blogBaseApiUrl}`);

  const blogs = useBlogStore((state) => state.blogs);
  const setBlogs = useBlogStore((state) => state.setBlogs);

  /** ✅ merge new params into existing query string */
  const updateUrlParams = (newParams: Record<string, string | undefined>) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newParams };
    // remove empty values (e.g., when clearing search)
    Object.keys(merged).forEach((key) => {
      if (!merged[key]) delete merged[key];
    });

    const updatedSearch = new URLSearchParams(merged as any).toString();
    setSearchParams(merged as any);
    setFetchUrl(
      updatedSearch ? `${blogBaseApiUrl}?${updatedSearch}` : `${blogBaseApiUrl}`
    );
  };

  /** ✅ when searchParams change → sync input + update fetchUrl */
  useEffect(() => {
    const search = searchParams.get("search") || "";
    if (searchRef.current) searchRef.current.value = search;

    const query = searchParams.toString();
    setFetchUrl(query ? `${blogBaseApiUrl}?${query}` : `${blogBaseApiUrl}`);
  }, [searchParams]);

  /** ✅ Search input */
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrlParams({ search: e.target.value, page: "1" });
  };

  /** ✅ Category filter */
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrlParams({ category: e.target.value, page: "1" });
  };

  /** ✅ Pagination */
  const handlePageChange = (pageNumber: number) => {
    updateUrlParams({ page: pageNumber.toString() });
  };

  const handleLimitChange = (limit: number) => {
    updateUrlParams({ limit: limit.toString() });
  };

  /** ✅ Clear search */
  const clearSearchInput = () => {
    if (searchRef.current) searchRef.current.value = "";
    updateUrlParams({ search: undefined, page: "1" });
  };

  /** ✅ Fetch blogs every time URL changes */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(fetchUrl);
        const { data } = await res.json();
        setBlogs(data.blogs || []);
        setLinks(data.links || []);
        setPage(data.meta);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [fetchUrl]);

  return {
    loading,
    blogs,
    searchRef,
    handleSearchInput,
    handleCategoryChange,
    handlePageChange,
    clearSearchInput,
    handleLimitChange,
    links,
    page,
  };
};

export default useBlog;
