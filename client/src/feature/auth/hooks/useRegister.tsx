import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchema,
} from "../../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerApi } from "../../../services/auth.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const useRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await registerApi(data);
      const result = await response.json();
      if (result.ok === false) {
        throw toast.error(result.message || "Registration failed");
      }
      navigate("/login");
      reset();
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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

export default useRegister;
