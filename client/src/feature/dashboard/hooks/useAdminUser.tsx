import { useEffect, useRef, useState } from "react";
import useAdminUserStore from "../../../store/useAdminUserStore";
import { useSearchParams } from "react-router";
import { adminUserApiUrl, getAllUsers } from "../../../services/admin.service";
import { toast } from "react-toastify";

const useAdminUser = () => {
  const [ascUsername, setAscUsername] = useState(true);
  const [ascDate, setAscDate] = useState(true);
  const [ascEmail, setAscEmail] = useState(true);

  const users = useAdminUserStore((state) => state.users);
  const setUsers = useAdminUserStore((state) => state.setUsers);
  const setTotalUsers = useAdminUserStore((state) => state.setTotalUsers);
  const totalUsers = useAdminUserStore((state) => state.totalUsers);
  const meta = useAdminUserStore((state) => state.meta);
  const setMeta = useAdminUserStore((state) => state.setMeta);

  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState<string>(adminUserApiUrl);

  const updateUrlParams = (newParams: Record<string, string | undefined>) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newParams };

    Object.keys(merged).forEach((key) => {
      if (!merged[key]) delete merged[key];
    });

    setSearchParams(new URLSearchParams(merged as any).toString());
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers(fetchUrl);
      if (!response.ok) {
        toast.error("Failed to fetch users");
        return;
      }
      const { data } = await response.json();
      setMeta(data.meta);
      setTotalUsers(data.meta.totalUsers);
      setUsers(data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    const query = searchParams.toString();
    setFetchUrl(query ? `${adminUserApiUrl}?${query}` : adminUserApiUrl);
  }, [searchParams]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUrl]);

  const handleSort = (
    field: "username" | "email" | "createdAt",
    order: "asc" | "desc"
  ) => {
    updateUrlParams({ sortBy: field, orderBy: order });

    if (field === "username") setAscUsername(order !== "asc");
    if (field === "createdAt") setAscDate(order !== "asc");
    if (field === "email") setAscEmail(order !== "asc");
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrlParams({ search: e.target.value, page: "1" });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrlParams({ status: e.target.value, page: "1" });
  };

  const handlePageChange = (page: number) => {
    updateUrlParams({ page: page.toString() });
  };

  const clearSearchInput = () => {
    if (searchRef.current) searchRef.current.value = "";
    updateUrlParams({ search: undefined, page: "1" });
  };

  return {
    handleSearchInput,
    clearSearchInput,
    totalUsers,
    users,
    searchRef,
    fetchUrl,
    handleSort,
    ascUsername,
    ascDate,
    ascEmail,
    handleFilterChange,
    handlePageChange,
    meta,
  };
};

export default useAdminUser;
