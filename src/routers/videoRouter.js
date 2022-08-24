import express from "express";
import { getUpload, postUpload, watch, getEdit, postEdit, deleteVideo } from "../controllers/videoController";
import { loggedInOnlyMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/upload").all(loggedInOnlyMiddleware).get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(loggedInOnlyMiddleware).get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", loggedInOnlyMiddleware, deleteVideo);

export default videoRouter;