import CustomButton from "@/components/Common/CustomButton";
import { ICellRendererParams, ValidationModule } from "ag-grid-community";
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

const useOrderItems = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "line_no":
          return {
            ...col,
            headerName: "Order Item ID",
            flex: 1,
            minWidth: 150,
          };

        // case "order_id":
        //   return {
        //     ...col,
        //     headerName: "Order ID",
        //     flex: 1,
        //     minWidth: 150,
        //   };

        case "sku":
          return {
            ...col,
            headerName: "SKU",
            flex: 1,
            minWidth: 140,
          };

        case "product_name":
          return {
            ...col,
            headerName: "Product Name",
            flex: 1.5,
            minWidth: 220,
          };

        case "item_type":
          return {
            ...col,
            headerName: "Item Type",
            flex: 1,
            minWidth: 220,
            valueGetter: (params: any) => params.data.item_type || "-",
          };

        case "brand":
          return {
            ...col,
            headerName: "Brand",
            flex: 1,
            minWidth: 140,
            valueGetter: (params: any) => params.data.brand || "-",
          };

        case "collection":
          return {
            ...col,
            headerName: "Collection",
            flex: 1,
            minWidth: 140,
            valueGetter: (params: any) => params.data.collection || "-",
          };

        case "quantity":
          return {
            ...col,
            headerName: "Quantity",
            flex: 0.8,
            minWidth: 110,
            cellStyle: { textAlign: "right", fontWeight: "600" },
          };

        case "amount":
          return {
            ...col,
            headerName: "Gross Amount",
            flex: 1,
            minWidth: 160,
            cellStyle: { textAlign: "right", fontWeight: "600" },
            valueFormatter: (params: any) =>
              params.value !== null && params.value !== undefined
                ? `$${Number(params.value).toFixed(2)}`
                : "-",
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};

export default useOrderItems;
