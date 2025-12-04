import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { detialBlog } from "../../../services/blog.service";
import useBlogStore from "../../../store/useBlogStore";

const useBlogDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const setBlogDetail = useBlogStore((state) => state.setBlogDetail);

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

      setBlogDetail(result.data.blog);
      console.log(result.data.blog,'detail blog')
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailBlog();
  }, []);
  return { loading };
};

export default useBlogDetail;
