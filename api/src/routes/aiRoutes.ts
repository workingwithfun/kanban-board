// routes/ai.routes.ts

import express from "express";
import { parseJobDescription, generateResumeSuggestions } from "../services/ai.service";

const router = express.Router();

router.post("/parse", async (req, res) => {
  const { jd } = req.body;

  const parsed = await parseJobDescription(jd);
  const suggestions = await generateResumeSuggestions(jd);

  res.json({ parsed, suggestions });
});

export default router;