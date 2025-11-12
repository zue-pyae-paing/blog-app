import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchema,
} from "../../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerapi } from "../../../services/auth.service";
import { useNavigate } from "react-router";
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
      const response = await registerapi(data);
      const result = await response.json();
      console.log(result.data);
      if (!result.data.success) {
        throw new Error(result.message);
      }
      navigate("/login");
      reset();
      console.log(data);
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
