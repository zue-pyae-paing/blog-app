import { Link } from "react-router";
import LoginForm from "../components/login-form";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
  return (
    <section className=" w-full h-screen  flex flex-col items-center justify-center relative">
      <Link to="/" className=" btn-sm btn-ghost btn absolute top-4 left-4">
        <ArrowLeft size={18} />
        <span>Back to home</span>
      </Link>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
