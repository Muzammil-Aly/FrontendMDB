"use client";
import AgGridTable from "@/components/ag-grid";
import { orderItems } from "@/constants/Grid-Table/ColDefs";
import useOrderItems from "@/hooks/Ag-Grid/useOrderItems";
import { Box ,Typography} from "@mui/material";
import React, { useState, useMemo } from "react";
import Loader from "@/components/Common/Loader";
import { useGetOrderItemsQuery } from "@/redux/services/profileApi";

interface Props {
  orderId: string;
}

const OrderItems = ({ orderId }: Props) => {
  const orderItemsCol = useOrderItems(orderItems);
 

  // Fetch order items from API using the orderId
  const { data, isLoading, isFetching, refetch } = useGetOrderItemsQuery(
    { orderId },
    { skip: !orderId }
  );

  // Map API data to rowData for AgGrid
const rowData = useMemo(() => {
  const items = data?.data || data || []; // flexible for API shape
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
      }))
    : [];
}, [data]);

  // return (
  //   <Box display="flex" width="100%"
  //   justifyContent="center"
  // alignItems="center">
  //     {isLoading || isFetching ? (
  //       <Loader />
  //     ) : (
  //       <AgGridTable
  //         rowData={rowData}
  //         columnDefs={orderItemsCol}
  //         height={480}
  //         enablePagination={false}
  //       />
  //     )}
  //   </Box>
  // );

  return (
  <Box 
    display="flex" 
    flexDirection="column"  // stack vertically
    width="100%"
    justifyContent="center"
    alignItems="center"
  >
    {/* Show Order ID */}
    <Typography variant="h6" sx={{ mb: 2 }}>
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
      />
    )}
  </Box>
);

};

export default OrderItems;
