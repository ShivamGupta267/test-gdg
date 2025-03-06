import express from "express";
import mongoose, { connect } from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Allow frontend requests
import userRoutes from "./routes/userRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js"; // ✅ If using assessments
import flash from "connect-flash";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import User from "./models/user.js";
import connectDB from "./config/db.js";


connectDB();
dotenv.config();
const app = express();
const sessionOptions = {
  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
}

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
const PORT = process.env.PORT || 5000;




// ✅ Enable CORS for frontend communication
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Update if frontend URL is different
    credentials: true, // ✅ Allow cookies & sessions
  })
);



app.use("/assessment", assessmentRoutes); // If using assessments
app.use("/users", userRoutes);





app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
