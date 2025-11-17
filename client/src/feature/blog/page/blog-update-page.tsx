
import Container from "../../../components/container";
import Breadcrumb from "../../../components/breadcrumb";
import BlogEditForm from "../components/blog-edit-form";



const BlogUpdatePage = () => {
  return (
    <Container className="mt-20">
      <Breadcrumb />
      <div className="  flex items-center justify-center flex-col gap-y-3">
        <h1 className=" font-bold text-primary text-4xl">Update Blog</h1>
        <p className=" text-base font-medium  ">
          Share your thoughts with the world
        </p>
      </div>
      <BlogEditForm />
    </Container>
  );
};

export default BlogUpdatePage;
