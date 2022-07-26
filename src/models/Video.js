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
    console.log("we are about to save: ", this);
    this.hashtags = this.hashtags[0]
        .split(",")
        .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
    console.log("we are about to save: ", this);
});  // model 생성 전에 생성

const Video = mongoose.model("video", videoSchema);

export default Video;