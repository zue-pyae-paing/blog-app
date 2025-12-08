import Container from "../../../components/container";
import Breadcrumb from "../../../components/breadcrumb";
import useBlogDetail from "../hooks/useBlogDetail";
import { Clock, TagIcon, Dot, Calendar } from "lucide-react";
import { format } from "date-fns";
import CommentSection from "../components/comment-section";
import useBlogStore from "../../../store/useBlogStore";
import BlogDetailSkeleton from "../components/blog-detail-skeleton";

const BlogDetailPage = () => {
  const { loading } = useBlogDetail();
  const blog = useBlogStore((state) => state.blogDetail);

  if (loading) return <BlogDetailSkeleton />;
  return (
    <Container className=" space-y-4 md:w-5xl  w-full mt-20   ">
      <Breadcrumb />
      <div className=" flex items-center gap-x-2">
        <div className=" flex items-center gap-x-1">
          <TagIcon size={16} />
          <span className="text-secondary">{blog?.categoryId.name}</span>
        </div>
        <Dot />
        <div className=" flex items-center gap-x-1">
          <Clock size={16} />
          {blog?.readingTime}
          <span>min read</span>
        </div>
      </div>
      <div className="  border-b border-gray-200 py-4 space-y-8 l">
        <h1 className=" md:text-5xl text-2xl font-bold  !overfolw-auto">
          {blog?.title}
        </h1>
        <p className=" md:text-2xl text-xl text-base-content">
          {blog?.description}
        </p>
      </div>
      <div className=" flex items-center gap-x-4">
        <div className=" overflow-hidden w-20 h-20 rounded-full bg-red-400">
          <img
            src={blog?.author?.avatar}
            alt={blog?.author?.username}
            className=" w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className=" font-bold text-lg capitalize">
            {blog?.author?.username as string}
          </h3>
          <div className=" flex items-center gap-x-1">
            <Calendar size={16} />{" "}
            <span>
              {blog?.createdAt
                ? format(new Date(blog?.createdAt), "MMMM d, yyyy")
                : "Unknown date"}
            </span>
          </div>
        </div>
      </div>
      <div className=" w-full md:h-[500px] h-[300px] rounded-lg overflow-hidden">
        <img
          src={blog?.image}
          alt=""
          className=" w-full  h-full object-cover"
        />
      </div>
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: blog?.content as string }}
          className="prose pose-lg prose-headings:font-semibold prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:underline space-y-2"
        ></div>
      </div>
      <CommentSection />
    </Container>
  );
};

export default BlogDetailPage;
