import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { roles, status } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../../config";

export const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    pin: {
      type: String,
      required: true,
      select: false,
      minlength: 4,
      maxlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nid: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: roles,
      required: true,
      default: "user",
    },
    status: {
      type: String,
      enum: status,
      default: "active",
    },
    balance: {
      type: Number,
    },
    image: {
      type: String,
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  mobile: string
): Promise<Pick<IUser, "mobile" | "pin" | "role"> | null> {
  return await User.findOne({ mobile }, { mobile: 1, pin: 1, role: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPin: string,
  savedPin: string
): Promise<boolean> {
  return await bcrypt.compare(givenPin, savedPin);
};

UserSchema.pre("save", async function (next) {
  const user = this;
  user.pin = await bcrypt.hash(this.pin, Number(config.bcrypt_salt_rounds));
  next();
});

export const User = model<IUser, UserModel>("User", UserSchema);
