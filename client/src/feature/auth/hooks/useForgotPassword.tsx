import React from "react";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../services/auth.service";

const useForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const res = await forgotPassword(data);
      const result = await res.json();
      if (!res.ok || !result.data.success) {
        throw new Error(result.message || "Failed to reset password");
      }
      toast.success(result.data.message || "Reset password link email sent!");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};

export default useForgotPassword;
