import { create } from "zustand";
import type { Blog } from "../types/blog";


interface AdminBlogState {
  blogs: Blog[];
  loading: boolean;
  totalUsers: number;
  totalBlogs: number;
  totalViews: number;

  setBlogs: (blogs: Blog[]) => void;
  setLoading: (loading: boolean) => void;
  setTotalUsers: (totalUsers: number) => void;
  setTotalBlogs: (totalBlogs: number) => void;
  setTotalViews: (totalViews: number) => void;
  deleteBlog: (blogId: string) => void;
}

const useAdminBlogStore = create<AdminBlogState>((set) => ({
  blogs: [],
  loading: false,
  totalUsers: 0,
  totalBlogs: 0,
  totalViews: 0,

  setBlogs: (blogs) => set({ blogs }),
  setLoading: (loading) => set({ loading }),
  setTotalUsers: (totalUsers) => set({ totalUsers }),
  setTotalBlogs: (totalBlogs) => set({ totalBlogs }),
  setTotalViews: (totalViews) => set({ totalViews }),
  deleteBlog: (blogId) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog._id !== blogId),
    })),
}));

export default useAdminBlogStore;
