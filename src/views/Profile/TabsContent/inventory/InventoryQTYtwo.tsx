"use client";
import React, { useState, useMemo } from "react";
import { Paper, Box } from "@mui/material";
import AgGridTable from "@/components/ag-grid";
import useQTYtwo from "@/hooks/Ag-Grid/useQTYtwo";
import { qty_two } from "@/constants/Grid-Table/ColDefs";
import { useGetQTYtwoInventoryTableQuery } from "@/redux/services/InventoryApi";
import { getRowStyle } from "@/utils/gridStyles";
import Loader from "@/components/Common/Loader";

interface InventoryQTYtwo {
  location_code?: string;
  item_no?: (item: any) => void;
  selectedQtyoneItem?: string;
}

const InventoryQTYtwo: React.FC<InventoryQTYtwo> = ({
  location_code,
  item_no,
  selectedQtyoneItem,
}) => {
  const tiCol = useQTYtwo(qty_two);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetQTYtwoInventoryTableQuery(
    {
      page,
      page_size: pageSize,
      location_code: location_code,
      item_no: selectedQtyoneItem,
    },
    {
      skip: !selectedQtyoneItem,
    }
  );

  const rowData = useMemo(() => {
    if (!selectedQtyoneItem || selectedQtyoneItem.length === 0) return [];
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          item_no: item.item_no ?? "-",
          description: item.description ?? "-",
          description_2: item.description_2 ?? "-",
          location_code: item.location_code ?? "-",
          zone_code: item.zone_code ?? "-",
          lot_no: item.lot_no ?? "-",
          total_qty: item.total_qty != null ? item.total_qty : 0,
          parts_version: item.parts_version != null ? item.parts_version : 0,
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
            // totalPages={data?.total_pages || 1}
            totalPages={rowData.length > 0 ? data?.total_pages || 1 : 1}
            onPageChange={setPage}
            pagination
            paginationPageSize={pageSize}
          />
        )}
      </Paper>
    </Box>
  );
};

export default InventoryQTYtwo;
