import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";
import { envConfig } from "../../helpers/config/envConfig";
import { tagTypesList } from "../tagTypes/tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: envConfig.baseApi }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
