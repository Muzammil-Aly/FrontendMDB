import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const klaviyoApi = createApi({
  reducerPath: "klaviyoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProfiles: builder.query<any, void>({
      query: () => `/api/klaviyo/profiles/`,
    }),
    getProfileEvents: builder.query<any, string>({
      query: (profileId) =>
        `/api/klaviyo/profile/events/?profile_id=${profileId}`,
    }),
  }),
});

export const { useGetProfilesQuery, useGetProfileEventsQuery } = klaviyoApi;
