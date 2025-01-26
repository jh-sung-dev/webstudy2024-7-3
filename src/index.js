import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Video";
import "./models/Comment"
import { serverStart } from "./server";

serverStart(3000);
