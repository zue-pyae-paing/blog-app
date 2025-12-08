import { useState, useEffect } from "react";
import {
  deleteBlog,
  getAllOwnBlogs,
  publishBlog,
  unpublishBlog,
} from "../../../services/user.service";
import type { Blog } from "../../../types/blog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useOwnBlog = () => {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isPublishLoading, setIsPublishLoading] = useState<boolean>(false);
  const [ownBlogs, setOwnBlogs] = useState<Blog[]>([]);
  const [selected, setSelected] = useState<string>("all");
  const [nextCursor, setNextCursor] = useState<string | null>("");
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchOwnBlogs = async (status: string = "", cursor: string = "") => {
    try {
      const res = await getAllOwnBlogs(status, cursor);
      const result = await res.json();

      if (!res.ok || !result?.data?.success) {
        throw new Error(result?.message || "Something went wrong");
      }
      if (cursor) {
        setOwnBlogs((prev) => [...prev, ...result?.data?.blogs]);
      } else {
        setOwnBlogs(result?.data?.blogs);
      }

      setTotalBlogs(result?.data?.totalBlogs);
      setNextCursor(result?.data?.nextCursor);
      setHasMore(result?.data?.hasMore);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch blogs");
    }
  };

  useEffect(() => {
    setOwnBlogs([]);
    setNextCursor(null);
    setHasMore(true);
    fetchOwnBlogs(selected === "all" ? "" : selected);
  }, [selected]);

  const handleLoadMore = () => {
    if (!hasMore || !nextCursor) return;
    fetchOwnBlogs(selected === "all" ? "" : selected, nextCursor || "");
  };

  const handleBlogs = (type: string) => setSelected(type);

  const handlePublishBlog = async (id: string) => {
    try {
      setIsPublishLoading(true);
      const res = await publishBlog(id);
      const result = await res.json();

      if (!res.ok || !result?.data?.success) {
        toast.error(result?.message || "Something went wrong");
        return;
      }

      toast.success(result?.message || "Blog published successfully!");
      fetchOwnBlogs(selected === "all" ? "" : selected);
      navigate("/blog");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsPublishLoading(false);
    }
  };

  const handleUnpublishBlog = async (id: string) => {
    try {
      setIsPublishLoading(true);
      const res = await unpublishBlog(id);
      const result = await res.json();

      if (!res.ok || !result?.data?.success) {
        toast.error(result?.message || "Something went wrong");
        return;
      }

      toast.success(result?.message || "Blog unpublished successfully!");
      fetchOwnBlogs(selected === "all" ? "" : selected);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsPublishLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      setIsDeleteLoading(true);
      const res = await deleteBlog(id);
      const result = await res.json();

      if (!res.ok || !result?.data?.success) {
        toast.error(result?.message || "Something went wrong");
        return;
      }

      toast.success(result?.message || "Blog deleted successfully!");
      setOwnBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return {
    isDeleteLoading,
    isPublishLoading,
    ownBlogs,
    handleBlogs,
    selected,
    handlePublishBlog,
    handleDeleteBlog,
    hasMore,
    handleLoadMore,
    totalBlogs,
    handleUnpublishBlog
  };
};

export default useOwnBlog;
