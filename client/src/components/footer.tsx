import React from "react";
import Container from "./container";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className=" p-4 bg-base-300">
      <Container className="">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className=" space-y-3 ">
            <h2 className=" font-black text-2xl text-primary">MERN Blog</h2>
            <p>
              Your source for insights on web development, design, and digital
              innovation.
            </p>
          </div>
          <div className=" space-y-3">
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
          <div className="">
            <h3 className=" font-bold">Categories</h3>
            <ul>
              <li>React</li>
              <li>React</li>
              <li>React</li>
              <li>React</li>
              <li>React</li>
            </ul>
          </div>
          <div className=" space-y-3">
            <h3 className=" font-bold">Connect</h3>
            <div className=" space-x-3">
              <div className=" btn btn-soft btn-secondary btn-square">
                <Twitter />
              </div>
              <div className=" btn btn-soft btn-secondary btn-square">
                <Github />
              </div>
              <div className=" btn btn-soft btn-secondary btn-square">
                <Linkedin />
              </div>
              <div className=" btn btn-soft btn-secondary btn-square">
                <Mail />
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-5 border-t border-gray-400 pt-6">
          <p className=" text-center text-base-content">
            Copyright © 2025 - All right reserved by MERN Blog
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
