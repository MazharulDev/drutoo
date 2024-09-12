import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const TRANSACTIONS_URL = "/transactions";
export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myTransactions: build.query({
      query: (mobile: string | string[] | undefined) => ({
        url: `${TRANSACTIONS_URL}/${mobile}`,
        method: "GET",
      }),
      providesTags: [
        tagTypes.user,
        tagTypes.admin,
        tagTypes.sendMoney,
        tagTypes.transactions,
      ],
    }),
  }),
});

export const { useMyTransactionsQuery } = transactionsApi;
