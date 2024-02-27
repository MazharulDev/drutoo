import { Schema, model } from "mongoose";
import { ICashout } from "./cashout.interface";

export const cashoutSchema = new Schema<ICashout>(
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cashout = model<ICashout>("Cashout", cashoutSchema);
