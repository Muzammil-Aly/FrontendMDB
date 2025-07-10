import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const klaviyoApi = createApi({
  reducerPath: "klaviyoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = process.env.NEXT_PUBLIC_DATABRICKS_PAT;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfiles: builder.query<
      any,
      {
        page?: number;
        page_size?: number;
        email?: string;
        phone_number?: string;
        store?: string;
        segments?: string;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        email,
        phone_number,
        store,
        // segments,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (email) params.set("email", email);
        if (phone_number) params.set("phone_number", phone_number);
        if (store) params.set("store", store);
        // if (segments) params.set("segment_id", segments);

        return `/profiles/?${params.toString()}`;
      },
    }),

    getProfileEvents: builder.query<
      any,
      { profileId: string; page?: number; page_size?: number }
    >({
      query: ({ profileId, page = 1, page_size = 10 }) => {
        const params = new URLSearchParams();
        params.set("profile_id", profileId);
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());

        return `/events?${params.toString()}`;
      },
    }),
    getOrderHistory: builder.query<any, { profileId: string }>({
      query: ({ profileId }) => {
        return `/order_history?profile_id=${profileId}`;
      },
    }),
    getZendeskTickets: builder.query<any, { email?: string }>({
      query: ({ email }) => `/zendesk_tickets?email=${email}`,
    }),
    getSegments: builder.query<any, { page?: number; page_size?: number }>({
      query: ({ page, page_size } = {}) => {
        return `/segments?page=${page}&page_size=${page_size}`;
      },
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useGetProfileEventsQuery,
  useLazyGetProfileEventsQuery,
  useGetOrderHistoryQuery,
  useGetZendeskTicketsQuery,
  useGetSegmentsQuery,
} = klaviyoApi;
