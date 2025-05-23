import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    createAccount: build.mutation({
      query: (userData) => {
        const formData = new FormData();
        const { profilePicture, ...data } = userData;

        formData.append("profilePicture", profilePicture);
        formData.append("data", JSON.stringify(data));
        return {
          url: `/user/create-user`,
          method: "POST",
          data: formData,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    changePin: build.mutation({
      query: (pinData) => ({
        url: `/auth/change-pin`,
        method: "POST",
        data: pinData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateAccountMutation,
  useChangePinMutation,
} = authApi;
