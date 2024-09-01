import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const URI = "/money";
export const sendMoneyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendMoney: build.mutation({
      query: (moneyData) => ({
        url: `${URI}/send-money`,
        method: "POST",
        data: moneyData,
      }),
      invalidatesTags: [tagTypes.sendMoney],
    }),
  }),
});

export const { useSendMoneyMutation } = sendMoneyApi;
