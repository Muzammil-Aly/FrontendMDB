import { ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";

export interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<ICellRendererParams>;
  width?: number;
  flex?: number;
  minWidth?: number;
  cellStyle?: any;
  autoHeight?: boolean;
}

const useInventory = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "Location Code":
          return { ...col, headerName: "Location Code", flex: 1, minWidth: 150 };
        case "Item No_":
          return { ...col, headerName: "Item No", flex: 1, minWidth: 150 };
        case "Description":
          return {
            ...col,
            headerName: "Description",
            flex: 1,
            minWidth: 250,
            // cellStyle: { whiteSpace: "normal" },
            autoHeight: true,
          };
        case "Qty_":
          return { ...col, headerName: "Quantity", flex: 1, minWidth: 120 };
        case "ETA":
          return { ...col, headerName: "ETA", flex: 1, minWidth: 140 };
        case "Qty_ Available":
          return { ...col, headerName: "Qty Available", flex: 1, minWidth: 160 };
        case "Avail_ Qty_ on Hand":
          return { ...col, headerName: "Avail Qty on Hand", flex: 1, minWidth: 180 };
        case "Avail_ Qty_ to Commit":
          return { ...col, headerName: "Avail Qty to Commit", flex: 1, minWidth: 200 };
        case "Qty_ on Blocked Lot_Bin":
          return { ...col, headerName: "Qty on Blocked Lot/Bin", flex: 1, minWidth: 220 };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useInventory;
