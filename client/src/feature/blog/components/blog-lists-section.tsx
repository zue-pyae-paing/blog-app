import useBlog from "../hooks/useBlog";
import Pagination from "../../../components/pagination";
import BlogListItem from "./blog-list-item";

const BlogListSection = () => {
  const { page, blogs, handlePageChange } = useBlog();

  return (
    <section className="md:flex-1 w-full  ">
      <div className=" w-full flex flex-col justify-between gap-y-4 relative md:items-start items-center ">
        <div className=" flex flex-wrap gap-4 items-center md:justify-start justify-center ">
          {blogs?.map((blog) => (
            <BlogListItem blog={blog} key={blog._id} />
          ))}
        </div>
        <Pagination
          page={page}
          handlePageChange={handlePageChange}
          className=" w-full"
        />
      </div>
    </section>
  );
};

export default BlogListSection;
