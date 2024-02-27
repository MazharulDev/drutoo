import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CashoutService } from "./cashout.service";

const cashout = catchAsync(async (req: Request, res: Response) => {
  const { ...cashoutData } = req.body;
  const result = await CashoutService.cashout(cashoutData);
  sendResponse<string | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cashout successfully",
    data: result,
  });
});

export const cashoutController = {
  cashout,
};
