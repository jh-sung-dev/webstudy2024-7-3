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
import { protectorMiddleware, uploadVideoFiles } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/videos/upload")
  .all(protectorMiddleware)
  .get(videoUploadForm)
  .post(uploadVideoFiles.single("videofile"), videoUploadHandle);

videoRouter.get("/videos/search", videoSearchHandle);

videoRouter.get("/videos/:id([0-9a-f]{24})", videoDetailHandle);

videoRouter
  .route("/videos/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(videoEditForm)
  .post(videoEditHandle);

videoRouter
  .route("/videos/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(videoDeleteHandle);

export default videoRouter;
