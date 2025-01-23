import Video from "../models/Video";
import User from "../models/User";

// /upload: 영화를 생성하는 Form이 있는 페이지 (GET), 생성한 영화를 DB에 저장 (POST)
export const videoUploadForm = (req, res) => {
  return res.render("video_upload_form", {
    pageTitle: "Video Upload",
  });
};
export const videoUploadHandle = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const {
    body: { title, description, hashtags },
    file,
  } = req;
  try {
    const videoinfo = {
      title,
      fileUrl: file.path,
      description,
      owner: _id,
      hashtags: hashtags
        .split(",")
        .map((elem) => elem.trim())
        .filter((elem) => elem !== "" && elem !== undefined && elem !== null),
    };
    const newVideo = await Video.create(videoinfo);
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("video_upload_form", {
      pageTitle: "Video Upload",
      errMsg: err._message,
    });
  }
};

// /movies/:id: 영화 상세 정보 페이지 (GET)
export const videoDetailHandle = async (req, res) => {
  const result = await Video.findById({ _id: req.params.id }).populate("owner");
  console.log(result);
  if (result) {
    return res.render("video_detail", {
      pageTitle: "Video Detail",
      videoinfo: result,
      backURL: req.headers.referer || "/",
    });
  }
  return res.render("404", {
    pageTitle: "Video Not Found",
    backURL: req.headers.referer || "/",
  });
};

// /movies/:id/edit: 영화를 편집하는 Form이 있는 페이지 (GET), 편집한 영화를 DB에 저장 (POST)
export const videoEditForm = async (req, res) => {
  const result = await Video.findById({ _id: req.params.id });
  if (String(result.owner) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  }
  if (result) {
    return res.render("video_edit_form", {
      pageTitle: "Video Edit",
      videoinfo: result,
    });
  }
  return res.render("404", {
    pageTitle: "Video Not Found",
    backURL: req.headers.referer || "/",
  });
};
export const videoEditHandle = async (req, res) => {
  const { title, description, hashtags, file } = req.body;
  const result = await Video.findOne({ _id: req.params.id });
  console.log(result);
  return res.end();
  await Video.findByIdAndUpdate(req.params.id, {
    fileUrl: file.path,
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((elem) => elem.trim())
      .filter((elem) => elem !== "" && elem !== undefined && elem !== null),
  });
  return res.redirect(`/videos/${req.params.id}`);
};

// /movies/:id/delete: 영화 삭제 (GET)
export const videoDeleteHandle = async (req, res) => {
  const {
    param: { id },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not found." });
  }
  if (String(result.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.deleteOne({ _id: id });
  return res.redirect("/");
};

// /search: 제목별로 영화를 검색하는 페이지 (GET)
export const videoSearchHandle = async (req, res) => {
  const { title } = req.query;
  let videos = [];
  videos = await Video.find({ title: RegExp(`${title}`, "ig") });
  return res.render("video_search", {
    pageTitle: "Search",
    videos,
  });
};
