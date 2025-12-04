import { Edit2, Eye, MoreHorizontal, MoreVertical, Trash2 } from "lucide-react";

import type { Blog } from "../../../../types/blog";
import { format } from "date-fns";

const BlogRow = ({ blog }: { blog: Blog }) => {
  const views =
    blog?.views > 1000 ? (blog?.views / 1000).toFixed(2) + "k" : blog?.views;

 
  return (
    <tr>
      <td className=" font-medium capitalize">{blog?.title}</td>
      <td className=" text-nowrap capitalize">{blog?.author?.username}</td>
      <td className=" capitalize text-center">{blog?.categoryId?.name}</td>
      <td className=" text-center">
        <div
          className={`badge badge-soft  ${
            blog?.status == "publish" ? "badge-success" : "badge-warning"
          } `}
        >
          {blog?.status}
        </div>
      </td>
      <td>{format(new Date(blog?.createdAt), "dd/MM/yyyy")}</td>
      <td className="  text-right">{views}</td>
      <td className="text-center">
        <div className="dropdown dropdown-center">
          <div tabIndex={0} role="button" className=" ">
            <MoreHorizontal size={16} />
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-primary-content rounded-box z-1 w-34 p-2 shadow-sm"
          >
            <li>
              <div className=" text-primary">
                <Eye size={16} />
                <span>View</span>
              </div>
            </li>
            <li>
              <div className=" text-primary">
                <Edit2 size={16} />
                <span>Edit</span>
              </div>
            </li>
            <li>
              <div className=" text-error">
                <Trash2 size={16}  />
                <p>Delete</p>
              </div>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default BlogRow;
