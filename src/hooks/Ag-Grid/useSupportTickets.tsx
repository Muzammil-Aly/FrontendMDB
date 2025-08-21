
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

const AvatarCell = ({ value }: { value: string }) => {
  if (!value) return null;
  const initials = value
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        sx={{
          bgcolor: "#D9D9D9",
          color: "#555",
          fontWeight: "bold",
          fontSize: 14,
          width: 36,
          height: 36,
        }}
        aria-label={value}
      >
        {initials}
      </Avatar>
      <Typography sx={{ fontWeight: 600, textTransform: "capitalize" }}>
        {value}
      </Typography>
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
            headerName: "Customer",
            flex: 1.2,
            minWidth: 200,
            cellRenderer: (params: ICellRendererParams) => (
              <AvatarCell value={params.value} />
            ),
          };

        case "created_at":
          return { ...col, headerName: "Created At", flex: 1, minWidth: 160 };

        case "resolved_at":
          return { ...col, headerName: "Resolved At", flex: 1, minWidth: 160 };

        case "status":
          return {
            ...col,
            headerName: "Status",
            flex: 1,
            minWidth: 130,
            cellRenderer: (params: ICellRendererParams) => (
              <StatusCell value={params.value} />
            ),
          };

        case "channel":
          return { ...col, headerName: "Channel", flex: 1, minWidth: 140 };

        case "tags":
          return {
            ...col,
            headerName: "Tags",
            flex: 1.5,
            minWidth: 200,
            valueFormatter: (params: any) =>
              Array.isArray(params.value) ? params.value.join(", ") : params.value,
          };

        case "csat_score":
          return {
            ...col,
            headerName: "CSAT Score",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "center", fontWeight: 600 },
          };

        case "sentiment_score":
          return {
            ...col,
            headerName: "Sentiment Score",
            flex: 1,
            minWidth: 160,
            cellStyle: { textAlign: "center", fontWeight: 600 },
          };

        case "last_comment_at":
          return {
            ...col,
            headerName: "Last Comment At",
            flex: 1,
            minWidth: 180,
          };

        case "comment_count":
          return {
            ...col,
            headerName: "Comment Count",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "right", fontWeight: 600 },
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};

export default useSupportTicket;