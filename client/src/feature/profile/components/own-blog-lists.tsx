import OwnBlogItem from "./own-blog-item";
import type { Blog } from "../../../types/blog";
import InfiniteScroll from "react-infinite-scroll-component";

interface OwnBlogListsProps {
  isDeleteLoading: boolean;
  isPublishLoading: boolean;
  hasMore: boolean;
  totalBlogs: number;
  handleLoadMore: () => void;
  ownBlogs: Blog[];
  onPublish: (id: string) => void;
  onDelete: (id: string) => void;
}

const OwnBlogLists = ({
  ownBlogs,
  isDeleteLoading,
  isPublishLoading,
  onPublish,
  onDelete,
  handleLoadMore,
  hasMore,
  totalBlogs,
}: OwnBlogListsProps) => {
  return (
    <InfiniteScroll
      dataLength={totalBlogs}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<p className="text-center py-4">Loading more...</p>}
      endMessage={<p className="text-center py-4">No more blogs</p>}
      className="mt-4 space-y-4"
    >
      {ownBlogs?.length === 0 ? (
        <div>No blog found</div>
      ) : (
        ownBlogs?.map((blog) => (
          <OwnBlogItem
            isDelete={isDeleteLoading}
            isPublish={isPublishLoading}
            blog={blog}
            key={blog._id}
            onPublishBlog={onPublish}
            onDeleteBlog={onDelete}
          />
        ))
      )}
    </InfiniteScroll>
  );
};

export default OwnBlogLists;
