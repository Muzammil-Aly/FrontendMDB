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

const useQTYtwo = (columns: Column[]) => {
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
        case "description":
          return {
            ...col,
            headerName: "Description",
            flex: 2,
            minWidth: 220,
            autoHeight: true,
          };
        case "description_2":
          return {
            ...col,
            headerName: "Description 2",
            flex: 2,
            minWidth: 220,
            autoHeight: true,
          };
        case "location_code":
          return {
            ...col,
            headerName: "Location Code",
            flex: 1,
            minWidth: 150,
          };
        case "zone_code":
          return {
            ...col,
            headerName: "Zone Code",
            flex: 1,
            minWidth: 150,
          };
        case "lot_no":
          return {
            ...col,
            headerName: "Lot No",
            flex: 1,
            minWidth: 180,
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
        case "bin_code":
          return {
            ...col,
            headerName: "Bin Code",
            flex: 1,
            minWidth: 160,
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useQTYtwo;
