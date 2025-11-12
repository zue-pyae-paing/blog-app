import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { detialBlog } from "../../../services/blog.service";
import type {  Blog,  DetailBlog } from "../../../types/blog";

const useBlogDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<DetailBlog>({
    blog: {} as Blog,
  });

  const params = useParams();

  const fetchDetailBlog = async () => {
    try {
      setLoading(true);
      const response = await detialBlog(params.blogId!);
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }
      setBlog(result.data);
      console.log(result.data, 'blog detail');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailBlog();
  }, []);
  return { loading, blog };
};

export default useBlogDetail;
