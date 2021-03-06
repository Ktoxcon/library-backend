import mongoose, { Schema } from "mongoose";
import { ILoanModel } from "../interfaces";

const LoanSchema: Schema = new Schema(
  {
    lender: { type: Schema.Types.ObjectId },
    quantity: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export const LoanModel = mongoose.model<ILoanModel>("loan", LoanSchema);
