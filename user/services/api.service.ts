import apiClient from "./api.config";

export interface LoginPayload {
  mobile: string;
  pin: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface UserProfile {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  mobile: string;
  email: string;
  role: string;
  balance: number;
  status: string;
  profilePicture?: string;
  nidNumber: string;
  address: {
    division: string;
    district: string;
    upazila: string;
    union: string;
  };
  createdAt: string;
  transactions?: Transaction[];
}

export interface Transaction {
  _id: string;
  senderId: string;
  receivedId: string;
  amount: number;
  transactionId: string;
  through: string;
  createdAt: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  changePin: async (payload: { oldPin: string; newPin: string }) => {
    const response = await apiClient.post("/auth/change-pin", payload);
    return response.data;
  },
};

export const userService = {
  getProfile: async (mobile: string): Promise<UserProfile> => {
    const response = await apiClient.get(`/user/profile/${mobile}`);
    return response.data.data;
  },

  updateProfile: async (mobile: string, data: FormData) => {
    const response = await apiClient.patch(
      `/user/update-my-profile/${mobile}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

export const transactionService = {
  sendMoney: async (payload: {
    receivedId: string;
    senderId: string;
    amount: number;
    pin: string;
  }) => {
    const response = await apiClient.post("money/send-money", payload);
    return response.data;
  },

  cashOut: async (payload: {
    receivedId: string;
    senderId: string;
    amount: number;
    pin: string;
  }) => {
    const response = await apiClient.post("/cashout", payload);
    return response.data;
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await apiClient.get("/transactions");
    return response.data.data;
  },
};
