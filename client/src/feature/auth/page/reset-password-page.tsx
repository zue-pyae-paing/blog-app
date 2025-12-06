import React from "react";
import Container from "../../../components/container";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import ResetPasswordForm from "../components/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <Container className=" flex items-center flex-col justify-center">
      <Link to={"/"} className=" btn  btn-ghost self-start">
        <ArrowLeft size={18} />
        <span> Back to home</span>
      </Link>
      <ResetPasswordForm />
    </Container>
  );
};

export default ResetPasswordPage;
