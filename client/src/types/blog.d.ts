import type { Comment } from "./comment";
export interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  author?: Author;
  content: string;
  status?: string;
  readingTime: number;
  category: string;
  comments: Comment[];
  views: number;
  likes: string[];
  createdAt: string;
}

export interface Author {
  _id?: string;
  username?: string;
  email?: string;
  avatar?: string;
  avatarId?: string;
  role?: string;
  createdAt: string;
}

export interface DetailBlog {
  blog: Blog;
}

export interface Pagination {
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalBlogs: number;
  totalPages: number;
}
