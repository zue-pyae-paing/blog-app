import { useState, useRef, useCallback } from "react";

import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../../services/admin.service";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategorySchema,
  type CreateCategorySchema,
} from "../../../schema/blog.schema";
import useAdminCategoryStore from "../../../store/useCategoryStore";
import useAdminCategory from "./useAdminCategory";

const useAdminCategoryActions = () => {
  const deleteCategoryStore = useAdminCategoryStore(
    (state) => state.deleteCategory
  );
  const editCategory = useAdminCategoryStore((state) => state.category);
  const addCategory = useAdminCategoryStore((state) => state.addCategory);
  const [isCreateModal, setIsCreateModal] = useState<boolean>(false);

  const { fetchCategories } = useAdminCategory();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
  });
  const modalRef = useRef<HTMLDialogElement>(null);
  const onSubmit = async ({ name }: CreateCategorySchema) => {
    try {
      let res;
      if (isCreateModal) {
        res = await createCategory({ name });
      } else {
        res = await updateCategory(editCategory?.slug, { name });
      }

      if (!res.ok) {
        toast.error("Failed to create category");
        return;
      }
      reset();
      closeModal();
      toast.success(
        isCreateModal
          ? "Category created successfully"
          : "Category updated successfully"
      );
      fetchCategories();
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const fetchCategory = useCallback(
    async (slug: string | undefined) => {
      try {
        const res = await getCategory(slug);
        const { data } = await res.json();
        if (!res.ok) {
          toast.error("Failed to fetch category");
          return;
        }
        addCategory(data.category);
        setValue("name", data.category.name);
      } catch (error) {
        toast.error("Failed to fetch category");
      }
    },
    [addCategory, setValue]
  );

  const showModal = (isCreate: boolean, slug?: string | undefined) => {
    if (!isCreate && slug) fetchCategory(slug);
    setIsCreateModal(isCreate);
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
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
      setLoading(false);
      toast.success("Category deleted successfully");
      deleteCategoryStore(slug);
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return {
    isCreateModal,
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
    modalRef,
    editCategory,
  };
};

export default useAdminCategoryActions;
