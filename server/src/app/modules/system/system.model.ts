import { Schema, model } from "mongoose";
import { ISystem } from "./system.interface";

export const systemSchema = new Schema<ISystem>(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
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

export const System = model<ISystem>("System", systemSchema);
