import express from "express";
import { getUpload, postUpload, watch, getEdit, postEdit, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

// mongoDB id는 24 바이트 16진수로 정의되어 있기 때문에 정규식 수정함
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;