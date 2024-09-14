import { IMeta, ITransactions } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const TRANSACTIONS_URL = "/transactions";
export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myTransactions: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${TRANSACTIONS_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ITransactions[], meta: IMeta) => {
        return {
          transaction: response,
          meta,
        };
      },
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
