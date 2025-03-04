import express from "express";
import passport from "passport";
import User from "../models/user.js";


const router = express.Router();

// ✅ Signup Logic
export const Signup = 
    async(req, res, next) => {
        try {
            let { email, username, password } = req.body;
            const newUser = new User({ email, username }); // ✅ Create a User instance
            const result = await User.register(newUser, password); // ✅ Register user
            console.log("Registered User:", result);
    
            // req.login(result, (err) => {
            //     if (err) return next(err);
            //     req.flash("success", "Welcome to TravelMingle!");
            //     return res.redirect("/listing"); // ✅ Moved inside callback
            // });
    
        } catch (err) {
            // req.flash("error", err.message);
            return res.redirect("/user/signup");
        }
    }


// ✅ Login Logic
export const Login = 
    async(req, res, next) => { 
    passport.authenticate("local", { failureFlash: true }),
    (req, res) => {
        res.json({ success: true, message: "Logged in successfully", user: req.user });
    }}


// ✅ Logout Route
// router.get("/logout", (req, res, next) => {
//     req.logout((err) => {
//         if (err) return res.status(500).json({ success: false, message: "Logout failed" });
//         res.json({ success: true, message: "Logged out successfully" });
//     });
// });

// ✅ Check if user is authenticated
// router.get("/me", (req, res) => {
//     if (req.isAuthenticated()) {
//         res.json({ isAuthenticated: true, user: req.user });
//     } else {
//         res.json({ isAuthenticated: false });
//     }
// });

// export default router;

