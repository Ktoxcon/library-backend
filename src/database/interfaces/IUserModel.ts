import { Document } from "mongoose";

export interface IUserModel extends Document {
  uid: string;
  name: string;
  lastname: string;
  username: string;
  role: string;
  password: string;
}
