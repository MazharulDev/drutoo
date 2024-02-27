import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { SendMoneyService } from "./sendMoney.service";

const sendMoney = catchAsync(async (req: Request, res: Response) => {
  const { ...sendMoneyData } = req.body;
  const result = await SendMoneyService.transactions(sendMoneyData);
  sendResponse<string | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Send Money successfully",
    data: result,
  });
});

export const sendMoneyController = {
  sendMoney,
};
