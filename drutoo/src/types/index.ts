export interface IUser {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  mobile: string;
  email: string;
  nid: string;
  dateOfBirth: string;
  bloodGroup: string;
  gender: string;
  address: {
    division: string;
    district: string;
    upazila: string;
    union: string;
  };
  role: string;
  status: string;
  balance: number;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginData {
  mobile: string;
  pin: string;
}

export interface ISignupData {
  profilePicture?: any;
  name: {
    firstName: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  role: string;
  address: {
    division: string;
    district: string;
    upazila: string;
    union: string;
  };
  nid: string;
  mobile: string;
  email: string;
  pin: string;
}
