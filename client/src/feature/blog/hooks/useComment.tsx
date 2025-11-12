import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useCommentStore from "../../../store/useCommentStore";
import {
  commentBaseApiUrl,
  getAllComments,
} from "../../../services/comment.service";
import { useParams } from "react-router";
import useInfiniteScroll from "react-infinite-scroll-hook";

const useComment = () => {
  const comments = useCommentStore((state) => state.comments);
  const setComments = useCommentStore((state) => state.setComments);

  const { blogId } = useParams<{ blogId: string }>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = useCallback(
    async (pageNum: number) => {
      if (!blogId) return;
      setLoading(true);
      try {
        const response = await getAllComments(
          `${commentBaseApiUrl}/${blogId}?page=${pageNum}`
        );
        const result = await response.json();

        if (!response.ok || result.data.success === false) {
          toast.error(
            result.message || "Something went wrong while fetching comments"
          );
          return;
        }

        const newComments = result.data.comments;

        if (pageNum === 1) {
          setComments(newComments);
        } else {
          setComments([...comments, ...newComments]);
        }

        setHasMore(pageNum < result.data.totalPages);
        console.log(result.data.totalPages, "total pages");
        console.log(result.data.totalComments,'total comments');
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [blogId, comments, setComments]
  );

  useEffect(() => {
    fetchComments(1);
  }, [blogId]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchComments(nextPage);
    }
  }, [page, hasMore, loading, fetchComments]);

  // ✅ useInfiniteScroll hook
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    disabled: !hasMore,
    rootMargin: "0px 0px 200px 0px",
  });

  return { comments, loading, hasMore, sentryRef };
};

export default useComment;
