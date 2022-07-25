import express from "express";
import { home, search } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

// search map과 user에서도 할 수 있도롱..

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;