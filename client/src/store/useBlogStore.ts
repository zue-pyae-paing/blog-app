import { create } from "zustand";
import type { Blog } from "../types/blog";

interface BlogState {
  blogs: Blog[];
  blogDetail: Blog | null;
  setBlogDetail: (blog: Blog) => void;
  clearBlogDetail: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setBlogs: (blogs: Blog[]) => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (blogId: string, updatedBlog: Blog) => void;
  deleteBlog: (blogId: string) => void;
}

const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  blogDetail: null,
  selectedCategory: "All",

  setBlogDetail: (blog) => set({ blogDetail: blog }),

  clearBlogDetail: () => set({ blogDetail: null }),

  setBlogs: (blogs) => set({ blogs }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  addBlog: (blog) => set((state) => ({ blogs: [blog, ...state.blogs] })),

  updateBlog: (blogId, updatedBlog) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog._id === blogId ? updatedBlog : blog
      ),
    })),

  deleteBlog: (blogId) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog._id !== blogId),
    })),
}));

export default useBlogStore;
