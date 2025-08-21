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

const useSupportTicketCommentColumn = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "comment_id":
          return { ...col, headerName: "Comment ID", width: 150 };

        case "master_id":
          return {
            ...col,
            headerName: "Master ID (Customer)",
            width: 180,
          };

        case "ticket_id":
          return { ...col, headerName: "Ticket ID", width: 150 };

        case "customer_id":
          return {
            ...col,
            headerName: "Customer ID",
            width: 180,
            cellRenderer: (params: ICellRendererParams) => (
              <AvatarCell value={params.value} />
            ),
          };

        case "author_id":
          return { ...col, headerName: "Author ID", width: 150 };

        case "author_role":
          return {
            ...col,
            headerName: "Author Role",
            width: 150,
            cellRenderer: (params: ICellRendererParams) => (
              <StatusCell value={params.value} />
            ),
          };

        case "created_at":
          return { ...col, headerName: "Created At", flex: 1, minWidth: 160 };

        case "body":
          return {
            ...col,
            headerName: "Body",
            flex: 2,
            minWidth: 300,
            wrapText: true,
            autoHeight: true,
          };

        case "public":
          return {
            ...col,
            headerName: "Public",
            width: 120,
            cellRenderer: (params: ICellRendererParams) => (
              <StatusCell value={params.value ? "Yes" : "No"} />
            ),
          };

        case "parent_theme":
          return { ...col, headerName: "Parent Theme", flex: 1.2, minWidth: 180 };

        case "child_theme_cluster_name":
          return {
            ...col,
            headerName: "Child Theme Cluster Name",
            flex: 1.5,
            minWidth: 200,
          };

        default:
          return col;
      }
    });
  }, [columns]);
};


export default useSupportTicketCommentColumn;
