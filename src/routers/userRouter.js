import express from "express";
import { see, logout, getEdit, postEdit } from "../controllers/userController";
import { loggedInOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loggedInOnlyMiddleware, logout);  // 로그인 한 사용자만 로그아웃 페이지로 갈 수 있도록 loggedInOnly 미들웨어 추가
userRouter.route("/edit").all(loggedInOnlyMiddleware).get(getEdit).post(postEdit);  // all은 모든 HTTP 메소드에 적용됨
userRouter.get("/:id", see);

export default userRouter;