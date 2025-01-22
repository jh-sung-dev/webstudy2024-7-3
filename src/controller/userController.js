/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "../models/User";
import bcrypt from "bcrypt";

// Add your magic here!

// userController와 userRouter를 완성하세요.
// .pug 파일도 만들어야 합니다.

// export const homeHandle = (req, res) => {
//   //console.log("Home", res.locals.loggedIn);
//   // User.find({}).then((r) => console.log(r)); //For test
//   if (!res.locals.loggedIn) {
//     return res.redirect("/login");
//   }

//   return res.render("home", {
//     pageTitle: "Home",
//   });
// };

// Join
export const joinFormHandle = (req, res) => {
  //console.log("Join - GET");
  return res.render("join", {
    pageTitle: "Join",
  });
};

// form에는 오류 (wrong password(비밀번호가 틀렸습니다.), wrong password confirmation(비밀번호가 일치하지 않습니다.), username already taken(이미 사용 중인 사용자이름입니다.))가 표시되어야 합니다.
export const joinSubmitHandle = async (req, res) => {
  // console.log("Join - POST");
  // console.log(req.body);
  const { username, name, email, password, passwordconfirm, location } =
    req.body;

  if (password !== passwordconfirm) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errMsg: "wrong password confirmation(비밀번호가 일치하지 않습니다.)",
      userinfo: { username, name },
    });
  }

  const result = await User.findOne({ username });
  if (result) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errMsg: "username already taken(이미 사용 중인 사용자이름입니다.)",
      userinfo: { username, name },
    });
  }

  await User.create({ username, name, email, password, location });
  //return res.status(200).redirect("/");
  return res.status(200).render("join", {
    pageTitle: "Join",
    errMsg: "사용자 생성을 완료하였습니다.",
    joinSuccess: true,
    userinfo: { username, name },
  });
};

// login
export const loginFormHandle = (req, res) => {
  //console.log("Log in - GET");
  return res.render("login", {
    pageTitle: "Log in",
  });
};

export const loginSubmitHandle = async (req, res) => {
  //console.log("Log in - POST");
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errMsg: "An account does not exist",
    });
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errMsg: "wrong password(비밀번호가 틀렸습니다.)",
      userinfo: { username },
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

// logout
export const logoutHandle = (req, res) => {
  //console.log("Log out");
  //req.session.loggedIn = false;
  //req.session.user = null;
  req.session.destroy();
  return res.redirect("/");
};

export const editFormHandle = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile", userinfo: res.locals.user });
};

export const editSubmitHandle = async (req, res) => {
  return res.end();
};
