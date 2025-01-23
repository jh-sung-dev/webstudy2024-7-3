import mongoose from "mongoose";
import USERNAME from "./dbpostfix";

/*
PLEASE ADD YOUR USERNAME IN THIS LINE.
ALL THE MODELS YOU WILL CREATE WILL HAVE YOUR USERNAME APPENDED TO THEM
SO YOU CAN SEARCH / ADD / EDIT / DELETE YOUR DOCUMENTS ONLY.
PLEASE FOLLOW THIS STEP
WE NEED TO SHARE THE SAME DB SO NICO CAN CHECK OUT EVERYBODYS PROJECT.
🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧
*/
const YOUR_USERNAME = USERNAME; //"jhsung20241230"; //null;

const commentSchema = mongoose.Schema({
  text: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: `User_${YOUR_USERNAME}`,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: `Video_${YOUR_USERNAME}`,
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

if (YOUR_USERNAME === null || typeof YOUR_USERNAME !== "string") {
  /*
  PLEASE ADD YOUR USERNAME ON THE LINE 10
  THIS LINE WILL REMIND YOU IF YOU HAVEN'T ADDED IT
  PLEASE DONT REMOVE THIS LINE
  */
  throw Error(
    "❌  Please add your username in the line 10 of models/Movie.js  ❌"
  );
}

if (YOUR_USERNAME.includes("@")) {
  throw Error("❌  Please remove the @ from your username  ❌");
}

const model = mongoose.model(`Comment_${YOUR_USERNAME}`, commentSchema);

export default model;
