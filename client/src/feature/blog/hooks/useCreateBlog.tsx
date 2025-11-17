import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBlogSchema,
  type CreateBlogSchema,
} from "../../../schema/blog.schema";
import { toast } from "react-toastify";
import { createBlog } from "../../../services/blog.service";
import { getCategory } from "../../../services/auth.service";
import { useNavigate } from "react-router";
import useBlogStore from "../../../store/useBlogStore";

const useCreateBlog = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const navigator = useNavigate();
  const addBlog = useBlogStore((state) => state.addBlog);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<CreateBlogSchema>({
    resolver: zodResolver(createBlogSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message || "Error fetching categories");
          return;
        }

        setCategories(result.data);
      } catch (error: any) {
        toast.error(error.message || "Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: CreateBlogSchema) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("category", data.category);

    try {
      const response = await createBlog(formData);
      const result = await response.json();

      if (!response.ok || !result.data.success) {
        toast.error(result.message || "Failed to create blog");
      }
      toast.success("Blog created successfully!");
      console.log(result, "blog crate retun data");
      addBlog(result.data.newBlog);
      setPreview("");
      reset();
      navigator("/blog");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    onSubmit,
    preview,
    categories,
    handleImageChange,
    imgInputRef,
  };
};

export default useCreateBlog;
