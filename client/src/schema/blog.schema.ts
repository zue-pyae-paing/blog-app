import * as z from "zod";

export const createBlogSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(160, "Description must be less than 160 characters"),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be smaller than 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
  content: z.string().trim().min(20, "Content must be at least 20 characters"),
  category: z.string().trim().min(3, "Category must be at least 3 characters"),
});

export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
