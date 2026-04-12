// api/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import serverless from "serverless-http";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// ✅ Mongo connection (important tweak)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ❌ REMOVE app.listen()

export default serverless(app);