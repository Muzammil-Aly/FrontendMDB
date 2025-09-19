"use client";
import AgGridTable from "@/components/ag-grid";
import { inventory_columns } from "@/constants/Grid-Table/ColDefs"; 
import useInventoryColumn from "@/hooks/Ag-Grid/useInventoryColumn";
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import React, { useState, useMemo } from "react";
import Loader from "@/components/Common/Loader";
import { useGetInventoryQuery } from "@/redux/services/profileApi"; 
import { getRowStyle } from "@/utils/gridStyles";

interface TI {
  "Location Code": string;
  "Item No_": string;
  Description: string;
  Qty_: number;
  ETA: string | null;
  "Qty_ Available": number;
  "Avail_ Qty_ on Hand": number;
  "Avail_ Qty_ to Commit": number;
  "Qty_ on Blocked Lot_Bin": number;
}

const Inventory = () =>  {
  const tiCol = useInventoryColumn(inventory_columns);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedTIDetail, setSelectedTIDetail] = useState<TI | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  

  // Fetch TI data from API
  const { data, isLoading, isFetching } = useGetInventoryQuery({
    page,
    page_size: pageSize,
});
  

  // Map API response -> rowData
  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          "Location Code": item["Location Code"],
          "Item No_": item["Item No_"],
          Description: item.Description,
          Qty_: item.Qty_,
          ETA: item.ETA,
          "Qty_ Available": item["Qty_ Available"],
          "Avail_ Qty_ on Hand": item["Avail_ Qty_ on Hand"],
          "Avail_ Qty_ to Commit": item["Avail_ Qty_ to Commit"],
          "Qty_ on Blocked Lot_Bin": item["Qty_ on Blocked Lot_Bin"],
        }))
      : [];
  }, [data]);

  // Row click handler
  const onRowClicked = (params: any) => {
    if (selectedTIDetail?.["Item No_"] === params.data["Item No_"]) {
    //   setSelectedTIDetail(null);
      setHighlightedId(null);
    } else {
    //   setSelectedTIDetail(params.data as TI);
      setHighlightedId(params.data["Item No_"]);
     // bubble up to parent if provided
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
    //   justifyContent="space-between"
    //   alignItems="flex-start"
      className="drag-handle"
      pl={8}
    > <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} >
<Box>

        <Typography variant="h1" p={2} color="#0D0D12" fontWeight={700} justifyItems={"left"}>
                          Inventory
                        </Typography>
</Box>
<Box>

                        <FormControl size="small">
                                              <InputLabel>Page Size</InputLabel>
                                              <Select
                                                value={pageSize}
                                                onChange={(e) => {
                                                    setPageSize(Number(e.target.value));
                                                    setPage(1);
                                                }}
                                                label="Page Size"
                                                sx={{ width: 100 }}
                                                >
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={100}>100</MenuItem>
                                              </Select>
                                            </FormControl>
                                                  </Box>
    </Box>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={tiCol}
          height={480}
          enablePagination
          onRowClicked={onRowClicked}
          getRowStyle={getRowStyle(highlightedId)}
              currentPage={page}
              totalPages={data?.total_pages || 1}
              onPageChange={(newPage: any) => setPage(newPage)}
              pagination={false}
              currentMenu="profiles"
              paginationPageSize={pageSize}
        />
      )}
    </Box>
  );
};

export default Inventory;
