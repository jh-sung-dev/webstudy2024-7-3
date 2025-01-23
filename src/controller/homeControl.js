import Video from "../models/Video";


export const homeControl = async (req, res) => {
  const tmp = await Video.find({});
  return res.render("home", {
    pageTitle: "Video Home",
    videos: tmp,
  });
};
