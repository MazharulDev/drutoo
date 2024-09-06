import { Schema, model } from "mongoose";
import { ITransactions } from "./transactions.interface";

export const transactionSchema = new Schema<ITransactions>(
  {
    senderId: {
      type: String,
      required: true,
    },
    receivedId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    through: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Transaction = model<ITransactions>(
  "Transaction",
  transactionSchema
);
