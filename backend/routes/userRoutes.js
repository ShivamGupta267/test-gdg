import express from "express";
import { Signup, Login  } from "../controllers/userController.js";
import passport from "passport";

const router = express.Router();

router.get("/route", (req , res)=> {
    res.send("app is working")
})
// ✅ Signup Route
router.post("/signup%0A", Signup);

// ✅ Login Route
router.post("/login%0A", Login);

// ✅ Logout Route
// router.get("/logout", logout);

// ✅ Check Authentication (Get User Profile)
// router.get("/me", getUserProfile);

export default router;
