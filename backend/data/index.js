import dotenv from "dotenv";
import mongoose from "mongoose";
import data from "./yoga.js";
import YogaPose from "../models/yoga.js";



dotenv.config();
const MONGO_URI = "mongodb://localhost:27017/demo_project";

console.log("Mongo URI:", MONGO_URI);

main()
    .then((res) => {
        console.log("connected to db");
    }).catch((err)=>{
        console.log(err);
    })
async function main(){
    await mongoose.connect(MONGO_URI);
}

const initDb = async () => {
    await YogaPose.insertMany(data.data);
}

initDb().then(() => {console.log("data inserted")})
        .catch((err) => {console.log(err)});