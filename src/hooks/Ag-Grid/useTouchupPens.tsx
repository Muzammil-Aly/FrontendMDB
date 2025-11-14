import { ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";

export interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<ICellRendererParams>;
  width?: number;
  flex?: number;
  minWidth?: number;
}

const useTouchupsPens = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "ItemNum":
          return {
            ...col,
            headerName: "Item Number",
            flex: 1,
            minWidth: 140,
          };
        case "ItemName":
          return {
            ...col,
            headerName: "Item Name",
            flex: 2,
            minWidth: 200,
          };
        case "ItemName2":
          return {
            ...col,
            headerName: "Item Name 2",
            flex: 2,
            minWidth: 200,
          };
        case "Colorslug":
          return {
            ...col,
            headerName: "Color Slug",
            flex: 1,
            minWidth: 150,
          };
        case "QtyAvailable":
          return {
            ...col,
            headerName: "Qty Available",
            flex: 1,
            minWidth: 120,
          };
        case "ColorName":
          return {
            ...col,
            headerName: "Color Name",
            flex: 1,
            minWidth: 200,
          };

        default:
          return col;
      }
    });
  }, [columns]);
};

export default useTouchupsPens;
