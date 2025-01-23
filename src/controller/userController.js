import User from "../models/User";
import bcrypt from "bcrypt";

export const joinFormHandle = (req, res) => {
  return res.render("join", {
    pageTitle: "Join",
  });
};

export const joinSubmitHandle = async (req, res) => {
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

  return res.status(200).render("join", {
    pageTitle: "Join",
    errMsg: "사용자 생성을 완료하였습니다.",
    joinSuccess: true,
    userinfo: { username, name },
  });
};

export const loginFormHandle = (req, res) => {
  return res.render("login", {
    pageTitle: "Log in",
  });
};

export const loginSubmitHandle = async (req, res) => {
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

export const logoutHandle = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const editFormHandle = (req, res) => {
  console.log(res.locals.user)
  return res.render("edit-profile", {
    pageTitle: "Edit Profile",
    userinfo: res.locals.user,
  });
};

export const editSubmitHandle = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;

  const result = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = result;
  return res.redirect("/user/edit");
};

export const changePasswordFrom = (req, res, next) => {
  return res.render("change-password", { pageTitle: "Change Password" });
};
export const changePasswordSubmit = async (req, res, next) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;

  const user = await User.findById(_id);
  const result = await bcrypt.compare(oldPassword, user.password);
  if (!result) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errMsg: "Current Password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errMsg: "The password does not match",
    });
  }
  user.password = newPassword;
  await user.save();

  return res.redirect("/logout");
};

export const userProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }

  return res.render("userProfile", { pageTitle: "User Profile", user });
};
