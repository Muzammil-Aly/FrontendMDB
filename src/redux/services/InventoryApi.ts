import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const InventoryApi = createApi({
  reducerPath: "InventoryApi",
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
    getLocationCodes: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/inventory/location-codes",
        params: name ? { name } : {},
      }),
    }),
  }),
});

export const { useGetLocationCodesQuery } = InventoryApi;
