export const adminUserApiUrl = import.meta.env.VITE_SERVER_URI + "/admin/users";
export const adminBlogApiUrl = import.meta.env.VITE_SERVER_URI + "/admin/blogs";
export const adminCategoryApiUrl =
  import.meta.env.VITE_SERVER_URI + "/admin/categories";

import { getHeaders } from "../utils/getHeaders";

export const getAdminCategories = async (url: string) => {
  return await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });
};

export const getCategoryGrowth = async (url: string) => {
  return await fetch(url, { method: "GET", headers: getHeaders() });
};

export const createCategory = async (data: { name: string }) => {
  console.log(data, 'service layer in data')
  return await fetch(adminCategoryApiUrl, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
};

export const updateCategory = async (
  slug: string,
  data: { title: string; slug: string }
) => {
  return await fetch(`${adminCategoryApiUrl}/${slug}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
};

export const deleteCategory = async (slug: string | undefined) => {
  return await fetch(`${adminCategoryApiUrl}/${slug}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};

export const getAdminBlogs = async (url: string) => {
  return await fetch(url, { method: "GET", headers: getHeaders() });
};

export const getBlogsGrowth = async (url: string) => {
  return await fetch(url, { method: "GET", headers: getHeaders() });
};

export const getUsersGrowth = async (url: string) => {
  return await fetch(url, { method: "GET", headers: getHeaders() });
};

export const getAllUsers = async (url: string) => {
  return await fetch(url, { method: "GET", headers: getHeaders() });
};
