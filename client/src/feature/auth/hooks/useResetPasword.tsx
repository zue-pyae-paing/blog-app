import React from "react";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { resetPassword } from "../../../services/auth.service";
import { useNavigate, useParams } from "react-router";

const useResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const token = useParams().token;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const res = await resetPassword(token, data);
      const result = await res.json();
      if (!res.ok || !result.data.success) {
        throw new Error(result.message || "Failed to reset password");
      }
      toast.success(result.data.message || "Password reset successful!");
      reset();
      navigate("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    showPassword,
    showConfirmPassword,
  };
};

export default useResetPassword;
