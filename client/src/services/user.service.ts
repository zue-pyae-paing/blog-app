import { apiWrapper } from "./api.wrapper";
import { blogBaseApiUrl } from "./blog.service";

export const userBaseApiUrl = import.meta.env.VITE_SERVER_URI + "/user";
export const userOwnBlogsApiUrl =
  import.meta.env.VITE_SERVER_URI + "/blogs/my-blogs";

// -------------------------
// USER PROFILE RELATED
// -------------------------

export const changeUsername = ({ username }: { username: string }) => {
  return apiWrapper(`${userBaseApiUrl}/change-username`, {
    method: "PUT",
    body: JSON.stringify({ username }),
    headers: { "Content-Type": "application/json" },
  });
};

export const changeAvatar = (formData: FormData) => {
  return apiWrapper(`${userBaseApiUrl}/change-avatar`, {
    method: "PUT",
    body: formData,
  });
};

export const changeEmail = ({ email }: { email: string }) => {
  return apiWrapper(`${userBaseApiUrl}/change-email`, {
    method: "PUT",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" },
  });
};

// -------------------------
// PASSWORD
// -------------------------

type ChangePassword = { currentPassword: string; newPassword: string };

export const changepassword = ({
  currentPassword,
  newPassword,
}: ChangePassword) => {
  return apiWrapper(`${userBaseApiUrl}/change-password`, {
    method: "PUT",
    body: JSON.stringify({ currentPassword, newPassword }),
    headers: { "Content-Type": "application/json" },
  });
};

// -------------------------
// BLOGS (OWNER)
// -------------------------

export const getAllOwnBlogs = (status: string = "", cursor: string = "") => {
  return apiWrapper(`${userOwnBlogsApiUrl}?status=${status}&cursor=${cursor}`, {
    method: "GET",
  });
};

export const publishBlog = (id: string) => {
  return apiWrapper(`${blogBaseApiUrl}/publish/${id}`, {
    method: "PATCH",
  });
};

export const deleteBlog = (id: string) => {
  return apiWrapper(`${blogBaseApiUrl}/delete/${id}`, {
    method: "DELETE",
  });
};
