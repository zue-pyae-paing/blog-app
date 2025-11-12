import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="bg-primary w-full h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="md:text-9xl text-7xl font-bold text-white tracking-widest">
            404
          </h1>
          <p className="md:text-2xl text-xl font-bold text-white tracking-widest mt-4">
            Page Not Found
          </p>
          <p className="text-white mt-4 md:text-base text-sm">
            The page you are looking for does not exist.
          </p>
          <Link to="/" className="btn btn-secondary mt-4 md:btn-md btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
