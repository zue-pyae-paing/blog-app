import React, { useState } from "react";
import useCommentStore from "../../../store/useCommentStore";
import { deleteComment } from "../../../services/comment.service";
import { useParams } from "react-router";
import { checkOwner } from "../../../utils/checkOwnder";
import { toast } from "react-toastify";

const useBlogCommentActions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const deletedComment = useCommentStore((state) => state.deleteComment);
  const updateComment = useCommentStore((state) => state.updatedCommet);
  const { blogId } = useParams<{ blogId: string | undefined }>()!;
  const handleDeleteComment = async (cmtId: string, userId: string) => {
    const isOwner = checkOwner(userId);
    if (!isOwner) return;
    try {
      setLoading(true);
      const response = await deleteComment(blogId, cmtId);
      const reslut = await response.json();
      if (!response.ok) toast.error(reslut.message || "Something went wrong");
      if (reslut.data.success) deletedComment(cmtId);
      toast.success(reslut.message || " Comment deleted successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { loading, handleDeleteComment };
};

export default useBlogCommentActions;
