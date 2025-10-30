"use client";
import { useEffect } from "react";
import AgGridTable from "@/components/ag-grid";
import { orderItems } from "@/constants/Grid-Table/ColDefs";
import useOrderItems from "@/hooks/Ag-Grid/useOrderItems";
import { Box, Typography } from "@mui/material";
import React, { useState, useMemo } from "react";
import Loader from "@/components/Common/Loader";
import { useGetOrderItemsQuery } from "@/redux/services/profileApi";
import { getRowStyle } from "@/utils/gridStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  setActiveTab,
  setOrderItemsOpen,
  setTouchupsOpen,
  setTouchupPensOpen,
  resetAllTabs,
} from "../../app/redux/tabSlice";
interface Props {
  orderId: string;
  setSelectedOrderItem?: React.Dispatch<React.SetStateAction<any | null>>;
  orderItemSec?: boolean;
  filters?: string;
}
interface OrderItem {
  line_no: string | number;
  order_id: string;
  sku: string;
  product_name: string;
  item_type: string;
  brand: string;
  collection: string;
  quantity: number;
  amount: number;
}
const OrderItems = ({
  orderId,
  setSelectedOrderItem,
  orderItemSec,
  filters,
}: Props) => {
  const orderItemsCol = useOrderItems(orderItems);
  const { isActive, activeTabName, isTouchupsOpen } = useSelector(
    (state: RootState) => state.tab
  );
  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );
  const [selectedItemDetail, setSelectedItemDetail] =
    useState<OrderItem | null>(null);

  // Fetch order items from API using the orderId
  const { data, isLoading, isFetching, refetch } = useGetOrderItemsQuery(
    { orderId },
    { skip: !orderId }
  );
  const dispatch = useDispatch();
  // Map API data to rowData for AgGrid
  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          line_no: item.line_no,
          order_id: item.order_id,
          sku: item.sku,
          product_name: item.product_name,
          item_type: item.item_type,
          brand: item.brand,
          collection: item.collection,
          quantity: item.quantity,
          amount: item.amount,
          lot_no: item.lot_no,
        }))
      : [];
  }, [data]);

  const [orderItemSecOpen, setOrderItemSecOpen] = useState<boolean>(false);

  const onRowClicked = (params: any) => {
    const event = params?.event;
    if ((event?.target as HTMLElement).closest(".MuiIconButton-root")) {
      return; // ignore clicks from any MUI icon button
    }

    if (selectedItemDetail?.line_no === params.data.line_no) {
      setSelectedItemDetail(null);
      setSelectedOrderItem?.(null);
      dispatch(setTouchupsOpen(false));
    } else {
      setSelectedItemDetail(params.data as OrderItem);
      setSelectedOrderItem?.(params.data as OrderItem);
      setOrderItemSecOpen(true);

      //  setOrderItemSec(true);
    }
  };

  useEffect(() => {
    if (isTouchupsOpen && data?.data?.length > 0) {
      setSelectedOrderItem?.(data.data[0]);
      setSelectedItemDetail(data.data[0]);
    }
  }, [data]);
  console.log("touchupsec", orderItemSecOpen);
  console.log("selectedItemDetail", selectedItemDetail);

  return (
    <Box
      display="flex"
      flexDirection="column" // stack vertically
      width="100%"
      justifyContent="center"
      alignItems="center"
      // className="drag-handle"
    >
      {/* Show Order ID */}
      <Typography
        className="drag-handle"
        variant="caption"
        sx={{
          fontWeight: 600,
          color: "#fff",
          background: "#1976d2",
          px: 1.5, // smaller horizontal padding
          py: 0.5, // smaller vertical padding
          fontSize: "1em", // very small text
          borderRadius: "3px 5px 5px 3px",
          position: "relative",
          mb: 2,
          display: "inline-block",
          "::before": {
            content: '""',
            position: "absolute",
            left: -8, // smaller triangle
            top: "50%",
            transform: "translateY(-50%)",
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderRight: "8px solid #1976d2",
          },
        }}
      >
        Order ID: {orderId ?? "N/A"}
      </Typography>

      {/* Loader or Table */}
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={orderItemsCol}
          height={480}
          enablePagination={false}
          onRowClicked={onRowClicked}
          getRowStyle={getRowStyle(highlightedId)}
        />
      )}
    </Box>
  );
};

export default OrderItems;
