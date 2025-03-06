
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import Progress from "./progress.js"; // ✅ Import Progress Model

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    progress: { type: mongoose.Schema.Types.ObjectId, ref: "Progress" }, // ✅ Link to Progress
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
export default User;
