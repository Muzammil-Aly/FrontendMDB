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
import { margin } from "@mui/system";
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
  {
    field: "order_date",
    headerName: "Order Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_no",
    headerName: "Customer No",
    cellRenderer: CopyCellRenderer,
  },
  { field: "order_id", headerName: "Order ID", cellRenderer: CopyCellRenderer },

  {
    field: "customer_reference_no",
    headerName: "Customer Reference No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_name",
    headerName: "Customer Name",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "order_status",
    headerName: "Order Status",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "release_error",
    headerName: "Release Error",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "psi_number",
    headerName: "PSI Number",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "total_value",
    headerName: "Total Order Value",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "redo",
    headerName: "Redo",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "extend",
    headerName: "Extend",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "shipping_address",
    headerName: "Shipping Address",
    cellRenderer: CopyCellRenderer,
  },
  { field: "phone_no", headerName: "Phone No", cellRenderer: CopyCellRenderer },
  {
    field: "customer_email",
    headerName: "Email",
    cellRenderer: CopyCellRenderer,
  },
  { field: "retailer", headerName: "Retailer", cellRenderer: CopyCellRenderer },
  {
    field: "rma_status",
    headerName: "RMA Status",
    cellRenderer: CopyCellRenderer,
  },

  {
    field: "receive",
    headerName: "Receive",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_id",
    headerName: "Customer ID",
    cellRenderer: CopyCellRenderer,
  },
  // {
  //   field: "fulfillment_status",
  //   headerName: "Fulfillment Status",
  //   cellRenderer: CopyCellRenderer,
  // },
  // { field: "tracking", headerName: "Tracking", cellRenderer: CopyCellRenderer },

  // {
  //   field: "profit_name",
  //   headerName: "Profit Name",
  //   cellRenderer: CopyCellRenderer,
  // },

  // { field: "discount_code", headerName: "Discount Code" },

  // {
  //   field: "order_url",
  //   headerName: "Order URL",
  //   cellRenderer: CopyCellRenderer,
  //   suppressClickEdit: true, // ⛔ stops grid from reacting to clicks
  //   suppressNavigable: true, // ⛔ avoids keyboard focus behavior
  // },

  // {
  //   field: "shipping_zip_code",
  //   headerName: "Shipping Zip Code",
  //   cellRenderer: CopyCellRenderer,
  // },

  // { field: "channel", headerName: "Channel", cellRenderer: CopyCellRenderer },
];

export const orderItems = [
  { field: "sku", headerName: "SKU", cellRenderer: CopyCellRenderer },
  { field: "lot_no", headerName: "Lot No", cellRenderer: CopyCellRenderer },
  {
    field: "product_name",
    headerName: "Product Name",
    cellRenderer: CopyCellRenderer,
  },
  { field: "quantity", headerName: "Quantity", cellRenderer: CopyCellRenderer },
  { field: "tracking", headerName: "Tracking", cellRenderer: CopyCellRenderer },
  {
    field: "fulfillment_status",
    headerName: "Fulfillment Status",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "bol",
    headerName: "BOL",
    cellRenderer: CopyCellRenderer,
  },
  // {
  //   field: "line_no",
  //   headerName: "Order Item ID",
  //   cellRenderer: CopyCellRenderer,
  // },

  // { field: "order_id", headerName: "Order ID" },

  {
    field: "amount",
    headerName: "Gross Amount",
    cellRenderer: CopyCellRenderer,
  },
  // {
  //   field: "item_type",
  //   headerName: "Item Type",
  //   cellRenderer: CopyCellRenderer,
  // },
  // { field: "brand", headerName: "Brand", cellRenderer: CopyCellRenderer },
  // {
  //   field: "collection",
  //   headerName: "Collection",
  //   cellRenderer: CopyCellRenderer,
  // },
];

