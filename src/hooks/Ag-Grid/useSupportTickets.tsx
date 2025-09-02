import CustomButton from "@/components/Common/CustomButton";
import { ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";
import { Avatar, Box, Typography } from "@mui/material";

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
    subscribed: {
      bgcolor: "#E0F8E9",
      color: "#299438",
    },
    unsubscribed: {
      bgcolor: "#FFF4E5",
      color: "#B26A00",
    },
    never_subscribed: {
      bgcolor: "#FDECEA",
      color: "#D32F2F",
    },
    default: {
      bgcolor: "#E3E8EB",
      color: "#68717D",
    },
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
      {value}
    </Box>
  );
};

const useSupportTicket = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "ticket_id":
          return { ...col, headerName: "Ticket ID", flex: 1, minWidth: 150 };

        case "customer_id":
          return {
            ...col,
            headerName: "Customer ID",
            flex: 1.2,
            minWidth: 200,
          };
        case "email":
          return { ...col, headerName: "Email", minWidth: 150 };
        case "phone_no":
          return { ...col, headerName: "Phone", minWidth: 150 };
        case "customer_name":
          return { ...col, headerName: "Customer Name", minWidth: 150 };

        case "created_at":
          return {
            ...col,
            headerName: "Created At",
            flex: 1,
            minWidth: 160,
          };

        case "resolved_at":
          return {
            ...col,
            headerName: "Resolved At",
            flex: 1,
            minWidth: 160,
          };

        case "status":
          return {
            ...col,
            headerName: "Status",
            flex: 1,
            minWidth: 130,
          };

        case "channel":
          return { ...col, headerName: "Channel", flex: 1, minWidth: 140 };

        case "tags":
          return {
            ...col,
            headerName: "Tags",
            flex: 1.5,
            minWidth: 200,
            valueFormatter: (params: any) => params.value || "-", // plain string now
          };

        case "csat_score":
          return {
            ...col,
            headerName: "CSAT Score",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "center", fontWeight: 600 },
            valueFormatter: (params: any) =>
              params.value !== null ? params.value : "-",
          };

        case "sentiment_score":
          return {
            ...col,
            headerName: "Sentiment Score",
            flex: 1,
            minWidth: 160,
            cellStyle: { textAlign: "center", fontWeight: 600 },
            valueFormatter: (params: any) =>
              params.value !== null ? params.value : "-",
          };

        case "last_comment_at":
          return {
            ...col,
            headerName: "Last Comment At",
            flex: 1,
            minWidth: 180,
            valueFormatter: (params: any) => params.value || "-",
          };

        case "comment_count":
          return {
            ...col,
            headerName: "Comment Count",
            flex: 1,
            minWidth: 160,
            cellStyle: { textAlign: "right", fontWeight: 600 },
            valueFormatter: (params: any) =>
              params.value !== null ? params.value : "0",
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};

export default useSupportTicket;
