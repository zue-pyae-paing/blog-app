import {
  BookOpen,
  Calendar1,
  CheckCircle,
  Edit2,
  Eye,
  MoreVertical,
  Trash2,
} from "lucide-react";
import type { Blog } from "../../../types/blog";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

interface OwnBlogItemProps {
  isDelete: boolean;
  isPublish: boolean;
  blog: Blog;
  onPublishBlog: (id: string) => void;
  onDeleteBlog: (id: string) => void;
}

const OwnBlogItem = ({
  isDelete,
  isPublish,
  blog,
  onPublishBlog,
  onDeleteBlog,
}: OwnBlogItemProps) => {
  const {
    _id,
    title,
    description,
    image,
    category,
    createdAt,
    readingTime,
    status,
  } = blog;

  return (
    <div className="card bg-base-200 w-full shadow-sm md:flex-row flex-col overflow-hidden gap-3">
      <div className="md:w-60 w-full md:h-50 h-60 overflow-hidden">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-center"
          />
        )}
      </div>

      <div className="relative flex-1 flex-col flex justify-evenly p-3 gap-3">
        <div className="space-x-3">
          <span className="badge badge-soft badge-primary">{category}</span>
          <span
            className={`badge badge-soft ${
              status === "publish" ? "badge-success" : "badge-warning"
            }`}
          >
            {status}
          </span>
        </div>

        <h3 className="card-title hover:text-primary">{title}</h3>
        <p className="line-clamp-2">{description}</p>

        <div className="flex items-center gap-x-4 justify-between border-t border-gray-300 pt-3">
          <p className="text-sm flex items-center gap-x-3 text-secondary">
            <BookOpen size={16} />
            {readingTime} min read
          </p>
          <p className="text-sm text-primary flex items-center gap-x-3">
            <Calendar1 size={16} />
            {formatDistanceToNow(new Date(createdAt),{addSuffix: true})}
          </p>
        </div>

        <div className="dropdown dropdown-end absolute top-0 right-3">
          <div
            tabIndex={0}
            role="button"
            className="p-2 rounded-full hover:bg-base-300"
          >
            <MoreVertical size={16} />
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {status === "draft" && (
              <li onClick={() => onPublishBlog(_id)}>
                <a className="text-success">
                  <CheckCircle size={16} />{" "}
                  {isPublish ? "Publishing..." : "Publish"}
                </a>
              </li>
            )}
            <li>
              <Link className="text-primary" to={`/edit/${_id}`}>
                <Edit2 size={16} /> Edit
              </Link>
            </li>
            <li onClick={() => onDeleteBlog(_id)}>
              <a className="text-red-500">
                <Trash2 size={16} /> {isDelete ? "Deleting..." : "Delete"}
              </a>
            </li>
            <li>
              <Link to={`/blog/${_id}`}>
                <Eye size={16} /> View
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OwnBlogItem;
