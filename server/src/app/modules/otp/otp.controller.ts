import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OtpService } from "./otp.service";

const sendOtp = catchAsync(async (req: Request, res: Response) => {
  const { mobile } = req.body;
  const result = await OtpService.sendOtp(mobile);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP sent successfully!",
    data: result,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { mobile, otp } = req.body;
  const result = await OtpService.verifyOtp(mobile, otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP verified successfully!",
    data: result,
  });
});

const resetPin = catchAsync(async (req: Request, res: Response) => {
  const { mobile, pin } = req.body;
  const result = await OtpService.resetPin(mobile, pin);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Pin reset successfully!",
    data: result,
  });
});

export const OtpController = {
  sendOtp,
  verifyOtp,
  resetPin,
};
