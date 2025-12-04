import BlogRow from "./blog-row";
import { MoveDown, MoveUp, Search } from "lucide-react";
import useAdminBlog from "../../hooks/useAdminBlog";
import useAdminBlogStore from "../../../../store/useAdminBlogStore";
import EmptyBlogStage from "./empty-blog-stage";
import BlogsLoading from "./blogs-loading";

const BlogSection = () => {
  const {
    ascTitle,
    ascDate,
    ascViews,
    handleSort,
    searchRef,
    handleSearchInput,
    handleFilterChange,
  } = useAdminBlog();

  const blogs = useAdminBlogStore((state) => state.blogs);
  const loading = useAdminBlogStore((state) => state.loading);

  return (
    <div className=" border rounded-2xl p-4 flex flex-col gap-4 items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <label className="input input-primary">
          <Search />
          <input
            ref={searchRef}
            onChange={handleSearchInput}
            type="search"
            required
            placeholder="Search blog title and category"
          />
        </label>
        <select
          onChange={handleFilterChange}
          className="select select-primary w-30 bg-primary-content"
          id=""
        >
          <option className=" text-primary" value="">
            All
          </option>
          <option value="publish">Publish</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <table className=" table table-zebra  w-full">
        <thead>
          <tr>
            <th className=" flex items-center gap-x-2">
              <span>Title</span>
              {ascTitle ? (
                <MoveUp size={14} onClick={() => handleSort("title", "asc")} />
              ) : (
                <MoveDown
                  size={14}
                  onClick={() => handleSort("title", "desc")}
                />
              )}
            </th>
            <th>Author</th>
            <th className=" text-center">Category</th>
            <th className=" text-center">Status</th>
            <th className="">
              <div className=" flex items-center gap-x-2">
               
                <span className=" self-end text-end">Date</span>
                {ascDate ? (
                  <MoveUp
                    size={14}
                    onClick={() => handleSort("createdAt", "asc")}
                  />
                ) : (
                  <MoveDown
                    size={14}
                    onClick={() => handleSort("createdAt", "desc")}
                  />
                )}
              </div>
            </th>
            <th className="  flex items-center justify-end">
              <div className=" flex items-center gap-x-2">
                <span>Views</span>
                {ascViews ? (
                  <MoveUp
                    size={14}
                    onClick={() => handleSort("views", "asc")}
                  />
                ) : (
                  <MoveDown
                    size={14}
                    onClick={() => handleSort("views", "desc")}
                  />
                )}
              </div>
            </th>
            <th className=" text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && <BlogsLoading />}

          {blogs?.length === 0 && <EmptyBlogStage />}
          {blogs?.map((blog) => (
            <BlogRow key={blog._id} blog={blog} />
          ))}
        </tbody>
      </table>
      <div className=" flex items-center justify-between w-full">
        <p className=" text-sm ">Showing 1 to 6 of 100</p>
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">99</button>
          <button className="join-item btn">100</button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
