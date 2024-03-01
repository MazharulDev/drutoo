import { IMeta, IUsers } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";
export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all admin
    users: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${USER_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUsers[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    user: build.query({
      query: (email: string | string[] | undefined) => ({
        url: `/all-users/${email}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.admin],
    }),
  }),
});

export const { useUsersQuery, useUserQuery } = userApi;
