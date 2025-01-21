import "./db";
import "./models/Movie";
import "./models/User";
import "./models/Video";
import { serverStart } from "./server";

serverStart(8090);
