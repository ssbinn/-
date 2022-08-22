import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("DB connect");
db.on("error", (error) => console.log("DB error", error));  // 여러 번
db.once("open", handleOpen);  // 한 번