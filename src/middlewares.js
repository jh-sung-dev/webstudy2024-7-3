import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Nomad Users";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  } 
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }   
}

export const uploadFiles = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB Limit
  },
});

export const uploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error(err.code);
    return res.redirect("/");
  }
  next(err);
};
