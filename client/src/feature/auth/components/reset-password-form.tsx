import { Eye, EyeClosedIcon, LockKeyhole } from "lucide-react";
import useResetPassword from "../hooks/useResetPasword";

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    register,
    onSubmit,
    errors,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
  } = useResetPassword();
  return (
    <section className=" w-96 space-y-3">
      <div className=" space-y-3">
        <div className="w-12 h-12 bg-primary-content rounded-full text-primary flex items-center justify-center">
          <LockKeyhole />
        </div>
        <h2 className=" font-bold text-3xl">Reset Password</h2>
        <p className=" text-gray-500">
          Create a new strong password for your TechBlog account.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-y-4"
      >
        <label className="floating-label w-full">
          <span>New Password</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="input input-md grow w-full"
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
        <label className="floating-label w-full">
          <span>Confirm Password</span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="input input-md grow w-full"
            {...register("confirmPassword")}
          />
          {showPassword ? (
            <Eye
              size={16}
              onClick={toggleConfirmPasswordVisibility}
              className=" absolute top-1/2 -translate-y-1/2 right-2 z-10"
            />
          ) : (
            <EyeClosedIcon
              onClick={toggleConfirmPasswordVisibility}
              className=" absolute  right-2 top-1/2 -translate-y-1/2 z-10"
              size={16}
            />
          )}
          {errors.confirmPassword && (
            <p className="text-error text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className=" btn btn-primary "
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </section>
  );
};

export default ResetPasswordForm;
