"use client";
import AgGridTable from "@/components/ag-grid";
import { touchups_columns } from "@/constants/Grid-Table/ColDefs"; // your touchups colDefs
import useTouchupsColumn from "@/hooks/Ag-Grid/useTouchupsColumn"; // the hook we built earlier
import { Box, Typography } from "@mui/material";
import React, { useState, useMemo } from "react";
import Loader from "@/components/Common/Loader";
import { useGetTouchupsQuery } from "@/redux/services/profileApi"
 // <-- adjust if your API hook has different name
import { getRowStyle } from "@/utils/gridStyles";

interface Props {
  orderId: string;
  setSelectedTouchup?: React.Dispatch<React.SetStateAction<any | null>>;
}

interface Touchup {
  order_id: string;
  lot_no: string | null;
  sku: string;
  customer_id: string | null;
  parts_item_no: string | null;
  parts_item_name: string | null;
  parts_item_name_2: string | null;
  touchup_pen_item_no: string | null;
  touchup_pen_item_name: string | null;
  brand: string | null;
  color_slug: string | null;
  color_name: string | null;
}

const Touchups = ({ orderId, setSelectedTouchup }: Props) => {

  const touchupsCol = useTouchupsColumn(touchups_columns);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedTouchupDetail, setSelectedTouchupDetail] =
    useState<Touchup | null>(null);

    console.log("Touchups orderId:", orderId);

  // Fetch touchups from API
const { data, isLoading, isFetching, refetch } = useGetTouchupsQuery(
  { order_id: orderId },
  { skip: !orderId }
);


  // Map API response -> rowData
  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          order_id: item.order_id,
          lot_no: item.lot_no,
          sku: item.sku,
          customer_id: item.customer_id,
          parts_item_no: item.parts_item_no,
          parts_item_name: item.parts_item_name,
          parts_item_name_2: item.parts_item_name_2,
          touchup_pen_item_no: item.touchup_pen_item_no,
          touchup_pen_item_name: item.touchup_pen_item_name,
          brand: item.brand,
          color_slug: item.color_slug,
          color_name: item.color_name,
        }))
      : [];
  }, [data]);

  // Row click handler
  const onRowClicked = (params: any) => {
    if (selectedTouchupDetail?.order_id === params.data.order_id) {
      setSelectedTouchupDetail(null);
      setHighlightedId(null);
    } else {
      setSelectedTouchupDetail(params.data as Touchup);
      setHighlightedId(params.data.order_id);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      justifyContent="center"
      alignItems="center"
      className="drag-handle"
      
    >
      {/* Show Order ID */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Touchups for Order: {orderId ?? "N/A"}
      </Typography>

      {/* Loader or Table */}
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={touchupsCol}
          height={200}
          enablePagination={false}
          onRowClicked={onRowClicked}
          getRowStyle={getRowStyle(highlightedId)}
        />
      )}
    </Box>
  );
};

export default Touchups;
