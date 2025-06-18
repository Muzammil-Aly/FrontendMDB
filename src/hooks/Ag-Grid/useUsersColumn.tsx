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

const useUsersColumn = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "name":
          return {
            ...col,
            headerName: "Name",
            flex: 1,
            width: 300,
            cellRenderer: (params: ICellRendererParams) => (
              <AvatarCell value={params.value} />
            ),
          };
        case "email":
          return { ...col, headerName: "Email", flex: 1 };
        case "order_history":
          return { ...col, headerName: "Order History", width: 140 };
        case "least_active":
          return { ...col, headerName: "Last Active", flex: 1.2 };
        case "store":
          return { ...col, headerName: "Store", flex: 1.2 };
        case "status":
          return {
            ...col,
            headerName: "Status",
            width: 130,
            cellRenderer: (params: ICellRendererParams) => (
              <StatusCell value={params.value} />
            ),
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useUsersColumn;
