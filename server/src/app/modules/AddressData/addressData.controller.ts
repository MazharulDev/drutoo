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

const getDistricts = catchAsync(async (req: Request, res: Response) => {
  const { divisionId } = req.query as { divisionId: string };
  const result = await AddressDataService.getDistricts(divisionId);
  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Districts fetch successfully",
    data: result,
  });
});

const getUpazilas = catchAsync(async (req: Request, res: Response) => {
  const { districtId } = req.query as { districtId: string };
  const result = await AddressDataService.getUpazilas(districtId);
  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Upazila fetch successfully",
    data: result,
  });
});

const getUnions = catchAsync(async (req: Request, res: Response) => {
  const { upazilaId } = req.query as { upazilaId: string };
  const result = await AddressDataService.getUnions(upazilaId);
  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Unions fetch successfully",
    data: result,
  });
});

export const AddressDataController = {
  getDivision,
  getDistricts,
  getUpazilas,
  getUnions,
};
