"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Paper, Box } from "@mui/material";
import AgGridTable from "@/components/ag-grid";
import useQTYone from "@/hooks/Ag-Grid/useQTYone";
import { qty_one } from "@/constants/Grid-Table/ColDefs";
// import { useGetQTYoneInventoryTableQuery } from "@/redux/services/InventoryApi";
import { useLazyGetQTYoneInventoryTableQuery } from "@/redux/services/InventoryApi";
import { getRowStyle } from "@/utils/gridStyles";
import Loader from "@/components/Common/Loader";
import test from "node:test";

interface InventoryQTYone {
  location_code?: string;
  item_no?: string;
  setSelectedQtyoneItem?: (item: any) => void;
}

const InventoryQTYone: React.FC<InventoryQTYone> = ({
  location_code,
  item_no,
  setSelectedQtyoneItem,
}) => {
  const tiCol = useQTYone(qty_one);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // const { data, isLoading, isFetching } = useGetQTYoneInventoryTableQuery(
  //   {
  //     page,
  //     page_size: pageSize,
  //     location_code: location_code,
  //     item_no: item_no,
  //   },
  //   {
  //     // skip: !location_code && !item_no,
  //     skip: !location_code || !item_no,
  //   }
  // );
  const [getQTYone, { data, isLoading, isFetching }] =
    useLazyGetQTYoneInventoryTableQuery();

  // Trigger manually when props change or drawer opens
  useEffect(() => {
    if (location_code && item_no) {
      getQTYone({ location_code, item_no, page, page_size: pageSize });
    }
  }, [location_code, item_no, page, pageSize, getQTYone]);

  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          item_no: item.item_no ?? "-",
          description: item.description ?? "-",
          description_2: item.description_2 ?? "-",
          location_code: item.location_code ?? "-",
          zone_code: item.zone_code ?? "-",
          lot_no: item.lot_no ?? "-",
          total_qty: item.total_qty ?? 0,
          parts_version: item.parts_version ?? 0,
          test_quality: item.test_quality ?? "-",
          blocked: item.blocked ?? "-",
        }))
      : [];
  }, [data]);

  const onRowClicked = (params: any) => {
    const clickedId = params.data.item_no;
    if (highlightedId === clickedId) {
      setHighlightedId(null);
      setSelectedQtyoneItem?.(null);
    } else {
      setHighlightedId(clickedId);
      setSelectedQtyoneItem?.(params.data);
    }
  };

  useEffect(() => {
    if (data?.data?.length > 0) {
      setSelectedQtyoneItem?.(data.data[0]);
    }
  }, [data, setSelectedQtyoneItem]);
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

export default InventoryQTYone;
