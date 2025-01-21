/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "../models/Movie";

// Add your magic here!

// /: DB에 있는 모든 영화의 제목이 나열된 홈 페이지 (GET)
// export const home = async (req, res) => {
//   const tmp = await Movie.find();
//   return res.render("home", {
//     pageTitle: "MOVIE Home",
//     videos: tmp,
//   });
// };

// /upload: 영화를 생성하는 Form이 있는 페이지 (GET), 생성한 영화를 DB에 저장 (POST)
export const movieUploadForm = (req, res) => {
  return res.render("movie_upload_form", {
    pageTitle: "MOVIE Upload",
  });
};
export const movieUploadHandle = async (req, res) => {
  const { title, summary, year, rating, genres } = req.body;
  const videoinfo = {
    title,
    summary,
    year,
    rating,
    genres: genres
      .split(",")
      .map((elem) => elem.trim())
      .filter((elem) => elem !== "" && elem !== undefined && elem !== null),
  };
  await Movie.create(videoinfo);
  return res.redirect("/");
};

// /movies/:id: 영화 상세 정보 페이지 (GET)
export const movieDetailHandle = async (req, res) => {
  const result = await Movie.findById({ _id: req.params.id });
  return res.render("movie_detail", {
    pageTitle: "MOVIE Detail",
    videoinfo: result,
    backURL: req.headers.referer || "/",
  });
};

// /movies/:id/edit: 영화를 편집하는 Form이 있는 페이지 (GET), 편집한 영화를 DB에 저장 (POST)
export const movieEditForm = async (req, res) => {
  const result = await Movie.findById({ _id: req.params.id });
  return res.render("movie_edit_form", {
    pageTitle: "MOVIE Edit",
    videoinfo: result,
  });
};
export const movieEditHandle = async (req, res) => {
  const { title, summary, year, rating, genres } = req.body;
  await Movie.findByIdAndUpdate(req.params.id, {
    title,
    summary,
    year,
    rating,
    genres: genres
      .split(",")
      .map((elem) => elem.trim())
      .filter((elem) => elem !== "" && elem !== undefined && elem !== null),
  });
  return res.redirect(`/movies/${req.params.id}`);
};

// /movies/:id/delete: 영화 삭제 (GET)
export const movieDeleteHandle = async (req, res) => {
  await Movie.deleteOne({ _id: req.params.id });
  return res.redirect("/");
};

// /search: 제목별로 영화를 검색하는 페이지 (GET)
export const movieSearchHandle = async (req, res) => {
  const { title } = req.query;
  let videos = [];
  videos = await Movie.find({ title: RegExp(`${title}`, "ig") });
  console.log(videos);
  return res.render("movie_search", {
    pageTitle: "Search",
    videos,
  });
};
