"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Paper, Box } from "@mui/material";
import AgGridTable from "@/components/ag-grid";
import useInventoryColumn from "@/hooks/Ag-Grid/useInventoryColumn";
import usePurchaseOrders from "@/hooks/Ag-Grid/usePurchaseOrders";
import { inventory_columns } from "@/constants/Grid-Table/ColDefs";
import { purchase_orders } from "@/constants/Grid-Table/ColDefs";
import { useGetPOInventoryTableQuery } from "@/redux/services/InventoryApi";
import { useLazyGetPOInventoryTableQuery } from "@/redux/services/InventoryApi";
import { getRowStyle } from "@/utils/gridStyles";
import Loader from "@/components/Common/Loader";

interface InventoryPOTableProps {
  location_code?: string;
  item_no?: string;
}

const InventoryPOTable: React.FC<InventoryPOTableProps> = ({
  location_code,
  item_no,
}) => {
  const tiCol = usePurchaseOrders(purchase_orders);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [getPOInventory, { data, isLoading, isFetching }] =
    useLazyGetPOInventoryTableQuery();

  useEffect(() => {
    if (location_code && item_no) {
      setPage(1);
      getPOInventory({ page: 1, page_size: pageSize, location_code, item_no });
    }
  }, [location_code, item_no, pageSize, getPOInventory]);

  // const { data, isLoading, isFetching } = useGetPOInventoryTableQuery(
  //   {
  //     page,
  //     page_size: pageSize,
  //     location_code: location_code,
  //     item_no: item_no,
  //   },
  //   {
  //     skip: !location_code && !item_no,
  //     refetchOnMountOrArgChange: true,
  //   }
  // );
  useEffect(() => {
    setPage(1);
  }, [location_code, item_no]);

  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          location_code: item.location_code ?? "-",
          item_no: item.item_no ?? "-",
          expected_receipt_date: item.expected_receipt_date ?? "-",
          shipment_status: item.shipment_status ?? "-",
          qty_on_po: item.qty_on_po != null ? item.qty_on_po : 0,
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

  console.log("row data for PO table", data);
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
            onPageChange={(newPage: number) => setPage(newPage)}
            pagination={true}
            paginationPageSize={pageSize}
          />
        )}
      </Paper>
    </Box>
  );
};

export default InventoryPOTable;
