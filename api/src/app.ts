import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import aiRoutes from "./routes/aiRoutes";
import applicationRoutes from "./routes/application.routes";
dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use("/applications", applicationRoutes);
app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);
export default app;