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
import { uploadFiles, uploadVideoFiles } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/videos/upload")
  .get(videoUploadForm)
  .post(uploadVideoFiles.single("videofile"), videoUploadHandle);

videoRouter.get("/videos/search", videoSearchHandle);

videoRouter.get("/videos/:id([0-9a-f]{24})", videoDetailHandle);

videoRouter
  .route("/videos/:id([0-9a-f]{24})/edit")
  .get(videoEditForm)
  .post(videoEditHandle);

videoRouter.route("/videos/:id([0-9a-f]{24})/delete").get(videoDeleteHandle);

export default videoRouter;
