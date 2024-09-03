import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const URI = "/cashout";
export const cashoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cashout: build.mutation({
      query: (moneyData) => ({
        url: `${URI}`,
        method: "POST",
        data: moneyData,
      }),
      invalidatesTags: [tagTypes.cashout,tagTypes.user],
    }),
  }),
});

export const { useCashoutMutation } = cashoutApi;
