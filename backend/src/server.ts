import dotenv from "dotenv";
dotenv.config(); // 👈 MUST BE FIRST

import app from "./app";
import { connectDB } from "./utils/db";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});