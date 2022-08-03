import express from "express";
import { home, search } from "../controllers/videoController";
import { signUp, postSignUp, login, postLogin } from "../controllers/userController";

// search를 map과 user에서도 할 수 있도롱..

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/signup").get(signUp).post(postSignUp);
rootRouter.route("/login").get(login).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;