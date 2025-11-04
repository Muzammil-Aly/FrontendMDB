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

const useQTYone = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "item_no":
          return {
            ...col,
            headerName: "Item No",
            flex: 1,
            minWidth: 160,
          };
        case "location_code":
          return {
            ...col,
            headerName: "Location Code",
            flex: 1,
            minWidth: 150,
          };
        case "test_quality":
          return {
            ...col,
            headerName: "Test Quality",
            flex: 1,
            minWidth: 160,
          };
        case "lot_no":
          return {
            ...col,
            headerName: "Lot No",
            flex: 1,
            minWidth: 180,
          };
        case "blocked":
          return {
            ...col,
            headerName: "Blocked",
            flex: 1,
            minWidth: 140,
          };
        case "total_qty":
          return {
            ...col,
            headerName: "Total Quantity",
            flex: 1,
            minWidth: 160,
          };
        case "parts_version":
          return {
            ...col,
            headerName: "Parts Version",
            flex: 1,
            minWidth: 160,
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useQTYone;
