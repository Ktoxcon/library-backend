import mongoose, { Schema } from "mongoose";
import { IUserModel } from "../interfaces";

const UserSchema: Schema = new Schema(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    role: String,
    password: String,
  },
  { versionKey: false }
);

export const UserModel = mongoose.model<IUserModel>("user", UserSchema);
