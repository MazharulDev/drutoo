import { IUser, IUserFilters } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { userSearchableFields } from "./user.constant";
import { SortOrder } from "mongoose";
import { AddSystemBalance } from "./user.utlis";
import { System } from "../system/system.model";
import { ICloudinaryResponse, IUploadFile } from "../../../interface/file";
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";

const createUser = async (
  payload: IUser | string,
  file?: IUploadFile
): Promise<IUser | null> => {
  if (typeof payload === "string") {
    payload = JSON.parse(payload) as IUser;
  }

  const userExist = await User.findOne({ mobile: payload.mobile });
  if (userExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists. Please login."
    );
  }
  if (file) {
    const uploadedImg = (await fileUploadHelper.uploadToCloudinary(
      file
    )) as ICloudinaryResponse;
    payload.profilePicture = uploadedImg.secure_url;
  }

  let status;
  if (payload.role === "agent") {
    status = "inactive";
  }

  const userData = {
    ...payload,
    balance: payload.role === "agent" ? 100000 : 40,
    status: status,
  };

  const newUser = await User.create(userData);
  const amount = newUser.balance;
  const incrementAmount = await AddSystemBalance(amount);
  await System.updateOne({ name: "systemAmount" }, { amount: incrementAmount });
  const newUserResponse = await User.findById(newUser._id).select("-pin");

  return newUserResponse;
};

const agents = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateAgentStatus = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const singleUser = async (mobile: string): Promise<IUser | null> => {
  const result = await User.findOne({ mobile: mobile }).populate(
    "transactions"
  );
  return result;
};

export const UserService = {
  createUser,
  agents,
  updateAgentStatus,
  singleUser,
};
