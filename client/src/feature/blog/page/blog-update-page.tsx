import React from "react";
import Container from "../../../components/container";
import Breadcrumb from "../../../components/breadcrumb";
import BlogCreateForm from "../components/blog-create-form";

type Props = {};

const BlogUpdatePage = (props: Props) => {
  return (
    <Container>
      <Breadcrumb />
      <div className="  flex items-center justify-center flex-col gap-y-3">
        <h1 className=" font-bold text-primary text-4xl">Create New Blog</h1>
        <p className=" text-base font-medium  ">
          Share your thoughts with the world
        </p>
      </div>
      <BlogCreateForm />
    </Container>
  );
};

export default BlogUpdatePage;
