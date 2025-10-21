import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.listen(3000, () => console.log("Server running on port 3000"));
