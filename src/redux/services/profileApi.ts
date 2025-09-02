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
        customer_id,
        key,
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
        email?: string;
        source?: string;
        order_id?: string;
        customer_id?: string;
        customer_name?: string;
        customer_reference_no?: string;
        shipping_address?: string;
        tracking?: string;
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

        return `/customer_orders?${params.toString()}`;
      },
    }),

    getOrderItems: builder.query<any, { orderId: string }>({
      query: ({ orderId }) => `customer_order_items?order_id=${orderId}`,
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

    // getSupportTicketsCommnets: builder.query<any, { customerId: number }>({
    //        query: ({ customerId }) => `support_ticket_comments?customer_id=${customerId}`,
    // }),

    // getSupportTicketsCommnets: builder.query<any, { customerId?: number; ticketId?: number,  page?: number;
    //   page_size?: number; }>({
    //   query: ({ customerId, ticketId, page = 1, page_size = 50, }) => {
    //     let queryParams: string[] = [];
    //     if (customerId) queryParams.push(`customer_id=${customerId}`);
    //     if (ticketId) queryParams.push(`ticket_id=${ticketId}`);
    //     return `support_ticket_comments?${queryParams.join("&")}`;
    //   },
    // }),
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
  useGetSupportTicketsQuery,
  useGetSupportTicketsCommnetsQuery,
  useGetCustomerEventsQuery,
} = klaviyoApi;
