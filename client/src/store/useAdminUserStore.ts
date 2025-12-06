import { create } from "zustand";
import type { AdminUser } from "../types/user";
import type { AdminPaginationMeta } from "../types/blog";

interface AdminUserState {
  users: AdminUser[];
  totalUsers: number;
  meta: AdminPaginationMeta;

  setUsers: (users: AdminUser[]) => void;
  addUser: (user: AdminUser) => void;
  setTotalUsers: (totalUsers: number) => void;
  banUser: (userId: string) => void;
  unbanUser: (userId: string) => void;
  deleteUser: (userId: string) => void;
  setMeta: (meta: AdminPaginationMeta) => void;
}

const useAdminUserStore = create<AdminUserState>((set) => ({
  users: [],
  totalUsers: 0,
  meta: {
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
  },

  setMeta: (meta) => set({ meta }),

  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  setTotalUsers: (totalUsers) => set({ totalUsers }),
  banUser: (userId) =>
    set((state) => ({
      users: state.users.map((user) =>
        user._id === userId ? { ...user, status: "banned" } : user
      ),
    })),
  unbanUser: (userId) =>
    set((state) => ({
      users: state.users.map((user) =>
        user._id === userId ? { ...user, status: "active" } : user
      ),
    })),
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user._id !== userId),
      totalUsers: state.totalUsers - 1,
    })),
}));

export default useAdminUserStore;
