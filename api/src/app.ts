import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import aiRoutes from "./routes/aiRoutes";
import applicationRoutes from "./routes/application.routes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
export default app;