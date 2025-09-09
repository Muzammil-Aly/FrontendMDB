// import CopyCellRenderer from "./CopyCellRenderer";

// export const users = [
//   { field: "customer_id", headerName: "Customer ID" },
//   { field: "email", headerName: "Email" },
//   { field: "phone", headerName: "Phone" },
//   { field: "full_name", headerName: "Full Name" },
//   { field: "source", headerName: "Source" },
//   { field: "join_type", headerName: "Join Type" },
//   { field: "key", headerName: "Key" },

//   { field: "created_at", headerName: "Created At" },
//   { field: "last_order_date", headerName: "Last Order Date" },
//   { field: "total_orders", headerName: "Total Orders" },
// ];
import CopyCellRenderer from "./CopyCellRenderer";

export const users = [
  {
    field: "customer_id",
    headerName: "Customer ID",
    cellRenderer: CopyCellRenderer,

    // suppressCellClick: true,
    // suppressRowClickSelection: true,
  },
  { field: "email", headerName: "Email", cellRenderer: CopyCellRenderer },
  { field: "phone", headerName: "Phone", cellRenderer: CopyCellRenderer },
  {
    field: "full_name",
    headerName: "Full Name",
    cellRenderer: CopyCellRenderer,
  },
  { field: "source", headerName: "Source", cellRenderer: CopyCellRenderer },
  {
    field: "join_type",
    headerName: "Join Type",
    cellRenderer: CopyCellRenderer,
  },
  { field: "key", headerName: "Key", cellRenderer: CopyCellRenderer },
  {
    field: "created_at",
    headerName: "Created At",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "last_order_date",
    headerName: "Last Order Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "total_orders",
    headerName: "Total Orders",
    cellRenderer: CopyCellRenderer,
  },
];

export const orders = [
  { field: "order_id", headerName: "Order ID", cellRenderer: CopyCellRenderer },
  {
    field: "customer_id",
    headerName: "Customer ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_name",
    headerName: "Customer Name",
    cellRenderer: CopyCellRenderer,
  },
  // { field: "customer_no", headerName: "Customer No" },
  { field: "phone_no", headerName: "Phone No", cellRenderer: CopyCellRenderer },
  {
    field: "customer_email",
    headerName: "Email",
    cellRenderer: CopyCellRenderer,
  },

  {
    field: "customer_reference_no",
    headerName: "Customer Reference No",
    cellRenderer: CopyCellRenderer,
  },
  { field: "tracking", headerName: "Tracking", cellRenderer: CopyCellRenderer },
  { field: "retailer", headerName: "Retailer", cellRenderer: CopyCellRenderer },

  {
    field: "order_date",
    headerName: "Order Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "total_value",
    headerName: "Total Value",
    cellRenderer: CopyCellRenderer,
  },
  // { field: "discount_code", headerName: "Discount Code" },
  {
    field: "profit_name",
    headerName: "Profit Name",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "fulfillment_status",
    headerName: "Fulfillment Status",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "shipping_address",
    headerName: "Shipping Address",
    cellRenderer: CopyCellRenderer,
  },
  { field: "channel", headerName: "Channel" },
];

export const orderItems = [
  {
    field: "line_no",
    headerName: "Order Item ID",
    cellRenderer: CopyCellRenderer,
  },
  // { field: "order_id", headerName: "Order ID" },
  { field: "sku", headerName: "SKU", cellRenderer: CopyCellRenderer },
  {
    field: "product_name",
    headerName: "Product Name",
    cellRenderer: CopyCellRenderer,
  },
  { field: "quantity", headerName: "Quantity", cellRenderer: CopyCellRenderer },
  {
    field: "amount",
    headerName: "Gross Amount",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "item_type",
    headerName: "Item Type",
    cellRenderer: CopyCellRenderer,
  },
  { field: "brand", headerName: "Brand", cellRenderer: CopyCellRenderer },
  {
    field: "collection",
    headerName: "Collection",
    cellRenderer: CopyCellRenderer,
  },
];

export const support_tickets = [
  {
    field: "ticket_id",
    headerName: "Ticket ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_id",
    headerName: "Customer ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_name",
    headerName: "Customer Name",
    cellRenderer: CopyCellRenderer,
  },
  { field: "email", headerName: "Email", cellRenderer: CopyCellRenderer },
  { field: "status", headerName: "Status", cellRenderer: CopyCellRenderer },
  { field: "phone_no", headerName: "Phone", cellRenderer: CopyCellRenderer },
  {
    field: "created_at",
    headerName: "Created At",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "resolved_at",
    headerName: "Resolved At",
    cellRenderer: CopyCellRenderer,
  },
  { field: "channel", headerName: "Channel", cellRenderer: CopyCellRenderer },
  { field: "tags", headerName: "Tags", cellRenderer: CopyCellRenderer },
  {
    field: "csat_score",
    headerName: "CSAT Score",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "sentiment_score",
    headerName: "Sentiment Score",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "last_comment_at",
    headerName: "Last Comment At",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "comment_count",
    headerName: "Comment Count",
    cellRenderer: CopyCellRenderer,
  },
];

export const marketing_events = [
  { headerName: "Event ID", field: "event_id", cellRenderer: CopyCellRenderer },
  {
    headerName: "Event Type",
    field: "event_type",
    cellRenderer: CopyCellRenderer,
  },
  {
    headerName: "Customer ID",
    field: "customer_id",
    cellRenderer: CopyCellRenderer,
  },
  {
    headerName: "Customer Name",
    field: "customer_name",
    cellRenderer: CopyCellRenderer,
  },
  { headerName: "Email", field: "email", cellRenderer: CopyCellRenderer },

  {
    headerName: "Timestamp",
    field: "event_timestamp",
    cellRenderer: CopyCellRenderer,
  },
  {
    headerName: "Campaign",
    field: "campaign_name",
    cellRenderer: CopyCellRenderer,
  },
];

export const support_ticket_comments = [
  {
    field: "comment_id",
    headerName: "Comment ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "master_id",
    headerName: "Master ID (Customer)",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "ticket_id",
    headerName: "Ticket ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_id",
    headerName: "Customer ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "author_id",
    headerName: "Author ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "author_role",
    headerName: "Author Role",
    cellRenderer: CopyCellRenderer,
  },
  // { field: "created_at", headerName: "Created At" },
  // { field: "body", headerName: "Body" },
  // { field: "public", headerName: "Public" },
  // { field: "parent_theme", headerName: "Parent Theme" },
  // { field: "child_theme_cluster_name", headerName: "Child Theme Cluster Name" },
];
