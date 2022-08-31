import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: String,
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);  // this -> create되는 User를 가리킴, saltRounds: 5번 해싱
});

const User = mongoose.model("User", userSchema);
export default User;