export const ZPartETA = [
  {
    field: "document_no",
    headerName: "Document No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "external_document_no",
    headerName: "External Document No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "no",
    headerName: "Item No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "associated_whole_unit",
    headerName: "Associated Whole Unit",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "description",
    headerName: "Description",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "alternative_status",
    headerName: "Status",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_no",
    headerName: "Customer No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "order_date",
    headerName: "Order Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "sales_order_aging_days",
    headerName: "Order Aging (Days)",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "earliest_eta",
    headerName: "Earliest ETA",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "earliest_eta_to_rex",
    headerName: "ETA to REX",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "earliest_eta_to_unga",
    headerName: "ETA to UNGA",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "earliest_eta_to_unnj",
    headerName: "ETA to UNNJ",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "earliest_eta_to_ggtj",
    headerName: "ETA to GGTJ",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "Days to Earliest ETA",
    headerName: "Days to Earliest ETA",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "Days to Rex ETA",
    headerName: "Days to Rex ETA",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "qty",
    headerName: "Quantity",
    cellRenderer: CopyCellRenderer,
  },
];

export const Returns = [
  { field: "rma", headerName: "RMA No", cellRenderer: CopyCellRenderer },
  {
    field: "customer_id",
    headerName: "Customer ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "sell_to_customer_no",
    headerName: "Customer No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "sell_to_customer_name",
    headerName: "Customer Name",
    cellRenderer: CopyCellRenderer,
  },
  { field: "item", headerName: "Item No", cellRenderer: CopyCellRenderer },
  {
    field: "description",
    headerName: "Description",
    cellRenderer: CopyCellRenderer,
  },
  { field: "status", headerName: "Status", cellRenderer: CopyCellRenderer },
  { field: "quantity", headerName: "Quantity", cellRenderer: CopyCellRenderer },
  {
    field: "line_amount",
    headerName: "Line Amount",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "return_reason_code",
    headerName: "Return Reason Code",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "return_reason",
    headerName: "Return Reason",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "return_shipment_status",
    headerName: "Return Shipment Status",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "tracking_no",
    headerName: "Tracking No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "carrier_name",
    headerName: "Carrier Name",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "deliverydate",
    headerName: "Delivery Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "pickupdate",
    headerName: "Pickup Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "pickupcontactname",
    headerName: "Pickup Contact",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "your_reference",
    headerName: "Your Reference",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "shopify_refund_date",
    headerName: "Shopify Refund Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "shopify_refund_quantity",
    headerName: "Refund Qty",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "shopify_refund_subtotal",
    headerName: "Refund Subtotal",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "shopify_refund_tax",
    headerName: "Refund Tax",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "shopify_refund_note",
    headerName: "Refund Note",
    cellRenderer: CopyCellRenderer,
  },
];

