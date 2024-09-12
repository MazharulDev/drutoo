import { ITransactions } from "./transactions.interface";
import { Transaction } from "./transactions.model";

const myTransaction = async (number: string): Promise<ITransactions | null> => {
  const result = await Transaction.findOne({ senderId: number })
  return result;
};

export const TransactionServices={
    myTransaction
}