import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  answers: { type: [Number], required: true },
  result: { type: String, required: true }
});

export default mongoose.model("Assessment", assessmentSchema);
