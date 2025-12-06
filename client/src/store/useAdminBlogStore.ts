import { create } from "zustand";
import type { AdminPaginationMeta, Blog } from "../types/blog";

interface AdminBlogState {
  blogs: Blog[];
  loading: boolean;
  deleteLoading: boolean;
  totalUsers: number;
  totalBlogs: number;
  totalViews: number;
  meta: AdminPaginationMeta;
  setBlogs: (blogs: Blog[]) => void;
  setLoading: (loading: boolean) => void;
  setDeleteLoading: (loading: boolean) => void;
  setTotalUsers: (totalUsers: number) => void;
  setTotalBlogs: (totalBlogs: number) => void;
  setTotalViews: (totalViews: number) => void;
  setMeta: (meta: AdminPaginationMeta) => void;
  deleteBlog: (blogId: string) => void;
}

const useAdminBlogStore = create<AdminBlogState>((set) => ({
  blogs: [],
  loading: false,
  deleteLoading: false,
  totalUsers: 0,
  totalBlogs: 0,
  totalViews: 0,
  meta: {
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 5,
  },
  setBlogs: (blogs) => set({ blogs }),
  setLoading: (loading) => set({ loading }),
  setDeleteLoading: (loading: boolean) => set({ deleteLoading: loading }),
  setMeta: (meta) => set({ meta }),
  setTotalUsers: (totalUsers) => set({ totalUsers }),
  setTotalBlogs: (totalBlogs) => set({ totalBlogs }),
  setTotalViews: (totalViews) => set({ totalViews }),
  deleteBlog: (blogId) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog._id !== blogId),
    })),
}));

export default useAdminBlogStore;
