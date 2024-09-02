import { Schema, model } from "mongoose";
import { ISendMoney } from "./sendMoney.interface";

export const sendMoneySchema = new Schema<ISendMoney>(
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

export const SendMoney = model<ISendMoney>("SendMoney", sendMoneySchema);
