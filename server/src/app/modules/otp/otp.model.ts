import { Schema, model } from "mongoose";
import { IOtp, OtpModel } from "./otp.interface";

const OtpSchema = new Schema<IOtp, OtpModel>(
  {
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 10, // Document will be deleted after 3 minutes
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Otp = model<IOtp, OtpModel>("Otp", OtpSchema);
