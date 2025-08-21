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

const useOrdersColumn = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "order_id":
          return { ...col, headerName: "Order ID", width: 150 };
        case "customer_id":
          return {
            ...col,
            headerName: "Customer",
            flex: 1,
            width: 250,
            cellRenderer: (params: ICellRendererParams) => (
              <AvatarCell value={params.value} />
            ),
          };
        case "order_date":
          return { ...col, headerName: "Order Date", width: 160 };
        case "total_value":
          return { ...col, headerName: "Total Value", width: 140 };
        case "discount_code":
          return { ...col, headerName: "Discount Code", width: 160 };
        case "fulfillment_status":
          return {
            ...col,
            headerName: "Fulfillment Status",
            width: 180,
            cellRenderer: (params: ICellRendererParams) => (
              <StatusCell value={params.value} />
            ),
          };
        case "shipping_address":
          return { ...col, headerName: "Shipping Address", flex: 1.5 };
        case "channel":
          return { ...col, headerName: "Channel", width: 140 };
        // case "is_returned":
        //   return {
        //     ...col,
        //     headerName: "Returned?",
        //     width: 120,
        //     cellRenderer: (params: ICellRendererParams) => (
        //       <Box sx={{ fontWeight: 600 }}>
        //         {params.value ? "Yes" : "No"}
        //       </Box>
        //     ),
        //   };
        // case "return_amount":
        //   return { ...col, headerName: "Return Amount", width: 160 };
        // case "net_order_value":
        //   return { ...col, headerName: "Net Order Value",  width: 180 };
        default:
          return col;
      }
    });
  }, [columns]);
};
export default useOrdersColumn;
