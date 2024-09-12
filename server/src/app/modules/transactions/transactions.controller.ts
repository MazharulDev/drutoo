import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TransactionServices } from "./transaction.service";
import sendResponse from "../../../shared/sendResponse";
import { ITransactions } from "./transactions.interface";
import httpStatus from "http-status";

const myTransaction = catchAsync(async (req: Request, res: Response) => {
  const { number } = req.params;
  const result = await TransactionServices.myTransaction(number);
  sendResponse<ITransactions>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your transaction fetch successfully",
    data: result,
  });
});

export const TransactionController={
    myTransaction,
}