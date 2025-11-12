import { create } from "zustand";
import type { Blog } from "../types/blog";

interface BlogState {
  blogs: Blog[];
  selectedCategory: string;

  setSelectedCategory: (category: string) => void;
  setBlogs: (blogs: Blog[]) => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (blogId: string, updatedBlog: Blog) => void;
  deleteBlog: (blogId: string) => void;
  likeBlog: (blogId: string, userId: string) => void;
}

const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  selectedCategory: "All",

  // set blogs
  setBlogs: (blogs) => set({ blogs }),

  // select category
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // add new blog
  addBlog: (blog) => set((state) => ({ blogs: [...state.blogs, blog] })),

  // update blog
  updateBlog: (blogId, updatedBlog) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog._id === blogId ? updatedBlog : blog
      ),
    })),

  // delete blog
  deleteBlog: (blogId) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog._id !== blogId),
    })),

  // like blog
  likeBlog: (blogId, userId) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog._id === blogId
          ? {
              ...blog,
              likes: blog.likes.includes(userId)
                ? blog.likes.filter((id) => id !== userId)
                : [...blog.likes, userId],
            }
          : blog
      ),
    })),
}));

export default useBlogStore;
