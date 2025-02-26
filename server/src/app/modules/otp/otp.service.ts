import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Otp } from "./otp.model";
import { isUserExist } from "../../../utils/isUserExists";
import { User } from "../users/user.model";
import { hashingHelper } from "../../../helpers/hashingHelpers";
import { generateOTP } from "../../../utils/generateOTP";
import { sendMail } from "../../../utils/sendMail";

const sendOtp = async (mobile: string) => {
  const user = await isUserExist(mobile, User);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const otpData = await Otp.findOne({ mobile });

  if (otpData) {
    const currentTime = new Date();

    // Convert remaining time to seconds
    const remainingSeconds = Math.ceil(
      (Number(otpData.expiresAt) - Number(currentTime)) / 1000
    );

    if (remainingSeconds > 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `OTP already sent. Please try again after ${remainingSeconds} seconds`
      );
    } else {
      await Otp.deleteOne({ mobile });
    }
  }

  const generatedOTP = generateOTP();

  const expiresAt = new Date();
  expiresAt.setTime(expiresAt.getTime() + 2 * 60 * 1000);

  const result = await Otp.create({
    mobile,
    email: user.email,
    otp: generatedOTP,
    expiresAt,
  });

  // Send OTP to email
  if (result) {
    await sendMail({
      to: user?.email,
      subject: "OTP for reset pin",
      message: `Your OTP is ${result.otp}. Please do not share it with anyone. OTP will expire in 2 minutes`,
    });
  }

  return {
    _id: result._id,
    email: result.email,
    mobile: result.mobile,
    isVerified: result.isVerified,
    expiresAt: result.expiresAt,
  };
};

const verifyOtp = async (mobile: string, otp: string) => {
  const otpData = await Otp.findOne({ mobile });
  if (!otpData) {
    throw new ApiError(httpStatus.NOT_FOUND, "OTP not found");
  }

  const currentTime = new Date();
  // Check if otp is expired
  if (currentTime > otpData.expiresAt) {
    // Delete otp
    await Otp.deleteOne({ mobile });
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP expired");
  }

  if (otpData.otp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP is incorrect");
  }

  // Update otp status
  const updatedOtpData = await Otp.findOneAndUpdate(
    { mobile },
    { isVerified: true },
    { new: true }
  );

  if (!updatedOtpData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Could not verify otp");
  }

  return {
    _id: updatedOtpData._id,
    email: updatedOtpData.email,
    mobile: updatedOtpData.mobile,
    isVerified: updatedOtpData.isVerified,
    expiresAt: updatedOtpData.expiresAt,
  };
};

const resetPin = async (mobile: string, pin: string) => {
  const user = await isUserExist(mobile, User);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const otpData = await Otp.findOne({ mobile });

  //Check if otp is verified
  if (!otpData?.isVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Could not find verified otp");
  }

  // Encrypt password
  const hashedPin = await hashingHelper.encrypt_password(pin);

  const updatedUser = await User.findOneAndUpdate(
    { mobile },
    { pin: hashedPin, isPinReset: true },
    {
      new: true,
    }
  ).select("-pin");

  // Delete otp
  await Otp.deleteOne({ mobile });

  return updatedUser;
};

export const OtpService = {
  sendOtp,
  verifyOtp,
  resetPin,
};
