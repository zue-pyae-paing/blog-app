import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import useCreateBlog from "../feature/blog/hooks/useCreateBlog";
import Container from "./container";

import { Link } from "react-router";

const Footer = () => {
  const { categories } = useCreateBlog();
  return (
    <footer className=" p-4 bg-base-300">
      <Container className="">
        <div className="grid grid-cols-4 gap-3 ">
          <div className=" space-y-3 md:col-span-1 col-span-4 ">
            <h2 className=" font-black text-2xl text-primary">MERN Blog</h2>
            <p>
              Your source for insights on web development, design, and digital
              innovation.
            </p>
          </div>
          <div className=" space-y-3 md:col-span-1 col-span-4">
            <h3 className=" font-bold">Quick Links</h3>
            <ul className=" flex flex-col">
              <Link to="/" className=" link-accent">
                Home
              </Link>
              <Link to={"/blog"} className=" link-accent">
                Blog
              </Link>

              <Link to={"/trending"} className=" link-accent">
                Trending
              </Link>
            </ul>
          </div>
          <div className=" space-y-3 md:col-span-1 col-span-4">
            <h3 className=" font-bold">Categories</h3>
            <ul className=" flex flex-col">
              {categories.map((category) => (
                <div key={category._id} className=" link-accent cursor-pointer">
                  {category.name}
                </div>
              ))}
            </ul>
          </div>
           <div className=" space-y-3 md:col-span-1 col-span-4">
            <h3 className=" font-bold">Connect</h3>
            <ul className=" flex  gap-3">
             <div className=" btn btn-soft btn-neutral btn-square btn-sm">
              <Twitter size={16}/>
             </div>
             <div className=" btn btn-soft btn-neutral btn-square btn-sm">
              <Github size={16}/>
             </div>
             <div className=" btn btn-soft btn-neutral btn-square btn-sm">
              <Linkedin size={16}/>
             </div>
             <div className=" btn btn-soft btn-neutral btn-square btn-sm">
              <Mail size={16}/>
             </div>
            </ul>
          </div>
        </div>
        <div className=" mt-5 border-t border-gray-400 pt-6">
          <p className=" text-center text-base-content text-sm">
            Copyright © 2025 - All right reserved by MERN Blog
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
