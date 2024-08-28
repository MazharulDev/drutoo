import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginData) => ({
        url: `/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    createAccount: build.mutation({
      query: (userData) => ({
        url: `/user/create-user`,
        method: "POST",
        data: userData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useLoginMutation, useCreateAccountMutation } = authApi;
