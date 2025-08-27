export const users = [
  { field: "customer_id", headerName: "Customer ID" },
  { field: "email", headerName: "Email" },
  { field: "phone", headerName: "Phone" },
  { field: "full_name", headerName: "Full Name" },
  { field: "source", headerName: "Source" },
  { field: "join_type", headerName: "Join Type" },
  { field: "key", headerName: "Key" },

];


export const orders = [
  { field: "order_id", headerName: "Order ID" },
  { field: "customer_id", headerName: "Customer" },
  { field: "order_date", headerName: "Order Date" },
  { field: "total_value", headerName: "Total Value" },
  { field: "discount_code", headerName: "Discount Code" },
  { field: "profit_name", headerName: "Profit Name" },
  { field: "fulfillment_status", headerName: "Fulfillment Status" },
  { field: "shipping_address", headerName: "Shipping Address" },
  { field: "channel", headerName: "Channel" },

];


export const orderItems = [
  { field: "line_no", headerName: "Order Item ID" },
  // { field: "order_id", headerName: "Order ID" },
  { field: "sku", headerName: "SKU" },
  { field: "product_name", headerName: "Product Name" },
  { field: "quantity", headerName: "Quantity" },
  { field: "amount", headerName: "Gross Amount" },
  { field: "item_type", headerName: "Item Type" },
  { field: "brand", headerName: "Brand" },
  { field: "collection", headerName: "Collection" },
];


export const support_tickets = [
  { field: "ticket_id", headerName: "Ticket ID" },
  { field: "customer_id", headerName: "Customer ID" },
  { field: "created_at", headerName: "Created At" },
  { field: "resolved_at", headerName: "Resolved At" },
  { field: "status", headerName: "Status" },
  { field: "channel", headerName: "Channel" },
  { field: "tags", headerName: "Tags" },
  { field: "csat_score", headerName: "CSAT Score" },
  { field: "sentiment_score", headerName: "Sentiment Score" },
  { field: "last_comment_at", headerName: "Last Comment At" },
  { field: "comment_count", headerName: "Comment Count" },
];



export const marketing_events = [
  { headerName: "Event ID", field: "event_id" },
  { headerName: "Event Type", field: "event_type" },
  { headerName: "Customer ID", field: "customer_id" },
  { headerName: "Timestamp", field: "event_timestamp" },
  { headerName: "Campaign", field: "campaign_name" },
];



export const support_ticket_comments = [
  { field: "comment_id", headerName: "Comment ID" },
  { field: "master_id", headerName: "Master ID (Customer)" },
  { field: "ticket_id", headerName: "Ticket ID" },
  { field: "customer_id", headerName: "Customer ID" },
  { field: "author_id", headerName: "Author ID" },
  { field: "author_role", headerName: "Author Role" },
  // { field: "created_at", headerName: "Created At" },
  // { field: "body", headerName: "Body" },
  // { field: "public", headerName: "Public" },
  // { field: "parent_theme", headerName: "Parent Theme" },
  // { field: "child_theme_cluster_name", headerName: "Child Theme Cluster Name" },
];
