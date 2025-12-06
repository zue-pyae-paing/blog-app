import type { BlogComment, UpdateBlogComment } from "../types/comment";
import { apiWrapper } from "./api.wrapper";

export const commentBaseApiUrl =
  import.meta.env.VITE_SERVER_URI + "/comments";

// ---------------------------
// GET ALL COMMENTS
// ---------------------------
export const getAllComments = (blogId: string, cursor: string = "") => {
  return apiWrapper(`${commentBaseApiUrl}/${blogId}?cursor=${cursor}`, {
    method: "GET",
  });
};

// ---------------------------
// CREATE COMMENT
// ---------------------------
export const sendComment = (data: BlogComment) => {
  return apiWrapper(`${commentBaseApiUrl}/create/${data.blogId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: data.content }),
  });
};

// ---------------------------
// GET ONE COMMENT
// ---------------------------
export const getComment = (blogId: string, cmtId: string) => {
  return apiWrapper(`${commentBaseApiUrl}/${blogId}/${cmtId}`, {
    method: "GET",
  });
};

// ---------------------------
// UPDATE COMMENT
// ---------------------------
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

// ---------------------------
// DELETE COMMENT
// ---------------------------
export const deleteComment = (
  blogId: string | undefined,
  cmtId: string
) => {
  return apiWrapper(`${commentBaseApiUrl}/delete/${blogId}/${cmtId}`, {
    method: "DELETE",
  });
};
