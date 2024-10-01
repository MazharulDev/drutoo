import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AddressDataService } from "./addressData.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await AddressDataService.getDivision();
  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Division fetch successfully",
    data: result,
  });
});

export const AddressDataController = {
  getDivision,
};
