import * as z from "zod";

export const createBlogSchema = z.object({
  title: z.string().trim().min(1, "Title must be at least 1 characters"),
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
  categoryId: z
    .string()
    .trim()
    .min(3, "Category must be at least 3 characters"),
});

export const updateBlogSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters long")
    .max(160, "Description must be 160 characters or less"),

  image: z
    .union([
      z.string().url().optional(),
      z.instanceof(File).optional(),
      z.null().optional(),
    ])
    .refine(
      (value) => {
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        return true;
      },
      { message: "Image must be smaller than 5MB" }
    )
    .refine(
      (value) => {
        if (value instanceof File) {
          return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
        }
        return true;
      },
      { message: "Only JPG, PNG, and WEBP formats are allowed" }
    ),

  content: z
    .string()
    .trim()
    .min(20, "Content must be at least 20 characters long"),

  categoryId: z.string().trim(),
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(3, "Category name must be at least 3 characters"),
});
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpddateBlogSchema = z.infer<typeof updateBlogSchema>;
