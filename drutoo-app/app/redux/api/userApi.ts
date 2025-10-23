import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: (userId: string) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useProfileQuery } = userApi;