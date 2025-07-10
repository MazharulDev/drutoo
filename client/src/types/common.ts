export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};
export type IGenericErrorResponse = {
  statusCode?: number;
  message?: string;
  errorMessages?: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IUser = {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  mobile: string;
  email: string;
  nid: string;
  role: string;
  image?: string;
  status: string;
  balance: number;
  transactions: Array<object>;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type ITransactions = {
  senderId: string;
  receivedId: string;
  amount: number;
  pin: string;
  transactionId: string;
  through: string;
};

export type IStatus = "pending" | "success";

export type IDivision = {
  id: string;
  name: string;
  bn_name: string;
  url: string;
};

export type IProfileInput = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  nid: string;
  gender: string;
  bio: string;
  dateOfBirth: Date;
  division: string;
  district: string;
  upazila: string;
  union: string;
};
