import { create } from "zustand";
import type { User } from "../types/user";

interface AdminUserState {
  users: User[];
  totalUsers: number;

  setUsers: (users: User[]) => void;
  setTotalUsers: (totalUsers: number) => void;
  banUser: (userId: string) => void;
  unbanUser: (userId: string) => void;
  deleteUser: (userId: string) => void;
}
