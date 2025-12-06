import { Link } from "react-router";
import useRegister from "../hooks/useRegister";
import { Eye, EyeClosedIcon } from "lucide-react";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
  } = useRegister();
  return (
    <div className=" flex flex-col items-center gap-y-3 border border-primary max-w-[350px] p-4 rounded-lg ">
      <h1 className=" font-bold text-2xl text-primary">Create an account</h1>
      <form className=" w-[300px] space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="floating-label">
          <span>Your Name</span>
          <input
            type="text"
            placeholder="eg.kyaw kyaw"
            className="input input-md"
            {...register("username")}
          />
          {errors.email && (
            <p className="text-error text-xs">{errors.email.message}</p>
          )}
        </label>
        <label className="floating-label">
          <span>Your Email</span>
          <input
            type="text"
            placeholder="mail@site.com"
            className="input input-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-error text-xs">{errors.email.message}</p>
          )}
        </label>
        <label className="floating-label">
          <span>Your Password</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            className="input input-md grow"
            {...register("password")}
          />
          {showPassword ? (
            <Eye
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <EyeClosedIcon
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 "
              onClick={togglePasswordVisibility}
            />
          )}
          {errors.password && (
            <p className="text-error text-xs">{errors.password.message}</p>
          )}
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting && "loading"} btn-primary btn-block `}
        >
          Register
        </button>
      </form>
      <p className="text-center mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="link link-primary">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
