import type { BlogComment, UpdateBlogComment } from "../types/comment";
import { apiWrapper } from "./api.wrapper";

export const commentBaseApiUrl =
  import.meta.env.VITE_SERVER_URI + "/comments";


export const getAllComments = (blogId: string, cursor: string = "") => {
  return apiWrapper(`${commentBaseApiUrl}/${blogId}?cursor=${cursor}`, {
    method: "GET",
  });
};

export const sendComment = (data: BlogComment) => {
  return apiWrapper(`${commentBaseApiUrl}/create/${data.blogId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: data.content }),
  });
};

export const getComment = (blogId: string, cmtId: string) => {
  return apiWrapper(`${commentBaseApiUrl}/${blogId}/${cmtId}`, {
    method: "GET",
  });
};


export const updateComment = (data: UpdateBlogComment) => {
  return apiWrapper(
    `${commentBaseApiUrl}/edit/${data.blogId}/${data.cmtId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: data.content }),
    }
  );
};


export const deleteComment = (
  blogId: string | undefined,
  cmtId: string
) => {
  return apiWrapper(`${commentBaseApiUrl}/delete/${blogId}/${cmtId}`, {
    method: "DELETE",
  });
};
