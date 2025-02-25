import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

export const otpApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendOtp: build.mutation({
      query: (mobile) => ({
        url: `/otp/send-otp`,
        method: "POST",
        data: mobile,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    verifyOtp: build.mutation({
      query: (otp) => ({
        url: `/otp/verify-otp`,
        method: "POST",
        data: otp,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resetPin: build.mutation({
      query: (otp) => ({
        url: `/otp/reset-pin`,
        method: "POST",
        data: otp,
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation, useResetPinMutation } =
  otpApi;
