import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { User } from "../users/user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { hashingHelper } from "../../../helpers/hashingHelpers";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { mobile, pin } = payload;

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

const changePin = async (userId: string, old_pin: string, new_pin: string) => {
  if (new_pin.length !== 4 || isNaN(Number(new_pin))) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "New Pin must be a 4-digit number"
    );
  }

  const user = await User.findOne({ mobile: userId }).select("+pin");

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.pin && !(await User.isPasswordMatched(old_pin, user.pin))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Pin is incorrect");
  }
  const hashedPin = await hashingHelper.encrypt_password(new_pin);
  await User.updateOne({ mobile: userId }, { pin: hashedPin });

  return {
    message: "Pin changed successfully",
  };
};

export const AuthService = {
  loginUser,
  changePin,
};
