import type { BlogComment ,UpdateBlogComment} from "../types/comment";
import useAccountStore from "../store/useAccountStore";
import { getHeaders } from "../utils/getHeaders";


export const commentBaseApiUrl = import.meta.env.VITE_SERVER_URI + "/comments";

export const getAllComments = async (url: string) => {
  return await fetch(url, { method: "GET" });
};

export const sendComment = async (data: BlogComment) => {
  return await fetch(`${commentBaseApiUrl}/create/${data.blogId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAccountStore.getState().accessToken}`,
    },
    body: JSON.stringify({ content: data.content }),
  });
};

export const getComment = async (blogId: string, cmtId: string) => {
  return await fetch(`${commentBaseApiUrl}/${blogId}/${cmtId}`, {
    method: "GET",
    headers: getHeaders(),
  });
};
export const updateComment = async (data:UpdateBlogComment) => {
  return await fetch(`${commentBaseApiUrl}/edit/${data.blogId}/${data.cmtId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ content: data.content }),
  });
};
export const deleteComment = async (blogId: string|undefined, cmtId: string) => {
  return await fetch(`${commentBaseApiUrl}/delete/${blogId}/${cmtId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};
