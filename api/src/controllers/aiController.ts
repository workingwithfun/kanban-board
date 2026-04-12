import { Request, Response } from "express";
import { parseJobDescription } from "../services/ai.service";

export const parseJD = async (req: Request, res: Response) => {
  const { jd } = req.body;

  try {
    const data = await parseJobDescription(jd);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "AI parsing failed" });
  }
};