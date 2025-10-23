import { baseApi } from './baseApi';

type LoginData = {
  mobile: string;
  pin: string;
};

type UserData = {
  name: string;
  mobile: string;
  pin: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginData: LoginData) => ({
        url: '/auth/login',
        method: 'POST',
        data: loginData,
      }),
    }),
    createAccount: build.mutation({
      query: (userData: UserData) => ({
        url: '/user/create-user',
        method: 'POST',
        data: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useCreateAccountMutation } = authApi;