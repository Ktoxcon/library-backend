import { Document } from "mongoose";
import { UserRole } from "../util";

type Role = UserRole.STUDENT | UserRole.TEACHER;

export interface IUserModel extends Document {
  uid: string;
  name: string;
  lastname: string;
  role: Role;
  password: string;
}
