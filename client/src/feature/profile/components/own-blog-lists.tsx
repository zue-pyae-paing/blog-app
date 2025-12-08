import OwnBlogItem from "./own-blog-item";
import type { Blog } from "../../../types/blog";
import InfiniteScroll from "react-infinite-scroll-component";
import { FileX } from "lucide-react";

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
      loader={
        <div className="flex items-center justify-center py-6">
          <span className="loading loading-spinner loading-md text-primary"></span>
        </div>
      }
      endMessage={<p className="text-center py-4"></p>}
      className="mt-4 space-y-4"
    >
      {ownBlogs?.length === 0 ? (
        <div className="w-full py-10 flex flex-col items-center text-center text-base-content/70">
          <FileX size={48} className=" text-primary" />
          <h3 className="font-semibold text-lg mt-4 text-primary">
            No Blogs Yet
          </h3>
          <p className="text-sm">You haven’t created any blog posts.</p>
        </div>
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
