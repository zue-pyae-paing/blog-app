import BlogListSection from "../components/blog-lists-section";
import Container from "../../../components/container";
import BlogFilter from "../components/blog-filter";

const BlogPage = () => {
  return (
    <Container className=" mt-20 space-y-5 md:6xl w-full ">
      <div className=" flex  lg:flex-row md:flex-col flex-col md:gap-0 gap-4 ">
        <BlogFilter />
        <BlogListSection />
      </div>
    </Container>
  );
};

export default BlogPage;
