import Container from "../../../components/container";
import Breadcrumb from "../../../components/breadcrumb";
import TrendingSection from "../components/trending-section";
import HeroSection from "../components/hero-section";

const TrendingPage = () => {

  return (
    <Container className=" mt-20 ">
      <Breadcrumb />
      <HeroSection/>
      <TrendingSection/>
    </Container>
  );
};

export default TrendingPage;
