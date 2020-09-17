import mongoose, { Schema } from "mongoose";
import { IBookModel } from "../interfaces";

const BookSchema: Schema = new Schema(
  {
    autor: { type: String, required: true },
    title: { type: String, required: true },
    edition: String,
    keyWords: [String],
    description: String,
    themes: { type: [String], default: [] },
    copies: { type: Number, default: 0 },
    disponibility: { type: Number, default: 0 },
    loans: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

export const BookModel = mongoose.model<IBookModel>("book", BookSchema);
