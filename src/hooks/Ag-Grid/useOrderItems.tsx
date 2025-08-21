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

const useOrderItems = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "order_item_id":
          return { ...col, headerName: "Order Item ID", flex: 1, minWidth: 150 };

        case "order_id":
          return { ...col, headerName: "Order ID", flex: 1, minWidth: 150 };

        case "sku":
          return { ...col, headerName: "SKU", flex: 1, minWidth: 140 };

        case "product_name":
          return {
            ...col,
            headerName: "Product Name",
            flex: 1.5,
            minWidth: 220,
            cellRenderer: (params: ICellRendererParams) => (
              <AvatarCell value={params.value} />
            ),
          };

        case "quantity":
          return {
            ...col,
            headerName: "Quantity",
            flex: 0.8,
            minWidth: 100,
            cellStyle: { textAlign: "right", fontWeight: 600 },
          };

        case "gross_amount":
          return {
            ...col,
            headerName: "Gross Amount",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "right", fontWeight: 600 },
            valueFormatter: (params: any) =>
              params.value ? `$${Number(params.value).toFixed(2)}` : "-",
          };

        case "item_type":
          return { ...col, headerName: "Item Type", flex: 1, minWidth: 140 };

        case "brand":
          return { ...col, headerName: "Brand", flex: 1, minWidth: 140 };

        case "collection":
          return { ...col, headerName: "Collection", flex: 1, minWidth: 140 };

        default:
          return { ...col, flex: 1, minWidth: 120 }; // fallback
      }
    });
  }, [columns]);
};


export default useOrderItems;
