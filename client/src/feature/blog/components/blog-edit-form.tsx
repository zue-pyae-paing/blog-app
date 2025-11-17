import Tiptap from "./tip-tap";
import { Controller } from "react-hook-form";
import { ImagePlus, Send } from "lucide-react";
import useUpadeteBlog from "../hooks/useUpdateBlog";
import useBlogStore from "../../../store/useBlogStore";

const BlogEditForm = () => {
  const {
    register,
    control,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    preview,
    categories,
    imgInputRef,
    handleImageChange,
  } = useUpadeteBlog();

  return (
    <form className="relative space-y-3 p-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div className="bg-base-200 p-6 rounded-lg space-y-3 border border-base-300">
        <h3 className="font-bold text-info text-xl">Post Title</h3>
        <p className="text-sm text-base-content">
          Edit a compelling headline for your post
        </p>
        <input
          type="text"
          {...register("title")}
          placeholder="Enter your blog post title"
          className="input input-md w-full mt-4"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="bg-base-200 p-6 rounded-lg space-y-3 border border-base-300">
        <h3 className="font-bold text-info text-xl">Feature Image</h3>
        <p className="text-sm text-base-content">
          Upload a cover image for your post
        </p>

        {/* Hidden input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imgInputRef}
          hidden
        />

        {/* Upload button */}
        <div
          onClick={() => imgInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-base-300 rounded-lg flex flex-col items-center justify-center p-6 hover:border-info transition"
        >
          {preview ? (
            <div className="flex items-center justify-center flex-col gap-3">
              <img
                src={preview}
                alt="Preview"
                className="w-100 h-auto object-cover rounded-lg"
              />
              <p className="text-sm">Click to change image</p>
            </div>
          ) : (
            <>
              <ImagePlus size={48} className="text-info" />
              <p className="text-sm text-gray-500 mt-2 font-bold">
                Click to upload an image
              </p>
              <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
        </div>

        {errors?.image && (
          <p className="text-sm text-red-500 mt-1">
            {errors?.image?.message as string}
          </p>
        )}
      </div>

      {/* Description + Category */}
      <div className="flex w-full gap-x-6 md:flex-row flex-col">
        <div className="bg-base-200 p-6 rounded-lg space-y-3 border border-base-300 md:w-1/2 w-full">
          <h3 className="font-bold text-info text-xl">Description</h3>
          <p className="text-sm text-base-content">
            Brief summary of your post
          </p>
          <input
            type="text"
            {...register("description")}
            placeholder="Enter a short description..."
            className="input input-md w-full mt-4"
          />
          {errors.description && (
            <p className="text-sm text-red-500">
              {errors.description.message as string}
            </p>
          )}
        </div>

        <div className="bg-base-200 p-6 rounded-lg space-y-3 border border-base-300 md:w-1/2 w-full">
          <h3 className="font-bold text-info text-xl">Category</h3>
          <p className="text-sm text-base-content">
            Choose a category for your post
          </p>
          <select
            className="select select-neutral mt-4 w-full border border-base-300"
            {...register("category")}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className=" text-sm text-red-500">{errors.category?.message}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-base-200 p-6 rounded-lg space-y-3 border border-base-300">
        <h3 className="font-bold text-info text-xl">Post Content</h3>
        <p className="text-sm text-base-content">
          Write the main content of your blog post
        </p>
        <Controller
          name="content"
          control={control}
          rules={{ required: "Content is required" }}
          render={({ field }) => (
            <Tiptap value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={isSubmitting}
        type="submit"
        className="btn btn-accent md:btn-md btn-sm absolute -bottom-6 right-6 flex items-center gap-2 text-white"
      >
        <Send size={20} />
        {isSubmitting ? "Publishing..." : "Update Post"}
      </button>
    </form>
  );
};

export default BlogEditForm;
