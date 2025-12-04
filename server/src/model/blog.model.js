import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ["draft", "publish"], default: "draft" },
  readingTime: { type: Number, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    required: true,
  },
  categorySlug: { type: String, required: true, index: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now() },
});

blogSchema.index({ title: "text" });
blogSchema.index({ categorySlug: "text" });
blogSchema.index({ status: 1, createdAt: -1 });

export default model("Blog", blogSchema);
