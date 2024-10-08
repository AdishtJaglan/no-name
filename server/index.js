if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import rateLimiter from "./middlewares/rateLimiter.js";

import userRoutes from "./routes/userRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import dynamicRoutes from "./routes/dynamicRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;
const connectionString =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/no-idea";

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log("Error connecting to database: " + error.message);
  });

app.use(cors());
app.use(rateLimiter);
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/template", templateRoutes);
app.use("/api/dynamic", dynamicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
