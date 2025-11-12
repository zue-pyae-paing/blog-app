import useAccountStore from "../store/useAccountStore";
import { getHeaders } from "../utils/getHeaders";

export const blogBaseApiUrl = import.meta.env.VITE_SERVER_URI + "/blogs";

const accessToken = useAccountStore.getState().accessToken;

export const getAllBlogs = async (url: string) => {
  return await fetch(url, { method: "GET" });
};

export const getTrendingBlogs = async () => {
  return await fetch(blogBaseApiUrl + "/trending", { method: "GET" });
};

export const detialBlog = async (id: string) => {
  return await fetch(blogBaseApiUrl + `/detail/${id}`, { method: "GET" });
};

export const createBlog = async (data: FormData) => {
  return await fetch(blogBaseApiUrl + "/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });
};
