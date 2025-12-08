import useBlog from "../hooks/useBlog";
import Pagination from "../../../components/pagination";
import BlogListItem from "./blog-list-item";
import EmptyBlogList from "./empty-blogs-list";

const BlogListSection = () => {
  const { page, blogs, handlePageChange, loading } = useBlog();

  if (loading) return <div>Loading...</div>;

  return (
    <section className="md:flex-1 w-full  ">
      <div className=" w-full flex flex-col justify-between gap-y-4 relative md:items-start items-center ">
        {!loading && blogs?.length === 0 && <EmptyBlogList />}
        <div
          className={`" flex flex-wrap gap-4 items-center  md:justify-start justify-center "`}
        >
          {blogs?.map((blog) => (
            <BlogListItem blog={blog} key={blog._id} />
          ))}
        </div>
        {blogs?.length > 0 && (
          <Pagination
            page={page}
            handlePageChange={handlePageChange}
            className=" w-full"
          />
        )}
      </div>
    </section>
  );
};

export default BlogListSection;
