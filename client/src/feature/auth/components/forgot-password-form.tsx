import { Mail } from "lucide-react";
import { Link } from "react-router";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useForgotPassword();
  return (
    <section className=" w-96 space-y-3">
      <div className=" space-y-3">
        <div className="w-12 h-12 bg-primary-content rounded-full text-primary flex items-center justify-center">
          <Mail />
        </div>
        <h2 className=" font-bold text-3xl">Forgot Password?</h2>
        <p className=" text-gray-500">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-y-4"
      >
        <label className="floating-label w-full">
          <span>Your Email</span>
          <input
            type="text"
            placeholder="eg.kyaw kyaw"
            className="input input-md w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-error text-xs">{errors.email.message}</p>
          )}
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className=" btn btn-primary "
        >
          {isSubmitting ? "Loading..." : "Reset Password"}
        </button>
      </form>
      <p className=" text-sm text-center">
        Remember your password?{" "}
        <Link to={"/login"} className=" link text-primary">
          Sign in
        </Link>
      </p>
    </section>
  );
};

export default ForgotPasswordForm;
