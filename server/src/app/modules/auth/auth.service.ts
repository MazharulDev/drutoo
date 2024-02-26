import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { User } from "../users/user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { mobile, pin } = payload;

  // const user = new User()

  const isUserExist = await User.isUserExist(mobile);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.pin &&
    !(await User.isPasswordMatched(pin, isUserExist.pin))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Pin is incorrect");
  }

  //create access token & refresh token

  const { mobile: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
};
