import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/user";
export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: (mobile: string | string[] | undefined) => ({
        url: `${USER_URL}/profile/${mobile}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.admin, tagTypes.sendMoney],
    }),
    users: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${USER_URL}/filter`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          users: response,
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
    updateMyProfile: build.mutation({
      query: (payload) => {
        const formData = new FormData();
        const { profilePicture, ...data } = payload;

        formData.append("profilePicture", profilePicture);
        formData.append("data", JSON.stringify(data));
        return {
          url: `${USER_URL}/update-my-profile/${payload.mobile}`,
          method: "PATCH",
          data: formData,
          contentType: "multipart/form-data",
        };
      },
      transformResponse: (response: IUser) => response, // response.user,
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useProfileQuery, useUsersQuery, useUpdateMyProfileMutation } =
  userApi;
