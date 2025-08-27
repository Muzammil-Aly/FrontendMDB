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

const useUsersColumn = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "customer_id":
          return { ...col, headerName: "Customer ID", minWidth: 100 };
        case "email":
          return { ...col, headerName: "Email", minWidth: 200 };
        case "phone":
          return { ...col, headerName: "Phone", minWidth: 140 };
        case "full_name":
          return { ...col, headerName: "Full Name", minWidth: 200 };
        case "source":
          return { ...col, headerName: "Source", minWidth: 150 };
        case "join_type":
          return { ...col, headerName: "Join Type", minWidth: 150 };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useUsersColumn;
