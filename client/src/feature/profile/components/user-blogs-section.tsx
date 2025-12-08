import { Link } from "react-router";
import useOwnBlog from "../hooks/useOwnBlog";
import OwnBlogLists from "./own-blog-lists";

const UserOwnBlogsSection = () => {
  const {
    handleBlogs,
    isDeleteLoading,
    isPublishLoading,
    ownBlogs,
    selected,
    handleLoadMore,
    handlePublishBlog,
    handleDeleteBlog,
    hasMore,
    totalBlogs,
    handleUnpublishBlog,
  } = useOwnBlog();

  return (
    <section className=" relative">
      <div className=" flex items-center justify-between">
        <h2 className=" font-bold text-xl md:text-2xl text-primary">
          My Blog Posts
        </h2>
        <Link to={'/create'} className=" btn btn-primary  btn-sm">New Post</Link>
      </div>
      <div className="  space-x-4 py-4 border-b">
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
        ownBlogs={ownBlogs}
        onPublish={handlePublishBlog}
        onDelete={handleDeleteBlog}
        isDeleteLoading={isDeleteLoading}
        isPublishLoading={isPublishLoading}
        hasMore={hasMore}
        handleLoadMore={handleLoadMore}
        totalBlogs={totalBlogs}
        onUnpublish={handleUnpublishBlog}
      />
    </section>
  );
};

export default UserOwnBlogsSection;
