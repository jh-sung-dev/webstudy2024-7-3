import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Video";
import { serverStart } from "./server";

serverStart(8090);
