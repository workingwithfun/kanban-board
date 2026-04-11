import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  dateApplied: String,
  jd: String,
  requiredSkills: [String],
  niceToHaveSkills: [String],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Application", applicationSchema);