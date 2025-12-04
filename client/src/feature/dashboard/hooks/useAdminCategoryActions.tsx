import { useState } from "react";

import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
} from "../../../services/admin.service";
import useAdminCategory from "./useAdminCategory";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategorySchema,
  type CreateCategorySchema,
} from "../../../schema/blog.schema";

const useAdminCategoryActions = () => {
  const { fetchCategories } = useAdminCategory();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit = async (data: CreateCategorySchema) => {
    try {
      const res = await createCategory({ name: data.name });
      console.log(res, "res");
      if (!res.ok) {
        toast.error("Failed to create category");
        return;
      }
      await res.json();
      reset();
      closeModal();
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  let modal = document.getElementById("my_modal_1") as HTMLDialogElement | null;

  const showModal = () => {
    if (modal) modal.showModal();
  };
  const closeModal = () => {
    if (modal) modal.close();
  };

  const handleDeleteCategory = async (slug: string | undefined) => {
    try {
      setLoading(true);
      const res = await deleteCategory(slug);
      if (!res.ok) {
        toast.error("Failed to delete category");
        setLoading(false);
        return;
      }
      await res.json();
      toast.success("Category deleted successfully");
      fetchCategories();
      setLoading(false);
      toast.success("Category deleted successfully");
    } catch (error) {}
  };
  return {
    loading,
    handleDeleteCategory,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmit,
    showModal,
    closeModal,
  };
};

export default useAdminCategoryActions;
