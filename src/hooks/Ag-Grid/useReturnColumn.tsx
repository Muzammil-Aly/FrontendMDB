"use client";

import { useMemo } from "react";
import { Box } from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";

export interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<ICellRendererParams>;
  width?: number;
  flex?: number;
}

const StatusCell = ({ value }: { value: string }) => {
  const status = value?.toLowerCase();

  const styles = {
    completed: { bgcolor: "#E0F8E9", color: "#299438" },
    open: { bgcolor: "#FFF4E5", color: "#B26A00" },
    pending: { bgcolor: "#E3E8EB", color: "#68717D" },
    default: { bgcolor: "#E3E8EB", color: "#68717D" },
  };

  const style = styles[status as keyof typeof styles] || styles.default;

  return (
    <Box
      sx={{
        ...style,
        fontWeight: 600,
        borderRadius: "12px",
        padding: "4px 12px",
        textTransform: "uppercase",
        fontSize: 13,
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {value || "-"}
    </Box>
  );
};

const useReturnColumn = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "rma":
          return {
            ...col,
            headerName: "RMA No",
            flex: 1.2,
            minWidth: 160,
          };

        case "customer_id":
          return {
            ...col,
            headerName: "Customer ID",
            flex: 1,
            minWidth: 140,
          };

        case "sell_to_customer_no":
          return {
            ...col,
            headerName: "Customer No",
            flex: 1,
            minWidth: 140,
          };

        case "sell_to_customer_name":
          return {
            ...col,
            headerName: "Customer Name",
            flex: 1.5,
            minWidth: 200,
          };

        case "item":
          return {
            ...col,
            headerName: "Item No",
            flex: 1,
            minWidth: 160,
          };

        case "description":
          return {
            ...col,
            headerName: "Description",
            flex: 1.5,
            minWidth: 240,
          };

        case "status":
          return {
            ...col,
            headerName: "Status",
            cellRenderer: (params: any) => <StatusCell value={params.value} />,
            flex: 1,
            minWidth: 140,
          };

        case "quantity":
          return {
            ...col,
            headerName: "Quantity",
            flex: 0.8,
            minWidth: 120,
            cellStyle: { textAlign: "right", fontWeight: "600" },
          };

        case "line_amount":
          return {
            ...col,
            headerName: "Line Amount",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "right" },
            valueFormatter: (params: any) =>
              params.value ? `$${params.value.toFixed(2)}` : "-",
          };

        case "return_reason_code":
          return {
            ...col,
            headerName: "Return Reason Code",
            flex: 1,
            minWidth: 160,
          };

        case "return_reason":
          return {
            ...col,
            headerName: "Return Reason",
            flex: 1.2,
            minWidth: 180,
          };

        case "return_shipment_status":
          return {
            ...col,
            headerName: "Return Shipment Status",
            flex: 1.2,
            minWidth: 180,
            cellRenderer: (params: any) => <StatusCell value={params.value} />,
          };

        case "tracking_no":
          return {
            ...col,
            headerName: "Tracking No",
            flex: 1,
            minWidth: 160,
          };

        case "carrier_name":
          return {
            ...col,
            headerName: "Carrier Name",
            flex: 1,
            minWidth: 160,
          };

        case "deliverydate":
          return {
            ...col,
            headerName: "Delivery Date",
            flex: 1,
            minWidth: 160,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "pickupdate":
          return {
            ...col,
            headerName: "Pickup Date",
            flex: 1,
            minWidth: 160,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "pickupcontactname":
          return {
            ...col,
            headerName: "Pickup Contact",
            flex: 1,
            minWidth: 160,
          };

        case "your_reference":
          return {
            ...col,
            headerName: "Your Reference",
            flex: 1,
            minWidth: 160,
          };

        case "shopify_refund_date":
          return {
            ...col,
            headerName: "Shopify Refund Date",
            flex: 1,
            minWidth: 160,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "shopify_refund_quantity":
          return {
            ...col,
            headerName: "Refund Qty",
            flex: 0.8,
            minWidth: 120,
            cellStyle: { textAlign: "right" },
          };

        case "shopify_refund_subtotal":
          return {
            ...col,
            headerName: "Refund Subtotal",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "right" },
            valueFormatter: (params: any) =>
              params.value ? `$${params.value.toFixed(2)}` : "-",
          };

        case "shopify_refund_tax":
          return {
            ...col,
            headerName: "Refund Tax",
            flex: 1,
            minWidth: 120,
            cellStyle: { textAlign: "right" },
            valueFormatter: (params: any) =>
              params.value ? `$${params.value.toFixed(2)}` : "-",
          };

        case "shopify_refund_note":
          return {
            ...col,
            headerName: "Refund Note",
            flex: 1.5,
            minWidth: 200,
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};

export default useReturnColumn;
