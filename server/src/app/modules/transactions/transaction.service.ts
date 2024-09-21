import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { transactionsSearchableFields } from "./transaction.constant";
import { ITransactionFilters, ITransactions } from "./transactions.interface";
import { Transaction } from "./transactions.model";

const myTransaction = async (
  filters: ITransactionFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITransactions[]>> => {
  const { searchTerm, senderId, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search term filtering
  if (searchTerm) {
    andConditions.push({
      $or: transactionsSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Sender or Receiver filtering
  if (senderId) {
    andConditions.push({
      $or: [{ senderId: senderId }, { receivedId: senderId }],
    });
  }

  // Other filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Sorting logic
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Final query conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // Fetching results
  const result = await Transaction.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // Counting total documents
  const total = await Transaction.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const TransactionServices = {
  myTransaction,
};
