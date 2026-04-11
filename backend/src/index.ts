import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./utils/db";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.listen(5000, () => {
  console.log("Server running");
});
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch((err) => console.log(err));