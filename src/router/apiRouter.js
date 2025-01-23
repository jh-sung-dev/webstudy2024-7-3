import express from "express";
import { registerView } from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post("/api/videos/:id([0-9a-f]{24})/view", registerView);

export default apiRouter;
