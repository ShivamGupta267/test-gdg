import express from "express";
import passport from "passport";
import User from "../models/user.js";


const router = express.Router();

// ✅ Signup Logic
export const Signup = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const result = await User.register(newUser, password);
        console.log("Registered User:", result);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(400).json({ success: false, message: err.message });
    }
};



// ✅ Login Logic
export const Login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ success: false, message: info.message });

        req.login(user, (err) => {
            if (err) return next(err);
            return res.json({ success: true, message: "Logged in successfully", user });
        });
    })(req, res, next);
};


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

