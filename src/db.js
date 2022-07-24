import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/songle");

const db = mongoose.connection;

const handleOpen = () => console.log("DB connect");
db.on("error", (error) => console.log("DB error", error));  // 여러 번
db.once("open", handleOpen);  // 한 번