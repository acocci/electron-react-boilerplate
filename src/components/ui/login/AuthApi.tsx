/* eslint-disable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  // TODO: add base url to a config file
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:55600/v1/' }),
  endpoints: builder => ({
    getTokens: builder.mutation({
      query: bodyDetails => ({
        url: 'login',
        method: 'POST',
        body: bodyDetails,
        headers: {
          'Content-Length': '',
          'Content-Type': 'application/x-www-form-urlencoded',
          Origin: '*',
        },
      }),
    }),
  }),
  reducerPath: 'authApi',
});

export const { useGetTokensMutation } = authApi;
