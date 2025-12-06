import Container from "../../../components/container";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import ForgotPasswordForm from "../components/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <Container className=" flex items-center flex-col justify-center">
      <Link to={"/"} className=" btn  btn-ghost self-start">
        <ArrowLeft size={18} />
        <span> Back to home</span>
      </Link>
      <ForgotPasswordForm />
    </Container>
  );
};

export default ForgotPasswordPage;
