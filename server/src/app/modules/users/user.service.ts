import { IUser } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createUser = async (payload: IUser): Promise<IUser> => {
  const userExist = await User.find({ username: payload?.username });
  const exist = userExist[0]?.username;
  if (payload.username === exist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already exist!");
  }
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUser,
};
