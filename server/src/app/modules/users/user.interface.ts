/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { ISendMoney } from "../sendMoney/sendMoney.interface";
export type roleType = "user" | "agent" | "admin";
export type statusType = "active" | "inactive" | "block";

export type FullName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  division: string;
  district: string;
  upazila: string;
  union: string;
};

export type IUser = {
  _id: Types.ObjectId;
  name: FullName;
  pin: string;
  mobile: string;
  email: string;
  role: roleType;
  gender: string;
  status: statusType;
  nid: string;
  dateOfBirth: string;
  address: Address;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  balance: number;
  profilePicture?: string;
  transactions?: Types.ObjectId | ISendMoney;
  transactionsType?: any;
  isPinReset: boolean;
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
