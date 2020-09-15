import mongoose, { Schema } from "mongoose";
import { IMagazineModel } from "../interfaces";

const MagazineSchema: Schema = new Schema(
  {
    autor: { type: String, required: true },
    title: { type: String, required: true },
    edition: String,
    description: String,
    publishFrequency: String,
    publishedCopies: Number,
    themes: [String],
    keyWords: [String],
    copies: Number,
    disponibility: Number,
  },
  { versionKey: false }
);

export const MagazineModel = mongoose.model<IMagazineModel>(
  "magazine",
  MagazineSchema
);
