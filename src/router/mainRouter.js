import express from "express";
import { homeControl } from "../controller/homeControl";
import { recordControl } from "../controller/recordControl";

const mainRouter = express.Router();

mainRouter.route("/").get(homeControl);
mainRouter.route("/recorder").get(recordControl);

export default mainRouter;