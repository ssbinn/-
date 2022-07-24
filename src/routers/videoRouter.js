import express from "express";
import { upload, postUpload, watch, getEdit, postEdit, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

// videoRouter.get("/upload", upload);
videoRouter.route("/upload").get(upload).post(postUpload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;