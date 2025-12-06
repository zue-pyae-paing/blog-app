import useLogin from "../hooks/useLogin";
import { EyeClosedIcon, Eye } from "lucide-react";
import { Link } from "react-router";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
  } = useLogin();
  return (
    <div className=" flex flex-col items-center gap-y-3 border border-primary max-w-[350px] p-4 rounded-lg ">
      <h1 className=" font-bold text-2xl text-primary">Welcome back!</h1>
      <form className=" w-[300px] space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="floating-label">
          <span>Your Email</span>
          <input
            type="text"
            placeholder="eg.kyaw kyaw"
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
              onClick={togglePasswordVisibility}
              className=" absolute top-1/2 -translate-y-1/2 right-2 z-10"
            />
          ) : (
            <EyeClosedIcon
              onClick={togglePasswordVisibility}
              className=" absolute  right-2 top-1/2 -translate-y-1/2 z-10"
              size={16}
            />
          )}
          {errors.password && (
            <p className="text-error text-xs">{errors.password.message}</p>
          )}
        </label>
        <Link to="/forgot-password" className=" btn btn-link">
          Forgot Password
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn  btn-primary btn-block `}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="text-center text-sm">
        Don't have an account?
        <Link to="/register" className="link link-primary">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
