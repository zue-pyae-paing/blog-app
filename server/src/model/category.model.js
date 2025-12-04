import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: Date.now() },
});

export default model("Category", categorySchema);
