import { Document, Types } from "mongoose";

export interface ILoanModel extends Document {
  lender: Types.ObjectId;
  quantity: number;
}
