import { Document } from "mongoose";

export interface IBookModel extends Document {
  author: string;
  title: string;
  edition: string;
  keyWords: Array<string>;
  description: string;
  themes: Array<string>;
  copies: number;
  disponibility?: number;
  loans?: number;
}
