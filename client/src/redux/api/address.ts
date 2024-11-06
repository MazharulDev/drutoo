import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const URI = "/address-data";
export const addressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDivision: build.query({
      query: () => ({
        url: `${URI}/division`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.address],
    }),

    getDistricts: build.query({
      query: (divisionId) => ({
        url: `${URI}/districts?divisionId=${divisionId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.address],
    }),

    getUpazilas: build.query({
      query: (districtId) => ({
        url: `${URI}/upazilas?districtId=${districtId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.address],
    }),

    getUnions: build.query({
      query: (upazilaId) => ({
        url: `${URI}/unions?upazilaId=${upazilaId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.address],
    }),
  }),
});

export const {
  useGetDivisionQuery,
  useGetDistrictsQuery,
  useGetUpazilasQuery,
  useGetUnionsQuery,
} = addressApi;
