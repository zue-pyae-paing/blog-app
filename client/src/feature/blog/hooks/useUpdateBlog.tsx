import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { updateBlog } from "../../../services/blog.service";
import useBlogStore from "../../../store/useBlogStore";
import { getCategory } from "../../../services/auth.service";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router";
import useBlogDetail from "./useBlogDetail";
import { updateBlogSchema, type UpddateBlogSchema } from "../../../schema/blog.schema";

const useUpdateBlog = () => {
  useBlogDetail();
  const [categories, setCategories] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const blog = useBlogStore((state) => state.blogDetail);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpddateBlogSchema>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      image: undefined,
    },
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onCreate({ editor }) {
      if (blog) {
        editor.commands.setContent(blog.content || "");
      }
    },
    onUpdate({ editor }) {
      setValue("content", editor.getHTML(), { shouldValidate: true });
    },
  });

  // old data ကို form ထဲထည့်
  useEffect(() => {
    if (blog && editor) {
      editor?.commands.setContent(blog?.content || "");
      reset({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        category: blog.category,
        image: undefined,
      });
      setPreview(blog.image || null);
    }
  }, [blog, reset, editor]);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        const result = await res.json();
        if (!res.ok)
          throw new Error(result.message || "Failed to fetch categories");
        setCategories(result.data);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });
  };

  const onSubmit = async (data: UpddateBlogSchema) => {
    console.log( data,'submmit update blog')
    if (!blog?._id) return toast.error("No blog ID found");
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("category", data.category);

    try {
      const res = await updateBlog(blog._id, formData);
      const result = await res.json();
      if (!res.ok || !result.data?.success)
        throw new Error(result.message || "Failed to update blog");
      toast.success("Blog updated successfully!");
      navigate(`/blog`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    preview,
    categories,
    imgInputRef,
    handleImageChange,
    onSubmit,
    editor,
  };
};

export default useUpdateBlog;
