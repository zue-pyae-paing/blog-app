import BlogListItem from "./blog-list-item";
import useBlog from "../hooks/useBlog";
import Pagination from "../../../components/pagination";

const BlogListSection = () => {
  const { loading, blogs, page, handlePageChange } = useBlog();
  if (loading) return <div>Loading...</div>;
  return (
    <section className=" mt-4 flex-1 ">
      <div className="  flex flex-wrap gap-4 items-center justify-center">
        {blogs.map((blog) => (
          <BlogListItem blog={blog} key={blog._id} />
        ))}
      </div>
       <Pagination page={page} handlePageChange={handlePageChange} />
    </section>
  );
};

export default BlogListSection;
