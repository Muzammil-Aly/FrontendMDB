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
        created_at?: string;
        last_order_date?: string;
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
        customer_id,
        key,
        created_at,
        last_order_date,
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
        if (key) params.set("key", key);
        if (created_at) params.set("created_at", created_at);
        if (last_order_date) params.set("last_order_date", last_order_date);

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
    getCustomerSegment: builder.query<any, { custId: string }>({
      query: ({ custId }) => `customer_segments?cust_id=${custId}`,
    }),
    getCustomerOrders: builder.query<
      any,
      {
        page?: number;
        page_size?: number;
        customer_email?: string;
        source?: string;
        order_id?: string;
        customer_id?: string;
        customer_name?: string;
        customer_reference_no?: string;
        shipping_address?: string;
        tracking?: string;
        order_date?: string;
        profit_name?: string;
        retailer?: string;
        fulfillment_status?: string;
        order_status?: string;
        psi_number?: string;
        customer_no?: string;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        order_id,
        customer_id,
        customer_name,
        customer_reference_no,
        shipping_address,
        tracking,
        customer_email,
        order_date,
        profit_name,
        retailer,
        fulfillment_status,
        order_status,
        psi_number,
        customer_no,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (order_id) params.set("order_id", order_id);
        if (customer_id) params.set("customer_id", customer_id);
        if (customer_name) params.set("customer_name", customer_name);
        if (customer_reference_no)
          params.set("customer_reference_no", customer_reference_no);
        if (shipping_address) params.set("shipping_address", shipping_address);
        if (tracking) params.set("tracking", tracking);
        if (customer_email) params.set("customer_email", customer_email);
        if (order_date) params.set("order_date", order_date);
        if (profit_name) params.set("profit_name", profit_name);
        if (retailer) params.set("retailer", retailer);
        if (fulfillment_status)
          params.set("fulfillment_status", fulfillment_status);
        if (order_status) params.set("order_status", order_status);
        if (psi_number) params.set("psi_number", psi_number);
        if (customer_no) params.set("customer_no", customer_no);

        return `/customer_orders?${params.toString()}`;
      },
    }),

    getOrderItems: builder.query<any, { orderId: string }>({
      query: ({ orderId }) => `customer_order_items?order_id=${orderId}`,
    }),
    // getLocationItemLot: builder.query<any, { sku: string }>({
    //   query: ({ sku }) => `location_item_lot?sku=${sku}`,
    // }),
    getLocationItemLot: builder.query<
      any,
      { sku: string; page?: number; page_size?: number }
    >({
      query: ({ sku, page = 1, page_size = 10 }) => {
        const params = new URLSearchParams();

        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (sku) params.set("sku", sku);

        return `/location_item_lot?${params.toString()}`;
      },
    }),

    getReturns: builder.query<any, { customer_id: string }>({
      query: ({ customer_id }) =>
        `customer_orders_return?customer_id=${customer_id}`,
    }),
    getRefunds: builder.query<any, { customer_id: string }>({
      query: ({ customer_id }) =>
        `customer_orders_refund?customer_id=${customer_id}`,
    }),
    getSupportTickets: builder.query<
      any,
      {
        page?: number;
        page_size?: number;
        ticket_id?: string;
        customer_id?: string;
        customer_name?: string;
        phone_no?: string;
        email?: string;
        status?: string;
        tags?: string;
        created_at?: string;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        customer_id,
        ticket_id,
        customer_name,
        phone_no,
        email,
        status,
        tags,
        created_at,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (customer_id) params.set("customer_id", customer_id);
        if (ticket_id) params.set("ticket_id", ticket_id);
        if (customer_name) params.set("customer_name", customer_name);
        if (phone_no) params.set("phone_no", phone_no);
        if (email) params.set("email", email);
        if (status) params.set("status", status);
        if (tags) params.set("tags", tags);
        if (created_at) params.set("created_at", created_at);
        return `/support_tickets?${params.toString()}`;
      },
    }),

    getSupportTicketsCommnets: builder.query<
      any,
      {
        customerId?: number;
        ticketId?: number;
        page?: number;
        page_size?: number;
      }
    >({
      query: ({ customerId, ticketId, page = 1, page_size = 50 }) => {
        const queryParams: string[] = [];
        if (customerId) queryParams.push(`customer_id=${customerId}`);
        if (ticketId) queryParams.push(`ticket_id=${ticketId}`);

        queryParams.push(`page=${page}`);
        queryParams.push(`page_size=${page_size}`);

        return `support_ticket_comments?${queryParams.join("&")}`;
      },
    }),

    getCustomerEvents: builder.query<
      any,
      {
        page?: number;
        page_size?: number;
        event_type?: string;
        event_id?: string;
        campaign_name?: string;
        customer_id?: string;
        email?: string;
        customer_name?: string;
        event_timestamp?: string;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        event_type,
        event_id,
        campaign_name,
        customer_id,
        email,
        customer_name,
        event_timestamp,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (event_type) params.set("event_type", event_type);
        if (event_id) params.set("event_id", event_id);
        if (campaign_name) params.set("campaign_name", campaign_name);
        if (customer_id) params.set("customer_id", customer_id);
        if (email) params.set("email", email);
        if (customer_name) params.set("customer_name", customer_name);
        if (event_timestamp) params.set("event_timestamp", event_timestamp);

        return `customer_events?${params.toString()}`;
      },
    }),

    getTouchups: builder.query<
      any,
      {
        page?: number;
        page_size?: number;
        order_id?: string;
        lot_no?: string | null;
        sku?: string;
        customer_id?: string;
        parts_item_no?: string;
        parts_item_name?: string;
        parts_item_name_2?: string;
        touchup_pen_item_no?: string;
        touchup_pen_item_name?: string;
        brand?: string;
        color_slug?: string;
        color_name?: string;
        parts_version?: string;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        order_id,
        lot_no,
        sku,
        customer_id,
        parts_item_no,
        parts_item_name,
        parts_item_name_2,
        touchup_pen_item_no,
        touchup_pen_item_name,
        brand,
        color_slug,
        color_name,
        parts_version,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());
        if (order_id) params.set("order_id", order_id);
        if (lot_no) params.set("lot_no", lot_no);
        if (sku) params.set("sku", sku);
        if (customer_id) params.set("customer_id", customer_id);
        if (parts_item_no) params.set("parts_item_no", parts_item_no);
        if (parts_item_name) params.set("parts_item_name", parts_item_name);
        if (parts_item_name_2)
          params.set("parts_item_name_2", parts_item_name_2);
        if (touchup_pen_item_no)
          params.set("touchup_pen_item_no", touchup_pen_item_no);
        if (touchup_pen_item_name)
          params.set("touchup_pen_item_name", touchup_pen_item_name);
        if (brand) params.set("brand", brand);
        if (color_slug) params.set("color_slug", color_slug);
        if (color_name) params.set("color_name", color_name);
        if (parts_version) params.set("parts_version", parts_version);

        return `touchup_part?${params.toString()}`;
      },
    }),

    getTouchupPens: builder.query<
      any,
      {
        page?: number;
        page_size?: number;
        color_slug?: string | null;
        item_num?: string;
        item_name?: string;
        item_name2?: string;
        color_name?: string;
        sku?: string;
        QtyAvailable?: string;
      }
    >({
      query: ({
        page = 1,
        page_size = 10,
        color_slug,
        item_num,
        item_name,
        item_name2,
        color_name,
        sku,
        QtyAvailable,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());

        if (color_slug) params.set("Colorslug", color_slug);
        if (item_num) params.set("item_num", item_num);
        if (item_name) params.set("item_name", item_name);
        if (item_name2) params.set("ItemName2", item_name2);
        if (color_name) params.set("ColorName", color_name);
        if (sku) params.set("sku", sku);
        if (QtyAvailable) params.set("QtyAvailable", QtyAvailable);

        return `touchup_pen?${params.toString()}`;
      },

      transformResponse: (response: any) => {
        // Example API response:
        // {
        //   data: [...],
        //   total_pages: 5,
        //   count: 50
        // }

        const items = response?.data || [];
        return {
          results: Array.isArray(items)
            ? items.map((item: any) => ({
                ItemNum: item.ItemNum,
                ItemName: item.ItemName,
                ItemName2: item.ItemName2,
                Colorslug: item.Colorslug,
                ColorName: item.ColorName,
                QtyAvailable: item.QtyAvailable,
              }))
            : [],
          total_pages: response?.total_pages ?? 1,
          count: response?.count ?? items.length,
        };
      },
    }),

    getInventory: builder.query<
      any,
      {
        item_no?: string;
        location_code?: any;
        description?: string;
        eta?: string;
        qty?: number;
        qty_available?: number;
        avail_qty_on_hand?: number;
        avail_qty_to_commit?: number;
        qty_on_blocked_lot_bin?: number;
        page?: number;
        page_size?: number;
        life_cycle_status_code?: string;
      }
    >({
      query: ({
        item_no,
        location_code,
        description,
        eta,
        qty,
        qty_available,
        avail_qty_on_hand,
        avail_qty_to_commit,
        qty_on_blocked_lot_bin,
        life_cycle_status_code,
        page = 1,
        page_size = 10,
      }) => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("page_size", page_size.toString());

        if (item_no) params.set("item_no", item_no);
        // if (location_code) params.set("location_code", location_code);
        if (Array.isArray(location_code) && location_code.length > 0) {
          params.set("location_code", location_code.join(",")); // <-- correct format
        } else if (location_code) {
          params.set("location_code", location_code);
        }
        if (description) params.set("description", description);
        if (eta) params.set("eta", eta);
        if (qty !== undefined) params.set("qty", qty.toString());
        if (qty_available !== undefined)
          params.set("qty_available", qty_available.toString());
        if (avail_qty_on_hand !== undefined)
          params.set("avail_qty_on_hand", avail_qty_on_hand.toString());
        if (avail_qty_to_commit !== undefined)
          params.set("avail_qty_to_commit", avail_qty_to_commit.toString());

        if (life_cycle_status_code !== undefined)
          params.set(
            "life_cycle_status_code",
            life_cycle_status_code.toString()
          );

        if (qty_on_blocked_lot_bin !== undefined)
          params.set(
            "qty_on_blocked_lot_bin",
            qty_on_blocked_lot_bin.toString()
          );

        return `inventory_Availability?${params.toString()}`;
      },
    }),

    getFullNames: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/customer/full-names",
        params: name ? { name } : {},
      }),
    }),
    getLifeCycleStatus: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/inventory/life_cycle_status",
        params: name ? { name } : {},
      }),
    }),
    getPhone: builder.query<any, string | void>({
      query: (name = "") => ({
        url: "/customer/phone",
        params: name ? { name } : {},
      }),
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
  useGetCustomerSegmentQuery,
  useGetCustomerOrdersQuery,
  useGetOrderItemsQuery,

  useGetLocationItemLotQuery,
  // useGetZpartEtAQuery,
  useGetReturnsQuery,
  useGetRefundsQuery,
  useGetSupportTicketsQuery,
  useGetSupportTicketsCommnetsQuery,
  useGetCustomerEventsQuery,
  useGetTouchupsQuery,
  useGetInventoryQuery,
  useGetFullNamesQuery,
  useGetPhoneQuery,
  useGetTouchupPensQuery,
  useGetLifeCycleStatusQuery,
} = klaviyoApi;
