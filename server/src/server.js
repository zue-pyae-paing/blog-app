import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./modules/auth/auth.route.js";
import adminRouter from "./modules/admin/admin.route.js"
import userRouter from "./modules/user/user.route.js";
import blogRouter from "./modules/blog/blog.route.js";
import commentRouter from "./modules/comment/comment.route.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

// db connect
connectDB();

// routes
app.get("/", (req, res) => res.send("Welcome to Blog App"));
app.use("/api/auth", authRouter);
app.use('/api/admin',adminRouter)
app.use("/api/user", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);

//error middleware
app.use(errorMiddleware);

// app.listen(process.env.PORT, () =>
//   console.log(`Server is running on port ${process.env.PORT}`)
// );

export default app;
