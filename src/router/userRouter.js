import express from "express";
import {
  changePasswordFrom,
  changePasswordSubmit,
  editFormHandle,
  editSubmitHandle,
  //homeHandle,
  joinFormHandle,
  joinSubmitHandle,
  loginFormHandle,
  loginSubmitHandle,
  logoutHandle,
  userProfile,
} from "../controller/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadAvatarFiles,
} from "../middlewares";

const userRouter = express.Router();

// Add your magic here!

// userController와 userRouter를 완성하세요.

// /join: 이 route는 계정을 만들기 위해 form을 렌더 해야 합니다. (GET, POST)
userRouter
  .route("/user/join")
  .all(publicOnlyMiddleware)
  .get(joinFormHandle)
  .post(joinSubmitHandle);

// /login: 이 route는 로그인하기 위해 form을 렌더 해야 합니다. (GET, POST)
userRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(loginFormHandle)
  .post(loginSubmitHandle);

// /: 이 route는 로그인을 했는지 안했는지 확인해야 합니다. 로그인한 경우에는 프로필이 표시되어야 하고, 로그인하지 않은 경우에는 /login으로 보내져야 합니다.
//userRouter.route("/").get(homeHandle);

// logout
userRouter.route("/logout").get(protectorMiddleware, logoutHandle);

userRouter
  .route("/user/edit")
  .all(protectorMiddleware)
  .get(editFormHandle)
  .post(uploadAvatarFiles.single("avatar"), editSubmitHandle);

userRouter
  .route("/user/change-password")
  .all(protectorMiddleware)
  .get(changePasswordFrom)
  .post(changePasswordSubmit);

userRouter.route("/user/:id").get(userProfile);

export default userRouter;
