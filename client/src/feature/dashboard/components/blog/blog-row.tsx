import {  Eye, MoreHorizontal, Trash2 } from "lucide-react";

import type { Blog } from "../../../../types/blog";
import { format } from "date-fns";
import { Link } from "react-router";

const BlogRow = ({blog,handleDeleteBlog}: {blog: Blog,handleDeleteBlog: (id: string) => void}) => {
  

  const views =
    blog?.views > 1000 ? (blog?.views / 1000).toFixed(2) + "k" : blog?.views;

  return (
    <tr>
      <td className=" font-medium capitalize">{blog?.title}</td>
      <td className=" text-nowrap capitalize">{blog?.author?.username}</td>
      <td className=" capitalize text-center">{blog?.categoryId?.name}</td>
      <td className=" text-center">
        <div
          className={`badge badge-soft capitalize ${
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
              <Link to={"/blog/" + blog?._id} className=" text-primary">
                <Eye size={16} />
                <span>View</span>
              </Link>
            </li>
            <li>
              <div className=" text-error" onClick={() => {handleDeleteBlog(blog?._id)}}>
                <Trash2 size={16} />
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
