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
  }),
});

export const { useSendOtpMutation } = otpApi;
