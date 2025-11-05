"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Paper, Box } from "@mui/material";
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
  const [getSOInventory, { data, isLoading, isFetching }] =
    useLazyGetSOInventoryTableQuery();

  useEffect(() => {
    if (location_code && item_no) {
      getSOInventory({ page, page_size: pageSize, location_code, item_no });
    }
  }, [location_code, item_no, page, pageSize, getSOInventory]);

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

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 3 }}>
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
            paginationPageSize={pageSize}
          />
        )}
      </Paper>
    </Box>
  );
};

export default InventorySOTable;
