import OwnBlogItem from "./own-blog-item";
import type { Blog } from "../../../types/blog";

const OwnBlogLists = ({
  loading,
  ownBlogs,
  handlePublishBlog
}: {
  loading: boolean;
  ownBlogs: Blog[];
  handlePublishBlog:(id:string)=>void
}) => {
  if (loading) return <div>Loading...</div>;
  return (
    <div className="space-y-4 mt-4">
      {ownBlogs?.length === 0 ? (
        <div>No blog found</div>
      ) : (
        ownBlogs?.map((blog) => <OwnBlogItem blog={blog} key={blog._id} handlePublishBlog={handlePublishBlog} />)
      )}
    </div>
  );
};

export default OwnBlogLists;
