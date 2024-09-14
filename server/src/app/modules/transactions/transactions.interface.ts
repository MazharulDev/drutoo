export type ITransactions = {
  senderId: string;
  receivedId: string;
  amount: number;
  pin: string;
  transactionId: string;
  through: string;
};

export type ITransactionFilters = {
  searchTerm?: string;
  transactionId?: string;
  amount?: number;
};
