import BlogListSection from "../components/blog-lists-section";
import Container from "../../../components/container";
import BlogFilter from "../components/blog-filter";


const BlogPage = () => {
  
  return (
    <Container className=" flex lg:flex-row md:flex-col mt-20 ">
      <BlogFilter />
      <BlogListSection />
    </Container>
  );
};

export default BlogPage;
