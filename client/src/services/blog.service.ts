import useAccountStore from "../store/useAccountStore";
import { apiWrapper } from "./api.wrapper";

const accessToken = useAccountStore.getState().accessToken

export const blogBaseApiUrl = import.meta.env.VITE_SERVER_URI + "/blogs";

export const getAllBlogs = (url: string) => {
  return apiWrapper(url, { method: "GET" });
};

export const getTrendingBlogs = () => {
  return apiWrapper(`${blogBaseApiUrl}/trending`, { method: "GET" });
};

export const detailBlog = (id: string) => {
  return apiWrapper(`${blogBaseApiUrl}/detail/${id}`, { method: "GET" });
};

export const createBlog = (data: FormData) => {
  return apiWrapper(`${blogBaseApiUrl}/create`, {
    method: "POST",
    body: data,
  });
};

export const updateBlog = (id: string, data: FormData) => {
  return apiWrapper(`${blogBaseApiUrl}/update/${id}`, {
    method: "PUT",
    body: data,
  });
};
