import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
});
export default model("Comment", commentSchema);
