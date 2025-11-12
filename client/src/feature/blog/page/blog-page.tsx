import BlogListSection from "../components/blog-lists-section";
import Container from "../../../components/container";
import BlogFilter from "../components/blog-filter";


const BlogPage = () => {
  
  return (
    <Container className=" flex  ">
      <BlogFilter />
      <BlogListSection />
    </Container>
  );
};

export default BlogPage;
