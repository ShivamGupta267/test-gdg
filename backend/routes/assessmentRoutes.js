
import express from "express";
import { analyzeAssessment } from "../controllers/assessmentController.js";

const router = express.Router();
router.post("/", analyzeAssessment);

export default router;
