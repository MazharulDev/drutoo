import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userSignup: build.mutation({
      query: (userData) => ({
        url: `/all-users/create-user`,
        method: "POST",
        data: userData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    createAdmin: build.mutation({
      query: (adminData) => ({
        url: `/all-users/create-admin`,
        method: "POST",
        data: adminData,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useCreateAdminMutation,
} = authApi;
