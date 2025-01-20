import Video from "../models/Movie";

export const homeControl = async (req, res) => {
  const tmp = await Video.find();
  return res.render("home", {
    pageTitle: "MOVIE Home",
    videos: tmp,
  });
};
