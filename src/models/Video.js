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

videoSchema.static('formatHashtags', function (hashtags) {
    return hashtags.split(",").map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
})

const Video = mongoose.model("Video", videoSchema);

export default Video;