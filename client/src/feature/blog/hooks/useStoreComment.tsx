import { useState } from "react";
import { toast } from "react-toastify";
import { sendComment } from "../../../services/comment.service";
import { useParams } from "react-router";
import useCommentStore from "../../../store/useCommentStore";

const useStoreComment = () => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { blogId } = useParams<{ blogId: string | undefined }>();
  const addComment = useCommentStore((state) => state.addComment);

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const clearComment = () => setComment("");

  const handleSendComment = async () => {
    if (!comment.trim()) {
      toast.warn("Please enter a comment first");
      return;
    }

    try {
      setLoading(true);
      const response = await sendComment({ blogId, content: comment });
      const result = await response.json();

      if (result.success === false) toast.error(result.message);

      addComment(result.data.newComment);
      toast.success("Comment sent!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      clearComment();
    }
  };

  return {
    comment,
    loading,
    handleChangeComment,
    clearComment,
    handleSendComment,
  };
};

export default useStoreComment;
