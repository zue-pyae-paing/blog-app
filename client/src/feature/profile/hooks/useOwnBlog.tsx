import { useState, useEffect } from "react";
import { getAllOwnBlogs, publishBlog } from "../../../services/user.service";
import type { Blog } from "../../../types/blog";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useOwnBlog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ownBlogs, setOwnBlogs] = useState<Blog[]>([]);
  const [backUpBlogs, setBackUpBlogs] = useState<Blog[]>([]);
  const [selected, setSelected] = useState<string>("");
  const navigate = useNavigate();

  const fetchOwnBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllOwnBlogs();
      const result = await res.json();
      if (!res.ok || result.data.success === false) {
        throw new Error(result.message || "Something went wrong");
      }
      setOwnBlogs(result.data.blogs);
      setSelected("all");
      setBackUpBlogs(result.data.blogs);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnBlogs();
  }, []);

  const handleBlogs = (type: string) => {
    if (type === "all") {
      setSelected(type);
      setOwnBlogs(backUpBlogs);
    } else {
      const filteredBlogs = backUpBlogs.filter((blog) => blog.status === type);
      setSelected(type);
      setOwnBlogs(filteredBlogs);
    }
  };
  const handlePublishBlog = async (id: string) => {
    try {
      setLoading(true);
      const res = await publishBlog(id);
      const result = await res.json();
      if (!res.ok || result.data.success === false) {
        toast.error(result.message || "Something went wrong");
        return;
      }
      toast.success(result.message || "Blog published successfully!");
      fetchOwnBlogs();
      navigate("/blog");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { loading, ownBlogs, handleBlogs, selected ,handlePublishBlog};
};

export default useOwnBlog;
