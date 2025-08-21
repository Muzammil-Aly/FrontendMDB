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
        phone?: string;
        full_name?: string;
        source?: string;
        join_type?: string;
        customer_id?: string;
        key?: string;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        email,
        phone,
        full_name,
        source,
        join_type,

        customer_id
        ,
        key
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (email) params.set("email", email);
        if (phone) params.set("phone", phone);
        if (full_name) params.set("full_name", full_name);
        if (source) params.set("source", source);
        if (customer_id) params.set("customer_id", customer_id);
        if (join_type) params.set("join_type", join_type);
        return `/customer_profiles/?${params.toString()}`;
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
