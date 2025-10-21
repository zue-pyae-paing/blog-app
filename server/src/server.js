import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./modules/auth/auth.route.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

const PORT = process.env.PORT;

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
app.use("/api/auth", authRouter);

//error middleware
app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log("Server running on => http://localhost:" + PORT)
);
