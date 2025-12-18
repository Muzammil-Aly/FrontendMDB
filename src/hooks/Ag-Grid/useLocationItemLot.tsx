import { useMemo } from "react";
import { Box } from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";

export interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<ICellRendererParams>;
  width?: number;
  flex?: number;
  sku?: any;
}

const useLocationItemLot = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "sku":
          return {
            ...col,
            headerName: "SKU",
            flex: 1,
            minWidth: 140,
          };

        case "parts_item_no":
          return {
            ...col,
            headerName: "Parts Item No",
            flex: 1.2,
            minWidth: 180,
          };

        case "parts_item_name":
          return {
            ...col,
            headerName: "Parts Item Name",
            flex: 1.5,
            minWidth: 200,
          };

        case "parts_item_name_2":
          return {
            ...col,
            headerName: "Parts Item Name 2",
            flex: 1.2,
            minWidth: 180,
          };

        case "potential_qty_available":
          return {
            ...col,
            headerName: "Potential Qty Available",
            flex: 1,
            minWidth: 180,
            cellStyle: { textAlign: "right", fontWeight: 600 },
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};

export default useLocationItemLot;
