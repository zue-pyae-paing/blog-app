import { ArrowRight, Sparkles } from "lucide-react";
import Container from "../../../components/container";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <Container className=" mt-20  ">
      <section className=" space-y-4 md:py-16 py-8">
        <div className=" flex items-center gap--3 py-2 px-4 bg-primary-content text-primary border border-primary w-fit rounded-full  ">
          <Sparkles size={16} />
          <span className=" text-sm"> Welcome to MERN Blog</span>
        </div>
        <div className=" flex items-center md:flex-row flex-col gap-4">
          <div className=" flex-1 space-y-6 h-80">
            <h1 className="md:text-7xl text-5xl font-bold tracking-widest">
              Discover Premium <span className=" text-primary">Content</span>
            </h1>
            <p className=" md:text-lg ">
              Explore in-depth articles on web development, design trends, and
              cutting-edge technology. Learn from industry experts and stay
              ahead of the curve.
            </p>
            <div className=" space-x-3">
              <Link to={"/blog"}>
                <button className=" btn btn-neutral md:btn-md btn-sm">
                  Explore Articles <ArrowRight size={18} />
                </button>
              </Link>
              <Link to={"/trending"}>
                <button className=" btn md:btn-md btn-sm ">
                  Trending Today
                </button>
              </Link>
            </div>
          </div>
          <div className=" flex-1 overflow-hidden rounded-lg  shadow-lg h-80">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnYam0BmFruvQt3HQDJgVCfUnsQYcwZlZ3A&s"
              alt="Hero Section"
              className=" w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HomePage;
