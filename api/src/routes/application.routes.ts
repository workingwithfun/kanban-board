import express from "express";
import mongoose from "mongoose";
import Application from "../models/Application";

const router = express.Router();


// =====================
// GET applications (per user)
// =====================
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.json([]); // ✅ prevents 400 crash
    }

    const apps = await Application.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// =====================
// CREATE application
// =====================
router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId missing" });
    }

    const newApp = await Application.create({
      ...req.body,
      userId,
    });

    res.json(newApp);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// UPDATE status (drag & drop)
// =====================
router.put("/:id", async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const updatedApp = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: new mongoose.Types.ObjectId(userId),
      },
      { status },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(updatedApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;