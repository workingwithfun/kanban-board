import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes (NO /api here)
app.use("/auth", authRoutes);

// ✅ DB connection
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

app.use(async (req, res, next) => {
  await connectDB();
  next();
});


// ✅ 👇 THIS is the key part
if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// ✅ Required for Vercel
