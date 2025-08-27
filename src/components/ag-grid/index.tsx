import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "./index.scss";
import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import {
  ClientSideRowModelModule,
  RowSelectionModule,
  RowSelectionOptions,
  ValidationModule,
  CellStyleModule,
  ModuleRegistry ,
  PaginationModule ,
  RowAutoHeightModule,
   RowStyleModule
} from "ag-grid-community";
import Pagination from "./Pagination";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowSelectionModule,
  ValidationModule,
  CellStyleModule,
  PaginationModule,
  RowAutoHeightModule,
   RowStyleModule
]);

const AgGridTable: React.FC<any> = ({
  rowData,
  gridRef,
  columnDefs,
  height = 500,
  width,
  rowHeight = 60,
  paginationPageSize = 10,
  onRowClicked,
  
  enablePagination = false,
  rowSelection = false,
  handleRowSelection = () => {},
  currentPage = 0,
  totalPages = 1,
  onPageChange = () => {},
  getRowStyle,
  rowClassRules,
  className,
  noTopBorder,
  
  ...gridProps
}) => {
  const rowSelectionMemo = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  return (
    <>
      <Box sx={{ width: width || "100%", overflowX: "auto" }}>
        <div
          className={`ag-theme-material ${noTopBorder ? "no-top-border" : ""}`}
          style={{
            height: height,
            // width: width || "100%",
            minWidth: '1000px',
          }}
        >
          {/* <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            rowClassRules={rowClassRules}
            className={className}
            getRowStyle={getRowStyle}
            defaultColDef={{
              flex: 1,
              sortable: true,
            }}
            modules={[ClientSideRowModelModule, RowSelectionModule]}
            pagination={!enablePagination}
            paginationPageSize={
              !enablePagination ? paginationPageSize : undefined
            }
            domLayout="normal"
            rowHeight={rowHeight}
            onRowClicked={onRowClicked}
            suppressPaginationPanel={true}
            rowSelection={rowSelection ? rowSelectionMemo : undefined}
            onRowSelected={handleRowSelection}
            {...gridProps}
          /> */}

          <AgGridReact
            theme="legacy"
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            getRowStyle={getRowStyle}
               rowClassRules={rowClassRules as any}  
               
            defaultColDef={{
              flex: 1,
               resizable: true,
              sortable: true,
            }}
            modules={[
              ClientSideRowModelModule,
              RowSelectionModule,
              ValidationModule,
              CellStyleModule,
              PaginationModule,

            ]}
            pagination={enablePagination}
            paginationPageSize={
              enablePagination ? paginationPageSize : undefined
            }
            domLayout="normal"
            rowHeight={rowHeight}
            onRowClicked={onRowClicked}
            suppressPaginationPanel={true}
            //  suppressHorizontalScroll={true} 
            rowSelection={rowSelection ? rowSelectionMemo : undefined}
            onRowSelected={handleRowSelection}
            {...gridProps}
          />
        </div>

        {enablePagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </Box>
    </>
  );
};

export default AgGridTable;
