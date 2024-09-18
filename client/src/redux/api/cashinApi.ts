import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const URI = "/cashin";
export const cashinApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cashin: build.mutation({
      query: (moneyData) => ({
        url: `${URI}`,
        method: "POST",
        data: moneyData,
      }),
      invalidatesTags: [
        tagTypes.cashout,
        tagTypes.user,
        tagTypes.cashin,
        tagTypes.transactions,
      ],
    }),
  }),
});

export const { useCashinMutation } = cashinApi;
