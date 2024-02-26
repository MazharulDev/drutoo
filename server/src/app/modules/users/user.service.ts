import { IUser } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const userExist = await User.findOne({ mobile: payload.mobile });
  if (userExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists. Please login."
    );
  }

  let status;
  if (payload.role === "agent") {
    status = "inactive";
  }

  const userData = {
    ...payload,
    balance: payload.role === "agent" ? 100000 : 40,
    status: status,
  };

  const newUser = await User.create(userData);
  const newUserResponse = await User.findById(newUser._id).select("-pin");

  return newUserResponse;
};

export const UserService = {
  createUser,
};
