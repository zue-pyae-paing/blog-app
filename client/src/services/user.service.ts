import useAccountStore from "../store/useAccountStore";
import { blogBaseApiUrl } from "./blog.service";

export const userBaseApiUrl = import.meta.env.VITE_SERVER_URI + "/user";
export const userOwnBlogsApiUrl =
  import.meta.env.VITE_SERVER_URI + "/blogs/my-blogs";
const getHeaders = () => {
  const accessToken = useAccountStore.getState().accessToken;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};

export const changeUsername = ({ username }: { username: string }) => {
  return fetch(`${userBaseApiUrl}/change-username`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ username }),
  });
};

export const changeAvatar = (formData: FormData) => {
  return fetch(`${userBaseApiUrl}/change-avatar`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${useAccountStore.getState().accessToken}`,
    },
    body: formData,
  });
};

export const changeEmail = ({ email }: { email: string }) => {
  return fetch(`${userBaseApiUrl}/change-email`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
};

type ChangePassword = { currentPassword: string; newPassword: string };

export const changepassword = ({
  currentPassword,
  newPassword,
}: ChangePassword) => {
  return fetch(`${userBaseApiUrl}/change-password`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
};

export const getAllOwnBlogs = (status: string = "", cursor: string = "") => {
  return fetch(`${userOwnBlogsApiUrl}?status=${status}&cursor=${cursor}`, {
    method: "GET",
    headers: getHeaders(),
  });
};

export const publishBlog = (id: string) => {
  return fetch(`${blogBaseApiUrl}/publish/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
  });
};

export const deleteBlog = (id: string) => {
  return fetch(`${blogBaseApiUrl}/delete/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};
