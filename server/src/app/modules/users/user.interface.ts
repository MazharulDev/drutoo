/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
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
};
export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
};
