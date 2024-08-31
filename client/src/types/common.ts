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
  name: string;
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

export type IService = {
  _id: string;
  title: string;
  price: string;
  speed: string;
};

export type IBooking = {
  _id: string;
  name: string;
  email: string;
  status: string;
  phoneNumber: string;
  address: string;
  packageName: string;
};

export type IUserReview = {
  _id: string;
  name: string;
  text: string;
  status: string;
};

export type ISectionFaq = {
  _id: string;
  question: string;
  answer: string;
};

export type IPayment = {
  amount: number;
  email: string;
  status: IStatus;
  transactionId: string;
  packageName: string;
  month: string;
  year: string;
};

export type IStatus = "pending" | "success";
