import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TransactionServices } from "./transaction.service";
import sendResponse from "../../../shared/sendResponse";
import { ITransactions } from "./transactions.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { transactionFilterableFields } from "./transaction.constant";
import { paginationFields } from "../../../constants/pagination";

const myTransaction = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, transactionFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await TransactionServices.myTransaction(
    filters,
    paginationOptions
  );
  sendResponse<ITransactions[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrived transactions successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const TransactionController = {
  myTransaction,
};
