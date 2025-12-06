import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useCommentStore from "../../../store/useCommentStore";
import { getAllComments } from "../../../services/comment.service";
import { useParams } from "react-router";

const useComment = () => {
  const { blogId } = useParams<{ blogId: string | undefined }>();

  const comments = useCommentStore((state) => state.comments);
  const setComments = useCommentStore((state) => state.setComments);

  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalComments, setTotalComments] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = useCallback(
    async (cursor: string | undefined = undefined) => {
      if (!blogId) return;

      try {
        setLoading(true);
        const res = await getAllComments(blogId, cursor);
        const result = await res.json();

        if (!res.ok || !result?.data?.success) {
          throw new Error(result?.message || "Something went wrong");
        }
     
        const newComments = result.data.comments || [];
        const newCursor = result.data.nextCursor || null;

        if (cursor) {
          setComments([...newComments, ...comments]);
        } else {
          setComments(newComments);
        }
        setTotalComments(result.data.totalComments);
        setNextCursor(newCursor);
        setHasMore(Boolean(newCursor));
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    },
    [blogId, setComments]
  );

  useEffect(() => {
    if (blogId) {
      setNextCursor(null);
      setHasMore(true);
      fetchComments("");
    }
  }, [blogId, fetchComments, setComments]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore || !nextCursor) return;
    fetchComments(nextCursor);
  }, [loading, hasMore, nextCursor, fetchComments]);

  return { comments, loading, hasMore, loadMore, totalComments };
};

export default useComment;
