/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { ISendMoney } from "../sendMoney/sendMoney.interface";
export type roleType = "user" | "agent" | "admin";
export type statusType = "active" | "inactive" | "block";

export type IUser = {
  _id: Types.ObjectId;
  name: string;
  pin: string;
  mobile: string;
  email: string;
  role: roleType;
  status: statusType;
  nid: string;
  balance: number;
  image: string;
  transactions?: Types.ObjectId | ISendMoney;
};
export type UserModel = {
  isUserExist(mobile: string): Promise<Pick<IUser, "mobile" | "pin" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
};
