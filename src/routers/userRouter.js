import express from "express";
import { see, logout, getEdit, postEdit, getChangePassword, postChangePassword } from "../controllers/userController";
import { loggedInOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loggedInOnlyMiddleware, logout);
userRouter.route("/edit").all(loggedInOnlyMiddleware).get(getEdit).post(postEdit);  // all은 모든 HTTP 메소드에 적용됨
userRouter.route("/change-password").all(loggedInOnlyMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;