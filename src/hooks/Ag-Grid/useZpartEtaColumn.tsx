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
    backordered: { bgcolor: "#FFF4E5", color: "#B26A00" },
    available: { bgcolor: "#E0F8E9", color: "#299438" },
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

const useZpartETA = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "document_no":
          return {
            ...col,
            headerName: "Document No",
            flex: 1.2,
            minWidth: 160,
          };

        case "external_document_no":
          return {
            ...col,
            headerName: "External Doc No",
            flex: 1,
            minWidth: 160,
          };

        case "no":
          return {
            ...col,
            headerName: "Item No",
            flex: 1,
            minWidth: 150,
          };

        case "associated_whole_unit":
          return {
            ...col,
            headerName: "Associated Whole Unit",
            flex: 1.2,
            minWidth: 200,
          };

        case "description":
          return {
            ...col,
            headerName: "Description",
            flex: 1.5,
            minWidth: 240,
          };

        case "alternative_status":
          return {
            ...col,
            headerName: "Status",
            cellRenderer: (params: any) => <StatusCell value={params.value} />,
            flex: 1,
            minWidth: 140,
          };

        case "customer_no":
          return {
            ...col,
            headerName: "Customer No",
            flex: 1,
            minWidth: 140,
          };

        case "order_date":
          return {
            ...col,
            headerName: "Order Date",
            flex: 1,
            minWidth: 140,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "sales_order_aging_days":
          return {
            ...col,
            headerName: "Order Aging (Days)",
            flex: 1,
            minWidth: 160,
            cellStyle: { textAlign: "right" },
          };

        case "earliest_eta":
          return {
            ...col,
            headerName: "Earliest ETA",
            flex: 1,
            minWidth: 160,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "earliest_eta_to_rex":
          return {
            ...col,
            headerName: "ETA to REX",
            flex: 1,
            minWidth: 160,
            valueFormatter: (params: any) =>
              params.value ? new Date(params.value).toLocaleDateString() : "-",
          };

        case "Days to Earliest ETA":
          return {
            ...col,
            headerName: "Days to Earliest ETA",
            flex: 1,
            minWidth: 180,
            cellStyle: { textAlign: "right", fontWeight: "600" },
          };

        case "Days to Rex ETA":
          return {
            ...col,
            headerName: "Days to Rex ETA",
            flex: 1,
            minWidth: 160,
            cellStyle: { textAlign: "right", fontWeight: "600" },
          };

        case "qty":
          return {
            ...col,
            headerName: "Quantity",
            flex: 0.8,
            minWidth: 120,
            cellStyle: { textAlign: "right", fontWeight: "600" },
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};

export default useZpartETA;
