import express from "express";
import {
  commentDeleteHandle,
  commentHandle,
  registerView,
} from "../controller/videoController";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/api/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter
  .route("/api/videos/:id([0-9a-f]{24})/comment")
  .all(protectorMiddleware)
  .post(commentHandle);

apiRouter
  .route("/api/comment/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .delete(commentDeleteHandle);

export default apiRouter;
