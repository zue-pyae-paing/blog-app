import { Link, NavLink } from "react-router";
import Container from "./container";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeBtn from "./theme-btn";
import { checkIsAuthorized } from "../utils/isAuthorize";
import { checkAdmin } from "../utils/checkAdmin";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const isAuthorized = checkIsAuthorized();
  const isAdmin = checkAdmin();

  return (
    <nav className="  w-full fixed h-20  top-0 z-10 bg-base-200 ">
      <Container className="  flex justify-between items-center">
        <Link
          to={"/"}
          className=" font-bold md:text-4xl text-2xl text-primary relative"
        >
          MERN Blog
        </Link>
        <div className=" flex items-center ">
          <div className=" md:flex hidden space-x-2">
            <ThemeBtn />
            <NavLink
              to="/"
              className="btn btn-primary btn-sm"
              onClick={() => setShow(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/blog"
              className="btn btn-primary btn-sm"
              onClick={() => setShow(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/trending"
              className="btn btn-primary btn-sm"
              onClick={() => setShow(false)}
            >
              Trending
            </NavLink>
            {isAdmin && isAuthorized && (
              <NavLink
                to="/dashboard"
                className="btn btn-primary btn-sm"
                onClick={() => setShow(false)}
              >
                Admin
              </NavLink>
            )}
            {isAuthorized ? (
              <>
                <NavLink
                  to="/create"
                  className="btn btn-primary btn-sm"
                  onClick={() => setShow(false)}
                >
                  Write
                </NavLink>
                <NavLink
                  to="/profile"
                  className="btn btn-primary btn-sm"
                  onClick={() => setShow(false)}
                >
                  Profile
                </NavLink>
              </>
            ) : (
              <NavLink
                to={"/login"}
                className="btn btn-primary btn-sm"
                onClick={() => setShow(false)}
              >
                Login
              </NavLink>
            )}
          </div>
          <div className=" md:hidden block">
            <button
              className="btn btn-square btn-primary btn-sm"
              onClick={() => setShow((p) => !p)}
            >
              {show ? <X /> : <Menu />}
            </button>
          </div>

          <div
            className={` md:hidden  absolute top-14 right-0 z-50 w-48 bg-base-100 border space-y-2 rounded-lg p-4 flex flex-col transform transition-all duration-300 ease-in-out ${
              show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <NavLink
              to="/"
              className="btn btn-primary btn-sm btn-wide"
              onClick={() => setShow(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/blog"
              className="btn btn-primary   btn-sm"
              onClick={() => setShow(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/trending"
              className="btn btn-primary  btn-sm"
              onClick={() => setShow(false)}
            >
              Trending
            </NavLink>
            {isAuthorized ? (
              <>
                <NavLink
                  to="/create"
                  className="btn btn-primary btn-sm"
                  onClick={() => setShow(false)}
                >
                  Write
                </NavLink>
                <NavLink
                  to="/profile"
                  className="btn btn-primary btn-sm"
                  onClick={() => setShow(false)}
                >
                  Profile
                </NavLink>
              </>
            ) : (
              <NavLink
                to={"/login"}
                className="btn btn-primary btn-sm"
                onClick={() => setShow(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
