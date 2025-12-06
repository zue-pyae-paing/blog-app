import { useNavigate } from "react-router";
import type { Blog } from "../../../types/blog";
import { Eye, BookOpen } from "lucide-react";

const BlogListItem = ({ blog }: { blog: Blog }) => {
  const navigator = useNavigate();
  return (
    <div
      className=" card bg-primary-content md:w-60 w-75 h-80 shadow-sm hover:translate-y-2 hover:shadow-xl duration-300 transition-all"
      onClick={() => navigator(`/blog/${blog._id}`)}
    >
      <figure>
        <img
          src={blog.image}
          alt={blog.title}
          className=" w-full h-50 object-cover overflow-hidden "
        />
      </figure>
      <div className=" card-body">
        <h3 className="card-title line-clamp-1">{blog.title}</h3>
        <p className=" line-clamp-2">{blog.description}</p>
        <div className="flex items-center justify-between w-full">
          <p className="text-primary flex items-center gap-x-2">
            <BookOpen size={16} />
            {blog.readingTime}min read
          </p>
          <p className="text-primary flex items-center  gap-x-2">
            <Eye size={16} />
            {blog.views < 1000 ? blog.views : `${blog.views / 1000}k`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogListItem;
