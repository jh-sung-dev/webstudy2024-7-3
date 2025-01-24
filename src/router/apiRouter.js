import express from "express";
import { commentHandle, registerView } from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post("/api/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/api/videos/:id([0-9a-f]{24})/comment", commentHandle);

export default apiRouter;
