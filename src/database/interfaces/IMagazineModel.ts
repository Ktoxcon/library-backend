import { Document } from "mongoose";

export interface IMagazineModel extends Document {
  author: string;
  title: string;
  edition: string;
  description: string;
  publishFrequency: string;
  publishedCopies: number;
  themes: Array<string>;
  keyWords: Array<string>;
  copies: number;
  disponibility: number;
}
