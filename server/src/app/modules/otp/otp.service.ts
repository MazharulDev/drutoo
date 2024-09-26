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
  expiresAt.setTime(expiresAt.getTime() + 30 * 1000); // 30 seconds

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
      message: `Your OTP is ${result.otp}. Please do not share it with anyone. OTP will expire in 30 seconds`,
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

const verifyOtp = async (office_email: string, otp: string) => {
  const otpData = await Otp.findOne({ office_email });
  if (!otpData) {
    throw new ApiError(httpStatus.NOT_FOUND, "OTP not found");
  }

  const currentTime = new Date();
  // Check if otp is expired
  if (currentTime > otpData.expiresAt) {
    // Delete otp
    await Otp.deleteOne({ office_email });
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP expired");
  }

  if (otpData.otp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP is incorrect");
  }

  // Update otp status
  const updatedOtpData = await Otp.findOneAndUpdate(
    { office_email },
    { isVerified: true },
    { new: true }
  );

  if (!updatedOtpData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Could not verify otp");
  }

  return {
    _id: updatedOtpData._id,
    office_email: updatedOtpData.email,
    isVerified: updatedOtpData.isVerified,
    expiresAt: updatedOtpData.expiresAt,
  };
};

const resetPassword = async (office_email: string, password: string) => {
  const user = await isUserExist(office_email, User);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const otpData = await Otp.findOne({ office_email });

  //Check if otp is verified
  if (!otpData?.isVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Could not find verified otp");
  }

  // Encrypt password
  const hashedPassword = await hashingHelper.encrypt_password(password);

  const updatedUser = await User.findOneAndUpdate(
    { office_email },
    { password: hashedPassword },
    {
      new: true,
    }
  ).select("-password");

  // Delete otp
  await Otp.deleteOne({ office_email });

  return updatedUser;
};

export const OtpService = {
  sendOtp,
  verifyOtp,
  resetPassword,
};