export const Refunds = [
  {
    field: "doc_no_",
    headerName: "Document No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "doc_type",
    headerName: "Document Type",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "external_document_no_",
    headerName: "External Document No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "customer_id",
    headerName: "Customer ID",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "sell_to_customer_no_",
    headerName: "Customer No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "profit_name",
    headerName: "Profit Name",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "created_date",
    headerName: "Created Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "order_date",
    headerName: "Order Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "posting_date",
    headerName: "Posting Date",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "doc_status",
    headerName: "Document Status",
    cellRenderer: CopyCellRenderer,
  },
  { field: "item_no", headerName: "Item No", cellRenderer: CopyCellRenderer },
  {
    field: "description",
    headerName: "Description",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "description_2",
    headerName: "Description 2",
    cellRenderer: CopyCellRenderer,
  },
  { field: "qty_", headerName: "Quantity", cellRenderer: CopyCellRenderer },
  {
    field: "gross_amount",
    headerName: "Gross Amount",
    cellRenderer: CopyCellRenderer,
  },
  { field: "amt_", headerName: "Amount", cellRenderer: CopyCellRenderer },
  {
    field: "entered_by",
    headerName: "Entered By",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "return_reason_code",
    headerName: "Return Reason Code",
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

export const touchups_columns = [
  // {
  //   field: "order_id",
  //   headerName: "Order ID",
  //   cellRenderer: CopyCellRenderer,
  // },
  {
    field: "lot_no",
    headerName: "Lot No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "sku",
    headerName: "SKU",
    cellRenderer: CopyCellRenderer,
  },
  // {
  //   field: "customer_id",
  //   headerName: "Customer ID",
  //   cellRenderer: CopyCellRenderer,
  // },
  {
    field: "parts_item_no",
    headerName: "Parts Item No",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "parts_item_name",
    headerName: "Parts Item Name",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "parts_item_name_2",
    headerName: "Parts Item Name 2",
    cellRenderer: CopyCellRenderer,
  },
  // {
  //   field: "touchup_pen_item_no",
  //   headerName: "Touchup Pen Item No",
  //   cellRenderer: CopyCellRenderer,
  // },
  // {
  //   field: "touchup_pen_item_name",
  //   headerName: "Touchup Pen Item Name",
  //   cellRenderer: CopyCellRenderer,
  // },
  {
    field: "brand",
    headerName: "Brand",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "parts_version",
    headerName: "Parts Version",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "color_slug",
    headerName: "Color Slug",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "color_name",
    headerName: "Color Name",
    cellRenderer: CopyCellRenderer,
  },
];

export const touchups_pens = [
  {
    field: "ItemNum",
    headerName: "Item Number",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "ItemName",
    headerName: "Item Name",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "ItemName2",
    headerName: "Item Name 2",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "Colorslug",
    headerName: "Color Slug",
    cellRenderer: CopyCellRenderer,
  },

  {
    field: "ColorName",
    headerName: "Color Name",
    cellRenderer: CopyCellRenderer,
  },
  {
    field: "QtyAvailable",
    headerName: "Qty Available",
    cellRenderer: CopyCellRenderer,
  },
];

// export const inventory_columns = [
//   {
//     field: "Location Code",
//     headerName: "Location Code",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "Item No",
//     headerName: "Item No",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "Description",
//     headerName: "Description",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "qty_",
//     headerName: "Quantity",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "eta",
//     headerName: "ETA",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "qty_available",
//     headerName: "Qty Available",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "avail_qty_on_hand",
//     headerName: "Avail Qty on Hand",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "avail_qty_to_commit",
//     headerName: "Avail Qty to Commit",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "Qty_ on Blocked Lot_Bin",
//     headerName: "Qty on Blocked Lot/Bin",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     headerName: "Qty on SO",
//     field: "qty_on_so",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     headerName: "Life Cycle Status",
//     field: "life_cycle_status_code",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     headerName: "Qty on PO",
//     field: "qty_on_po",
//     cellRenderer: CopyCellRenderer,
//   },
// ];
// export const inventory_columns = [
//   {
//     field: "location_code",
//     headerName: "Location Code",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "item_no",
//     headerName: "Item No",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "description",
//     headerName: "Description",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "qty",
//     headerName: "Quantity",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "eta",
//     headerName: "ETA",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "qty_available",
//     headerName: "Qty Available",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "avail_qty_on_hand",
//     headerName: "Avail Qty on Hand",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "avail_qty_to_commit",
//     headerName: "Avail Qty to Commit",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "qty_on_blocked_lot_bin",
//     headerName: "Qty on Blocked Lot/Bin",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "qty_on_so",
//     headerName: "Qty on SO",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "life_cycle_status_code",
//     headerName: "Life Cycle Status",
//     cellRenderer: CopyCellRenderer,
//   },
//   {
//     field: "qty_on_po",
//     headerName: "Qty on PO",
//     cellRenderer: CopyCellRenderer,
//   },
// ];
// columns base: fields must match row object keys
// export const inventory_columns = [
//   {
//     field: "location_code",
//     headerName: "Location Code",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 150,
//   },
//   {
//     field: "item_no",
//     headerName: "Item No",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 150,
//   },
//   {
//     field: "description",
//     headerName: "Description",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 250,
//     autoHeight: true,
//   },
//   {
//     field: "qty",
//     headerName: "Quantity",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 120,
//   },
//   {
//     field: "eta",
//     headerName: "ETA",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 140,
//   },
//   {
//     field: "qty_available",
//     headerName: "Qty Available",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 160,
//   },
//   {
//     field: "avail_qty_on_hand",
//     headerName: "Avail Qty on Hand",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 180,
//   },
//   {
//     field: "avail_qty_to_commit",
//     headerName: "Avail Qty to Commit",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 200,
//   },
//   {
//     field: "qty_on_blocked_lot_bin",
//     headerName: "Qty on Blocked Lot/Bin",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 220,
//   },
//   {
//     field: "qty_on_so",
//     headerName: "Qty on SO",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 160,
//   },
//   {
//     field: "life_cycle_status_code",
//     headerName: "Life Cycle Status",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 180,
//   },
//   {
//     field: "qty_on_po",
//     headerName: "Qty on PO",
//     cellRenderer: CopyCellRenderer,
//     flex: 1,
//     minWidth: 160,
//   },
// ];

// 👇 This small helper makes certain cells clickable

// export const ClickableCellRenderer =
//   (
//     onClick: (type: "qty" | "so" | "po", data: any) => void,
//     type: "qty" | "so" | "po"
//   ) =>
//   (params: any) =>
//     (
//       <span
//         style={{
//           color:
//             type === "qty"
//               ? "#1976d2" // blue for qty
//               : type === "so"
//               ? "#9c27b0" // purple for so
//               : "#2e7d32", // green for po
//           cursor: "pointer",
//           textDecoration: "underline",
//         }}
//         onClick={(e) => {
//           e.stopPropagation(); // stop triggering row click
//           onClick(type, params.data); // call parent handler
//         }}
//       >
//         {params.value ?? "-"}
//       </span>
//     );

// export const ClickableCellRenderer = (
//   onClick: (type: "qty" | "so" | "po", data: any) => void,
//   type: "qty" | "so" | "po"
// ) => {
//   const Renderer = (params: any) => (
//     <span
//       style={{
//         color:
//           type === "qty"
//             ? "#1976d2" // blue for qty
//             : type === "so"
//             ? "#9c27b0" // purple for so
//             : "#2e7d32", // green for po
//         cursor: "pointer",
//         textDecoration: "underline",
//       }}
//       onClick={(e) => {
//         e.stopPropagation(); // stop triggering row click
//         onClick(type, params.data); // call parent handler
//       }}
//     >
//       {params.value ?? "-"}
//     </span>
//   );

//   // ✅ Give it a display name for ESLint
//   Renderer.displayName = `ClickableCellRenderer_${type}`;

//   return Renderer;
// };

// export const ClickableCellRenderer =
//   (
//     onClick: (type: "qty" | "so" | "po", data: any) => void,
//     type: "qty" | "so" | "po",
//     loadingType?: "qty" | "so" | "po" | null
//   ) =>
//   (params: any) =>
//     (
//       <span
//         style={{
//           color:
//             type === "qty" ? "#1976d2" : type === "so" ? "#2e7d32" : "#9c27b0",
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//         onClick={() => onClick(type, params.data)}
//       >
//         {loadingType === type ? (
//           <span
//             className="loader"
//             style={{
//               display: "inline-block",
//               width: 14,
//               height: 14,
//               border: "2px solid #ccc",
//               borderTop: "2px solid currentColor",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//             }}
//           />
//         ) : (
//           params.value
//         )}
//       </span>
//     );

export const ClickableCellRenderer = (
  onClick: (type: "qty" | "so" | "po", data: any) => void,
  type: "qty" | "so" | "po",
  loadingType?: "qty" | "so" | "po" | null
) => {
  const Renderer = (params: any) => (
    <span
      style={{
        color:
          type === "qty" ? "#1976d2" : type === "so" ? "#2e7d32" : "#9c27b0",
        cursor: "pointer",
        fontWeight: "bold",
      }}
      onClick={() => onClick(type, params.data)}
    >
      {loadingType === type ? (
        <span
          className="loader"
          style={{
            display: "inline-block",
            width: 14,
            height: 14,
            border: "2px solid #ccc",
            borderTop: "2px solid currentColor",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      ) : (
        params.value
      )}
    </span>
  );

  Renderer.displayName = `ClickableCellRenderer_${type}`; //  add this

  return Renderer;
};

// 👇\ now accepts a click handler for qty, so, and po
export const inventory_columns = (
  onCellClick: (type: "qty" | "so" | "po", data: any) => void
) => [
  {
    field: "location_code",
    headerName: "Location Code",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "item_no",
    headerName: "Item No",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "description",
    headerName: "Description",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 250,
    // autoHeight: true,
  },
  {
    field: "life_cycle_status_code",
    headerName: "Life Cycle Status",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 180,
  },
  {
    field: "qty_on_so",
    headerName: "Qty on SO",
    cellRenderer: ClickableCellRenderer(onCellClick, "so"),
    flex: 1,
    minWidth: 160,
  },

  {
    field: "qty_on_po",
    headerName: "Qty on PO",
    cellRenderer: ClickableCellRenderer(onCellClick, "po"),
    flex: 1,
    minWidth: 160,
  },
  {
    field: "qty",
    headerName: "Quantity",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 120,
  },
  {
    field: "eta",
    headerName: "ETA",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 140,
  },
  {
    field: "qty_available",
    headerName: "Qty Available",
    cellRenderer: ClickableCellRenderer(onCellClick, "qty"),
    flex: 1,
    minWidth: 160,
  },

  {
    field: "avail_qty_on_hand",
    headerName: "Avail Qty on Hand",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 180,
  },
  {
    field: "avail_qty_to_commit",
    headerName: "Avail Qty to Commit",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "qty_on_blocked_lot_bin",
    headerName: "Qty on Blocked Lot/Bin",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 220,
  },
];

export const sales_orders = [
  {
    field: "document_no",
    headerName: "Document No",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "location_code",
    headerName: "Location Code",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "item_no",
    headerName: "Item No",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "customer_name",
    headerName: "Customer Name",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "qty",
    headerName: "Quantity",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "qty_commited",
    headerName: "Quantity Committed",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
];
export const purchase_orders = [
  {
    field: "location_code",
    headerName: "Location Code",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "item_no",
    headerName: "Item No",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },

  {
    field: "shipment_status",
    headerName: "Shipment Status",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "expected_receipt_date",
    headerName: "Expected Receipt Date",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "qty_on_po",
    headerName: "Quantity on PO",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 200,
  },
];

export const qty_one = [
  {
    field: "item_no",
    headerName: "Item No",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "location_code",
    headerName: "Location Code",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "test_quality",
    headerName: "Test Quality",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "lot_no",
    headerName: "Lot No",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 180,
  },
  {
    field: "blocked",
    headerName: "Blocked",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 120,
  },
  {
    field: "total_qty",
    headerName: "Total Quantity",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "parts_version",
    headerName: "Parts Version",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
];

export const qty_two = [
  {
    field: "item_no",
    headerName: "Item No",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "description",
    headerName: "Description",
    cellRenderer: CopyCellRenderer,
    flex: 2,
    minWidth: 220,
  },
  {
    field: "description_2",
    headerName: "Description 2",
    cellRenderer: CopyCellRenderer,
    flex: 2,
    minWidth: 220,
  },
  {
    field: "location_code",
    headerName: "Location Code",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "zone_code",
    headerName: "Zone Code",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  // bin_code
  {
    field: "bin_code",
    headerName: "Bin Code",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "lot_no",
    headerName: "Lot No",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 180,
  },
  {
    field: "total_qty",
    headerName: "Total Quantity",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "parts_version",
    headerName: "Parts Version",
    cellRenderer: CopyCellRenderer,
    flex: 1,
    minWidth: 150,
  },
];
