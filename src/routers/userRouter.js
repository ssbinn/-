import express from "express";
import { see, logout, getEdit, postEdit, getChangePassword, postChangePassword } from "../controllers/userController";
import { loggedInOnlyMiddleware, uploadFiles } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loggedInOnlyMiddleware, logout);
userRouter
    .route("/edit")
    .all(loggedInOnlyMiddleware)
    .get(getEdit)
    .post(uploadFiles.single("avatar"), postEdit);  // single: 파일 하나 업로드, "avatar": form의 name과 같아야 함
userRouter
    .route("/change-password")
    .all(loggedInOnlyMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;