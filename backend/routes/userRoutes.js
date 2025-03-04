import express from "express";
import { Signup, Login  } from "../controllers/userController.js";
import passport from "passport";

const router = express.Router();

// ✅ Signup Route
router.post("/signup", Signup);

// ✅ Login Route
router.post("/login", Login);

// ✅ Logout Route
// router.get("/logout", logout);

// ✅ Check Authentication (Get User Profile)
// router.get("/me", getUserProfile);

export default router;
