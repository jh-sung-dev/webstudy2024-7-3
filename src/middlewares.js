import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3"
import multerS3 from "multer-s3";

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
});

const s3AvatarStorage = multerS3({
  s3: s3Client,
  bucket: "wetube-jhsung",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `avatars/${req.session.user._id}/${Date.now().toString()}`);
  }
});

const s3VideoStorage = multerS3({
  s3: s3Client,
  bucket: "wetube-jhsung",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `videos/${req.session.user._id}/${Date.now().toString()}`);
  }
});

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

// export const uploadFiles = multer({
//   dest: "uploads/",
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB Limit
//   },
// });

export const uploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error(err.code);
    return res.redirect("/");
  }
  next(err);
};

/* Devmode
export const uploadAvatarFiles = multer({
  dest: "uploads/avatar/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB Limit
  },
});

export const uploadVideoFiles = multer({
  dest: "uploads/video/",
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB Limit
  },
});
//*/

//* Productionmode
export const uploadAvatarFiles = multer({
  storage: s3AvatarStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB Limit
  },
});

export const uploadVideoFiles = multer({
  storage: s3VideoStorage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB Limit
  },
});
//*/
