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

    getSOInventoryTable: builder.query<
      any,
      {
        document_no?: string;
        customer_name?: string;
        qty?: string;
        qty_commited?: string;
        page?: number;
        page_size?: number;
        location_code?: string;
        item_no?: string;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        document_no,
        customer_name,
        qty,
        qty_commited,
        location_code,
        item_no,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (document_no) params.set("document_no", document_no);
        if (qty) params.set("qty", qty);
        if (customer_name) params.set("customer_name", customer_name);
        if (qty_commited) params.set("qty_commited", qty_commited);

        if (location_code) params.set("location_code", location_code);
        if (item_no) params.set("item_no", item_no);
        return {
          url: `/qty_so_pop_up?${params.toString()}`,
        };
      },
    }),
    getPOInventoryTable: builder.query<
      any,
      {
        location_code?: string;
        item_no?: string;
        shipment_status?: string;
        expected_receipt_date?: string;
        page?: number;
        page_size?: number;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        location_code,
        item_no,
        shipment_status,
        expected_receipt_date,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (shipment_status) params.set("shipment_status", shipment_status);
        if (expected_receipt_date)
          params.set("expected_receipt_date", expected_receipt_date);

        if (location_code) params.set("location_code", location_code);
        if (item_no) params.set("item_no", item_no);
        return {
          url: `/qty_po_pop_up?${params.toString()}`,
        };
      },
    }),

    getQTYoneInventoryTable: builder.query<
      any,
      {
        location_code?: string;
        item_no?: string;
        test_quality?: string;
        lot_no?: string;
        blocked?: string;
        page?: number;
        page_size?: number;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        location_code,
        item_no,
        test_quality,
        lot_no,
        blocked,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());

        if (item_no) params.set("item_no", item_no);
        if (location_code) params.set("location_code", location_code);
        if (test_quality) params.set("test_quality", test_quality);
        if (lot_no) params.set("lot_no", lot_no);
        if (blocked) params.set("blocked", blocked);

        return {
          url: `/qty_available_pop_up1?${params.toString()}`,
        };
      },
    }),
    getQTYtwoInventoryTable: builder.query<
      any,
      {
        item_no?: string;
        description?: string;
        description_2?: string;
        location_code?: string;
        zone_code?: string;
        lot_no?: string;
        page?: number;
        page_size?: number;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        item_no,
        description,
        description_2,
        location_code,
        zone_code,
        lot_no,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());

        if (item_no) params.set("item_no", item_no);
        if (description) params.set("description", description);
        if (description_2) params.set("description_2", description_2);
        if (location_code) params.set("location_code", location_code);
        if (zone_code) params.set("zone_code", zone_code);
        if (lot_no) params.set("lot_no", lot_no);

        return {
          url: `/qty_available_pop_up2?${params.toString()}`,
        };
      },
    }),
  }),
});
export const {
  useGetLocationCodesQuery,
  useGetSOInventoryTableQuery,
  useGetPOInventoryTableQuery,
  useGetQTYoneInventoryTableQuery,
  useGetQTYtwoInventoryTableQuery,
  useLazyGetQTYoneInventoryTableQuery, // <-- add this
  useLazyGetQTYtwoInventoryTableQuery, // <-- add this
  useLazyGetSOInventoryTableQuery, // optional, if needed
  useLazyGetPOInventoryTableQuery, // optional, if needed
} = InventoryApi;
