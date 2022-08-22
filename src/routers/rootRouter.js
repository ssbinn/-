import express from "express";
import { home, search } from "../controllers/videoController";
import { signUp, postSignUp, login, postLogin } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares";

// search를 map과 user에서도 할 수 있도롱..

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/signup").all(publicOnlyMiddleware).get(signUp).post(postSignUp);
rootRouter.route("/login").all(publicOnlyMiddleware).get(login).post(postLogin);  // 로그인 한 유저는 접속할 수 없도록 publicOnly 미들웨어 추가 
rootRouter.get("/search", search);

export default rootRouter;