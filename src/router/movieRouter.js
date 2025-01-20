import express from "express";
import {
  home,
  movieUploadForm,
  movieUploadHandle,
  movieDetailHandle,
  movieEditForm,
  movieEditHandle,
  movieDeleteHandle,
  movieSearchHandle,
} from "../controller/movieController";

const movieRouter = express.Router();

// Add your magic here!

// /: DB에 있는 모든 영화의 제목이 나열된 홈 페이지 (GET)
//movieRouter.get("/", home);

// /upload: 영화를 생성하는 Form이 있는 페이지 (GET), 생성한 영화를 DB에 저장 (POST)
movieRouter.route("/upload").get(movieUploadForm).post(movieUploadHandle);

// /movies/:id: 영화 상세 정보 페이지 (GET)
movieRouter.get("/movies/:id", movieDetailHandle);

// /movies/:id/edit: 영화를 편집하는 Form이 있는 페이지 (GET), 편집한 영화를 DB에 저장 (POST)
movieRouter.route("/movies/:id/edit").get(movieEditForm).post(movieEditHandle);

// /movies/:id/delete: 영화 삭제 (GET)
movieRouter.get("/movies/:id/delete", movieDeleteHandle);

// /search: 제목별로 영화를 검색하는 페이지 (GET)
movieRouter.get("/search", movieSearchHandle);

export default movieRouter;
