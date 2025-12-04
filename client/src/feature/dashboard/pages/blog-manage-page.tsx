import React from "react";
import BlogSection from "../components/blog/blog-section";
import Container from "../../../components/container";

const BlogManagePage = () => {
  return (
    <Container className="space-y-4">
      <div>
        <h2 className=" font-bold text-3xl ">Blog Management</h2>
        <p>Manage and organize your blog posts</p>
      </div>

      <BlogSection />
    </Container>
  );
};

export default BlogManagePage;
