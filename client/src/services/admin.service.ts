import { apiWrapper } from "./api.wrapper";

const BASE_URL = import.meta.env.VITE_SERVER_URI;

export const adminUserApiUrl = `${BASE_URL}/admin/users`;
export const adminBlogApiUrl = `${BASE_URL}/admin/blogs`;
export const adminCategoryApiUrl = `${BASE_URL}/admin/categories`;

export const getAdminCategories = (url: string) =>
  apiWrapper(url, { method: "GET" });

export const getCategoryGrowth = (url: string) =>
  apiWrapper(url, { method: "GET" });

export const getCategory = (slug: string | undefined) =>
  apiWrapper(`${adminCategoryApiUrl}/${slug}`, { method: "GET" });

export const createCategory = ({ name }: { name: string }) =>
  apiWrapper(adminCategoryApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

export const updateCategory = (
  slug: string | undefined,
  data: { name: string }
) =>
  apiWrapper(`${adminCategoryApiUrl}/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const deleteCategory = (slug: string | undefined) =>
  apiWrapper(`${adminCategoryApiUrl}/${slug}`, { method: "DELETE" });

export const getAdminBlogs = (url: string) =>
  apiWrapper(url, { method: "GET" });

export const getBlogsGrowth = (url: string) =>
  apiWrapper(url, { method: "GET" });

export const deleteBlog = (blogId: string | undefined) =>
  apiWrapper(`${adminBlogApiUrl}/${blogId}`, { method: "DELETE" });

export const getUsersGrowth = (url: string) =>
  apiWrapper(url, { method: "GET" });

export const getAllUsers = (url: string) => apiWrapper(url, { method: "GET" });

export const banUser = (id: string) =>
  apiWrapper(`${adminUserApiUrl}/${id}/ban`, { method: "PATCH" });

export const unbanUser = (id: string) =>
  apiWrapper(`${adminUserApiUrl}/${id}/unban`, { method: "PATCH" });

export const deleteUser = (id: string) =>
  apiWrapper(`${adminUserApiUrl}/${id}`, { method: "DELETE" });
