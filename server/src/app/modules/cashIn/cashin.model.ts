import { Schema, model } from "mongoose";
import { ICashin } from "./cashin.interface";

export const cashinSchema = new Schema<ICashin>(
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

export const Cashin = model<ICashin>("Cashin", cashinSchema);
