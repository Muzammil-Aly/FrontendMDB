"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Paper, Box, FormControl, TextField, MenuItem } from "@mui/material";
import AgGridTable from "@/components/ag-grid";
import useInventoryColumn from "@/hooks/Ag-Grid/useInventoryColumn";
import useSalesOrders from "@/hooks/Ag-Grid/useSalesOrders";
import { inventory_columns } from "@/constants/Grid-Table/ColDefs";
import { sales_orders } from "@/constants/Grid-Table/ColDefs";
// import { useGetSOInventoryTableQuery } from "@/redux/services/InventoryApi";
import { useLazyGetSOInventoryTableQuery } from "@/redux/services/InventoryApi";
import { getRowStyle } from "@/utils/gridStyles";
import Loader from "@/components/Common/Loader";

interface InventorySOTableProps {
  location_code?: string;
  item_no?: string;
}

const InventorySOTable: React.FC<InventorySOTableProps> = ({
  location_code,
  item_no,
}) => {
  const tiCol = useSalesOrders(sales_orders);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageSizeInput, setPageSizeInput] = useState(pageSize);

  const [getSOInventory, { data, isLoading, isFetching }] =
    useLazyGetSOInventoryTableQuery();

  useEffect(() => {
    if (location_code && item_no) {
      getSOInventory({
        page,
        page_size: pageSizeInput,
        location_code,
        item_no,
      });
    }
  }, [location_code, item_no, page, pageSizeInput, getSOInventory]);

  // const { data, isLoading, isFetching } = useGetSOInventoryTableQuery(
  //   {
  //     page,
  //     page_size: pageSize,
  //     location_code: location_code,
  //     item_no: item_no,
  //   },
  //   {
  //     skip: !location_code && !item_no,
  //   }
  // );
  console.log("location_code,item_no", location_code, item_no);
  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          document_no: item.document_no ?? "-",
          customer_name: item.customer_name ?? "-",
          qty_commited: item.qty_commited ?? "-",
          qty: item.qty ?? "-",
          item_no: item.item_no ?? "-",
          location_code: item.location_code ?? "-",
        }))
      : [];
  }, [data]);

  const onRowClicked = (params: any) => {
    const clickedId = params.data.item_no;
    if (highlightedId === clickedId) {
      setHighlightedId(null);
    } else {
      setHighlightedId(clickedId);
    }
  };
  const handlePageSizeChange = (value: number) => {
    setPageSizeInput(value);
    setPage(1);
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          marginLeft: "40vw",
          marginBottom: "10px",
        }}
      >
        <FormControl sx={{ width: 150 }}>
          <TextField
            select
            value={pageSizeInput}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                fontSize: "0.8rem",
                fontWeight: 500,
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "#42a5f5",
                  boxShadow: "0 2px 6px rgba(66, 165, 245, 0.15)",
                },
                "&.Mui-focused": {
                  borderColor: "#1976d2",
                  boxShadow: "0 0 6px rgba(25, 118, 210, 0.25)",
                },
              },
              "& .MuiInputBase-input": {
                padding: "6px 14px",
              },
            }}
            InputLabelProps={{ style: { display: "none" } }}
          >
            {[10, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Box>
      <Paper sx={{ p: 2, borderRadius: 3, height: "85vh" }}>
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <AgGridTable
            key={data?.data?.length || 0}
            rowData={rowData}
            columnDefs={tiCol}
            onRowClicked={onRowClicked}
            getRowStyle={getRowStyle(highlightedId)}
            enablePagination
            currentPage={page}
            totalPages={data?.total_pages || 1}
            onPageChange={setPage}
            pagination
            paginationPageSize={pageSizeInput}
          />
        )}
      </Paper>
    </Box>
  );
};

export default InventorySOTable;
