import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { paginationFields } from "../../../constants/pagination";
import { IUploadFile } from "../../../interface/file";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const file = req.file as IUploadFile;
  const result = await UserService.createUser(data.data, file);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const agents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.agents(filters, paginationOptions);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrived agents successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateAgentStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...statusData } = req.body;
  const result = await UserService.updateAgentStatus(id, statusData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Agent status update successfully",
    data: result,
  });
});

const singleUser = catchAsync(async (req: Request, res: Response) => {
  const { mobile } = req.params;
  const result = await UserService.singleUser(mobile);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetch successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  agents,
  updateAgentStatus,
  singleUser,
};
