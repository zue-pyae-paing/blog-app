import { apiWrapper } from "./api.wrapper";

export const blogBaseApiUrl =
  import.meta.env.VITE_SERVER_URI + "/blogs";

// ---------------------------
// GET ALL BLOGS
// ---------------------------
export const getAllBlogs = (url: string) => {
  return apiWrapper(url, { method: "GET" });
};

// ---------------------------
// GET TRENDING BLOGS
// ---------------------------
export const getTrendingBlogs = () => {
  return apiWrapper(`${blogBaseApiUrl}/trending`, { method: "GET" });
};

// ---------------------------
// GET BLOG DETAIL
// ---------------------------
export const detailBlog = (id: string) => {
  return apiWrapper(`${blogBaseApiUrl}/detail/${id}`, { method: "GET" });
};

// ---------------------------
// CREATE BLOG
// ---------------------------
export const createBlog = (data: FormData) => {
  return apiWrapper(`${blogBaseApiUrl}/create`, {
    method: "POST",
    body: data,
  });
};

// ---------------------------
// UPDATE BLOG
// ---------------------------
export const updateBlog = (id: string, data: FormData) => {
  return apiWrapper(`${blogBaseApiUrl}/update/${id}`, {
    method: "PUT",
    body: data,
  });
};
