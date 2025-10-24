import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./modules/auth/auth.route.js";
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
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// db connect
connectDB();

// routes
app.get("/api", (req, res) =>
  res.status(200).json({ message: " Welcome from the blog app server" })
);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);

//error middleware
app.use(errorMiddleware);

export default app;


// app.listen(PORT, () =>
//   console.log("Server running on => http://localhost:" + PORT)
// );
