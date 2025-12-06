import { useState } from "react";
import useAdminUserStore from "../../../store/useAdminUserStore";
import { deleteUser, banUser, unbanUser } from "../../../services/admin.service";
import { toast } from "react-toastify";

const useAdminUserActions = () => {
  const setDeleteUser = useAdminUserStore((state) => state.deleteUser);
  const setBanUser = useAdminUserStore((state) => state.banUser);
  const setUnbanUser = useAdminUserStore((state) => state.unbanUser);

  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async (userId: string) => {
    try {
      setLoading(true);
      const response = await deleteUser(userId);
      const result = await response.json()

      if (!response.ok) {
        toast.error(result?.message || "Failed to delete user");
        return;
      }

      toast.success(result?.message || "User deleted");
      setDeleteUser(userId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (userId: string) => {
    try {
      setLoading(true);
      const response = await banUser(userId);
      const result = await response.json()

      if (!response.ok) {
        toast.error(result?.message || "Failed to ban user");
        return;
      }

      toast.success(result?.message || "User banned successfully");
      setBanUser(userId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleActive = async (userId: string) => {
    try {
      setLoading(true);

      const response = await unbanUser(userId);
      const result = await response.json()

      if (!response.ok) {
        toast.error(result?.message || "Failed to activate user");
        return;
      }

      toast.success(result?.message || "User unbanned successfully");
      setUnbanUser(userId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteUser, handleBan, handleActive, loading };
};

export default useAdminUserActions;
