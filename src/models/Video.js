import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 50 },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true }],
    meta: {
        rating: { type: Number, default: 0, required: true },
        views: { type: Number, default: 0, required: true },
    },

});

videoSchema.pre('save', async function () {
    console.log("두 번째");  // 코드 실행 흐름을 알기 위함
    this.hashtags = this.hashtags[0]
        .split(",")
        .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));  // ['t,a,g'] -> ['#t', '#a', '#g']
});  // model 생성 전에 생성

const Video = mongoose.model("video", videoSchema);

export default Video;