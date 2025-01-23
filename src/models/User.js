import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

// User 모델을 완성하세요. (username, name, password)
// username은 반드시 unique해야 합니다.
const UserSchema = mongoose.Schema({
  avatarUrl: { type: String, default: "" },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, default: "" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: `Comment_${YOUR_USERNAME}` }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: `Video_${YOUR_USERNAME}` }],
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

// 암호는 securely stored(보안 저장)되어야 합니다. bcrypt를 사용하세요.
UserSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 3);
});

const model = mongoose.model(`User_${YOUR_USERNAME}`, UserSchema);

export default model;
