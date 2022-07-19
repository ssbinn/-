import express from "express";
import { see, logout, edit, remove } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get(":id", see);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

export default userRouter;