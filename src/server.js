import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mainRouter from "./router/mainRouter";
import userRouter from "./router/userRouter";
import { localsMiddleware } from "./middlewares";
import videoRouter from "./router/videoRouter";

export const serverStart = (portNumber) => {
  const server = express();

  server.set("view engine", "pug");
  server.set("views", process.cwd() + "/src/views");

  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
      }),
    })
  );

  server.use("/static", express.static("assets"));

  server.use(localsMiddleware);

  server.use("/uploads", express.static("uploads"));

  server.use(mainRouter);
  server.use(userRouter);
  server.use(videoRouter);

  server.listen(portNumber, () => {
    console.log("✅  Server Ready! ... ", portNumber);
  });
};
