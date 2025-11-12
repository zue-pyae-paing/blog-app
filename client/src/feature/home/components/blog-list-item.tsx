import React from "react";
import { useNavigate } from "react-router";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  content: string;
  readingTime: string;
  category: string;
  comments: string[];
  views: string;
  likes: string[];
  createdAt: string;
}

const BlogListItem = ({ blog }: { blog: Blog }) => {
  const navigator = useNavigate();
  return (
    <div
      className=" card bg-primary-content max-w-[300px] h-80 shadow-sm hover:translate-y-2 duration-300 transition-all "
      onClick={() => navigator(`/blog/${blog._id}`)}
    >
      <figure>
        <img
          src={blog.image}
          alt={blog.title}
          className=" w-full h-50 object-cover overflow-hidden"
        />
      </figure>
      <div className=" card-body">
        <h3 className="card-title">{blog.title}</h3>
        <p>{blog.description}</p>
        <p>{blog.readingTime}minutes read</p>
      </div>
    </div>
  );
};

export default BlogListItem;
