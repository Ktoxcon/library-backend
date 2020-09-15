import { Document } from "mongoose";

export interface IUserModel extends Document {
  uid: string;
  name: string;
  lastname: string;
  role: string;
  password: string;
}
