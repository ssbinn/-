import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
        rating: Number,
        views: Number,
    },


    // 뭐는 required, 뭐는 unique - 프라이머리 키이고 명시해주어야 하지 않나
});

const Video = mongoose.model("video", videoSchema);

export default Video;