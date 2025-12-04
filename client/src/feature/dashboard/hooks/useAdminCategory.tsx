import { useState, useEffect, useRef } from "react";
import {
  adminCategoryApiUrl,
  getAdminCategories,
} from "../../../services/admin.service";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import { set, type orderBy } from "lodash";

export interface AdminCategory {
  _id: string;
  name: string;
  slug: string;
  value: number;
  date: string;
}

const useAdminCategory = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [ascDate, setAscDate] = useState(true);
  const [catLoading, setCatLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [fetchUrl, setFetchUrl] = useState<string>(adminCategoryApiUrl);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateUrlParams = (newParams: Record<string, string | undefined>) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newParams };
    Object.keys(merged).forEach((key) => {
      if (!merged[key]) delete merged[key];
    });
    const updated = new URLSearchParams(merged as any).toString();
    setSearchParams(merged as any);
    setFetchUrl(
      updated ? `${adminCategoryApiUrl}?${updated}` : adminCategoryApiUrl
    );
  };

  useEffect(() => {
    const query = searchParams.toString();
    setFetchUrl(
      query ? `${adminCategoryApiUrl}?${query}` : adminCategoryApiUrl
    );
  }, [searchParams]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrlParams({ search: e.target.value, page: "1" });
  };

  const handleSort = (value: string) => {
    updateUrlParams({ orderBy: value, page: "1" });
    setAscDate(value === "desc" ? true : false);
  };

  const handlePageChange = (page: number) => {
    updateUrlParams({ page: page.toString() });
  };
  const fetchCategories = async () => {
    try {
      setCatLoading(true);
      const res = await getAdminCategories(fetchUrl);
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to fetch categories");
        return;
      }

      setCategories(result.data.categories);
      setTotalPages(result.data.meta.totalPages);
      setCurrentPage(result.data.meta.currentPage);
      setHasNextPage(result.data.meta.hasNextPage);
      setHasPreviousPage(result.data.meta.hasPreviousPage);
      setLimit(result.data.limit);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCatLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchUrl]);

  return {
    categories,
    totalPages,
    catLoading,
    handleSearchInput,
    searchRef,
    handleSort,
    handlePageChange,
    limit,
    ascDate,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    fetchCategories
  };
};

export default useAdminCategory;
