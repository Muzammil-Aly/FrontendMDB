import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supportTicketsApi = createApi({
  reducerPath: "supportTicketsApi",
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
    getTicketCustomerNames: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/tickets/customer-names",
        params: name ? { name } : {},
      }),
    }),

    getTicketPhones: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/tickets/phones",
        params: name ? { name } : {},
      }),
    }),

    getTicketTags: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/tickets/tags",
        params: name ? { name } : {},
      }),
    }),
  }),
});

export const {
  useGetTicketCustomerNamesQuery,
  useGetTicketPhonesQuery,
  useGetTicketTagsQuery,
} = supportTicketsApi;
