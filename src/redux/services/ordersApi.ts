import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrdersApi = createApi({
  reducerPath: "OrdersApi",
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
    getCustomerNames: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/orders/customer-names",
        params: name ? { name } : {},
      }),
    }),

    getProfitNames: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/orders/profit-names",
        params: name ? { name } : {},
      }),
    }),

    getRetailers: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/orders/retailers",
        params: name ? { name } : {},
      }),
    }),

    getStatuses: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/orders/statuses",
        params: name ? { name } : {},
      }),
    }),
    // fulfillment-statuses

    getFullfillmentStatuses: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/orders/fulfillment-statuses",
        params: name ? { name } : {},
      }),
    }),
  }),
});

export const {
  useGetCustomerNamesQuery,
  useGetProfitNamesQuery,
  useGetRetailersQuery,
  useGetStatusesQuery,
  useGetFullfillmentStatusesQuery,
} = OrdersApi;
