import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: { type: String, required: true,},
  description: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  readingTime: { type: Number, required: true },
  category: { type: String, required: true, tolowerCase: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now() },
});

export default model("Blog", blogSchema);
