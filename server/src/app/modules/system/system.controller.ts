import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SystemServices } from "./system.service";
import sendResponse from "../../../shared/sendResponse";
import { ISystem } from "./system.interface";
import httpStatus from "http-status";

const systemInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await SystemServices.systemInfo();
  sendResponse<ISystem[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "system info fetch successfully",
    data: result,
  });
});

export const SystemController = {
  systemInfo,
};
