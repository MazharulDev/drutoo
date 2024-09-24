import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const URI = "/system";
export const system = baseApi.injectEndpoints({
  endpoints: (build) => ({
    system: build.query({
      query: () => ({
        url: `${URI}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cashout, tagTypes.user, tagTypes.system],
    }),
  }),
});

export const { useSystemQuery } = system;
