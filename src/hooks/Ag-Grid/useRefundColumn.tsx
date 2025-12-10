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
    posted: { bgcolor: "#E0F8E9", color: "#299438" },
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

const useRefundColumn = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "customer_id":
          return { ...col, headerName: "Customer ID", flex: 1, minWidth: 140 };

        case "doc_type":
          return {
            ...col,
            headerName: "Document Type",
            flex: 1,
            minWidth: 140,
          };

        case "external_document_no_":
          return {
            ...col,
            headerName: "External Document No",
            flex: 1,
            minWidth: 160,
          };

        case "doc_no_":
          return {
            ...col,
            headerName: "Document No",
            flex: 1.2,
            minWidth: 160,
          };

        case "sell_to_customer_no_":
          return { ...col, headerName: "Customer No", flex: 1, minWidth: 140 };

        case "profit_name":
          return {
            ...col,
            headerName: "Profit Name",
            flex: 1.5,
            minWidth: 200,
          };

        case "created_date":
          return {
            ...col,
            headerName: "Created Date",
            flex: 1,
            minWidth: 160,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "order_date":
          return {
            ...col,
            headerName: "Order Date",
            flex: 1,
            minWidth: 160,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "posting_date":
          return {
            ...col,
            headerName: "Posting Date",
            flex: 1,
            minWidth: 160,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "doc_status":
          return {
            ...col,
            headerName: "Document Status",
            cellRenderer: (params: any) => <StatusCell value={params.value} />,
            flex: 1,
            minWidth: 140,
          };

        case "item_no":
          return { ...col, headerName: "Item No", flex: 1, minWidth: 160 };

        case "description":
          return {
            ...col,
            headerName: "Description",
            flex: 1.5,
            minWidth: 240,
          };

        case "description_2":
          return {
            ...col,
            headerName: "Description 2",
            flex: 1.5,
            minWidth: 240,
          };

        case "qty_":
          return {
            ...col,
            headerName: "Quantity",
            flex: 0.8,
            minWidth: 120,
            cellStyle: { textAlign: "right", fontWeight: "600" },
          };

        case "gross_amount":
          return {
            ...col,
            headerName: "Gross Amount",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "right" },
            valueFormatter: (params: any) =>
              params.value ? `$${params.value.toFixed(2)}` : "-",
          };

        case "amt_":
          return {
            ...col,
            headerName: "Amount",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "right" },
            valueFormatter: (params: any) =>
              params.value ? `$${params.value.toFixed(2)}` : "-",
          };

        case "entered_by":
          return { ...col, headerName: "Entered By", flex: 1, minWidth: 160 };

        case "return_reason_code":
          return {
            ...col,
            headerName: "Return Reason Code",
            flex: 1,
            minWidth: 160,
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};

export default useRefundColumn;
