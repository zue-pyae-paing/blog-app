import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import {
  adminCategoryApiUrl,
  getAdminCategories,
} from "../../../services/admin.service";
import { useAdminCategoryStore } from "../../../store/useCategoryStore";
import { debounce } from "lodash";

const useAdminCategory = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [ascDate, setAscDate] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    categories,
    totalCategories,
    setTotalCategories,
    loading,
    meta,
    setCategories,
    setMeta,
    setLoading,
  } = useAdminCategoryStore();
  const updateUrlParams = (newParams: Record<string, string | undefined>) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newParams };

    Object.keys(merged).forEach((key) => {
      if (!merged[key]) delete merged[key];
    });

    setSearchParams(merged as any);
  };

  const buildApiUrl = () => {
    const query = searchParams.toString();
    return query ? `${adminCategoryApiUrl}?${query}` : adminCategoryApiUrl;
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const url = buildApiUrl();
      const res = await getAdminCategories(url);
      const {data} = await res.json();

      if (!res.ok) {
        toast.error( "Failed to fetch categories");
        return;
      }

      setCategories(data.categories);
      setTotalCategories(data.meta.totalCategories);
      setMeta(data.meta);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchParams]);

  const debouncedUpdateUrl = useCallback(
    debounce((value: string) => {
      updateUrlParams({ search: value, page: "1" });
    }, 500),
    [searchParams]
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedUpdateUrl(e.target.value);
  };

  const handleSort = (value: string) => {
 
    if (value === "asc") {
      setAscDate(true);
    } else {
      setAscDate(false);
    }
    updateUrlParams({ orderBy: value });
  };

  const handlePageChange = (page: number) => {
    updateUrlParams({ page: page.toString() });
  };

  return {
    categories,
    loading,
    searchRef,
    fetchCategories,
    totalPages: meta.totalPages,
    currentPage: meta.currentPage,
    limit: meta.limit,
    hasNextPage: meta.hasNextPage,
    hasPrevPage: meta.hasPrevPage,
    ascDate,
    handleSearchInput,
    handleSort,
    handlePageChange,
    totalCategories,
  };
};

export default useAdminCategory;
