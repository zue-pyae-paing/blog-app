import BlogListSection from "../components/blog-lists-section";
import Container from "../../../components/container";
import BlogFilter from "../components/blog-filter";
import HeroSection from "../components/hero-section";

const BlogPage = () => {
  return (
    <Container className=" mt-20 space-y-5 ">
      <HeroSection />
      <div className=" flex  lg:flex-row md:flex-col  ">
        <BlogFilter />
        <BlogListSection />
      </div>
    </Container>
  );
};

export default BlogPage;
