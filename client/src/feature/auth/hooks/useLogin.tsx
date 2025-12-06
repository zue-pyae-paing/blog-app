import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { login } from "../../../services/auth.service";
import useAccountStore from "../../../store/useAccountStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setAccount = useAccountStore((state) => state.setAccount);
  const setTokens = useAccountStore((state) => state.setTokens);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await login(data);
      const result = await response.json();
      if (!response.ok || !result.data.success) {
        toast.error(result.message || "Login failed");
        return;
      }

      toast.success(result.data.message || "Login successful!");
      setAccount(result.data.userData);
      setTokens(result.data.accessToken, result.data.refreshToken);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmit,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useLogin;
