import useOwnBlog from "../hooks/useOwnBlog";
import OwnBlogLists from "./own-blog-lists";

const UserOwnBlogsSection = () => {
  const { handleBlogs, loading, ownBlogs, selected, handlePublishBlog } =
    useOwnBlog();

  return (
    <section>
      <div className=" flex items-center justify-between">
        <h2 className=" font-bold text-xl md:text-2xl text-primary">
          My Blog Posts
        </h2>
        <button className=" btn btn-primary  btn-sm">New Post</button>
      </div>
      <div className=" space-x-4 py-4 border-b">
        <button
          className={` ${
            selected === "all" ? "btn-primary" : "btn-secondary"
          } btn btn-outline btn-sm`}
          type="button"
          onClick={() => {
            handleBlogs("all");
          }}
        >
          All
        </button>
        <button
          className={` ${
            selected === "publish" ? "btn-primary" : " btn-secondary"
          } btn btn-outline  btn-sm`}
          type="button"
          onClick={() => handleBlogs("publish")}
        >
          Publish
        </button>
        <button
          className={` ${
            selected === "draft" ? "btn-primary" : "btn-secondary"
          } btn btn-outline  btn-sm`}
          type="button"
          onClick={() => handleBlogs("draft")}
        >
          Draft
        </button>
      </div>
      <OwnBlogLists
        loading={loading}
        ownBlogs={ownBlogs}
        handlePublishBlog={handlePublishBlog}
      />
    </section>
  );
};

export default UserOwnBlogsSection;
