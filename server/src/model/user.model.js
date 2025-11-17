import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokenExpiry: { type: Date },
  resetToken: { type: String },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  avatar: { type: String },
  avatarId: { type: String },
  refreshToken: { type: String },
  status: { type: String, enum: ["active", "banned"], default: "active" },
  createdAt: { type: Date, required: true, default: Date.now() },
});

export default model("User", userSchema);
