import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hastags: [{ type: String }],
    rating: int,
    views: int,


    // : ObjectId
})