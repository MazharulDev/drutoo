import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CashinService } from "./cashin.service";


const cashin = catchAsync(async (req: Request, res: Response) => {
  const { ...cashinData } = req.body;
  const result = await CashinService.cashin(cashinData)
  sendResponse<string | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cashin successfully",
    data: result,
  });
});

export const cashinController = {
  cashin,
};
