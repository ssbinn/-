import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hastags: [{ type: String }],
    meta: {
        rating: Number,
        views: Number,
    },


    // 뭐는 required, 뭐는 unique - 프라이머리 키이고 명시해주어야 하지 않나
    // friends: ObjectId
});

// 스키마와 모델 차이
const Video = mongoose.model("video", videoSchema);  // Model

export default Video;