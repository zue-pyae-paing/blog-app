import { Link } from "react-router";
import RegisterForm from "../components/register-form";
import { ArrowLeft } from "lucide-react";

const RegisterPage = () => {
  return (
    <section className=" w-full h-screen flex flex-col items-center justify-center relative">
        <Link to="/" className=" btn-sm btn-ghost btn absolute top-4 left-4">
        <ArrowLeft />
      </Link>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
