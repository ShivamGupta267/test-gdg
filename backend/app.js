import express from "express";
import mongoose, { connect } from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Allow frontend requests
import userRoutes from "./routes/userRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js"; // ✅ If using assessments
import flash from "connect-flash";
import localStrategy from "passport-local" 
import passport from "passport";
import User from "./models/user.js";



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
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




// ✅ Enable CORS for frontend communication
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Update if frontend URL is different
    credentials: true, // ✅ Allow cookies & sessions
  })
);





// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/assessment", assessmentRoutes); // If using assessments

// ✅ Test Route (Check if backend is working)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
