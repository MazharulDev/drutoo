import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/app/helpers/axios/axiosBaseQuery';
import { getBaseUrl } from '@/app/helpers/config/envConfig';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: [],
});