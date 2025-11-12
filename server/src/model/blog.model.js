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
  category: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  views: { type: Number, default: 0 },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, required: true, default: Date.now() },
});

export default model("Blog", blogSchema);
