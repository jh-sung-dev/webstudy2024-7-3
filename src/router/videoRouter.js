import express from "express";
import {
  videoUploadForm,
  videoUploadHandle,
  videoDetailHandle,
  videoEditForm,
  videoEditHandle,
  videoDeleteHandle,
  videoSearchHandle,
} from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.route("/videos/upload").get(videoUploadForm).post(videoUploadHandle);

videoRouter.get("/videos/search", videoSearchHandle);

videoRouter.get("/videos/:id", videoDetailHandle);

videoRouter.route("/videos/:id/edit").get(videoEditForm).post(videoEditHandle);

videoRouter.get("/videos/:id/delete", videoDeleteHandle);

export default videoRouter;
