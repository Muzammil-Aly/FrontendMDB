"use client";
import React, { useState, useMemo } from "react";
import { Box, Typography, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import Loader from "@/components/Common/Loader";

import { orders } from "@/constants/Grid-Table/ColDefs";
import useOrdersColumn from "@/hooks/Ag-Grid/useOrdersColumn";
import { useGetCustomerOrdersQuery } from "@/redux/services/profileApi";
import { exportProfilesToPDF } from "@/utils/exportPDF";
import ResponsiveDashboard from "./TabsContent/ResponsiveDashboard";
interface OrdersProps {
  customerId?: string; 
}
const Orders = ({ customerId }: { customerId?: string }) => {
  const orderCol = useOrdersColumn(orders);

const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderIdFilter, setOrderIdFilter] = useState<string | undefined>(undefined);

  const { data, isLoading, isFetching } = useGetCustomerOrdersQuery({
    page,
    page_size: pageSize,
    order_id: orderIdFilter || undefined,
     customer_id: customerId || undefined,  
  });

  const rowData = useMemo(() => {
    const results = data?.data || [];
    return results.map((item: any) => ({
      order_id: item.order_id,
      customer_id: item.customer_id,
      profit_name: item.profit_name,
      customer_no: item.customer_no,
      order_date: item.order_date,
      total_value: item.total_value,
      discount_code: item.discount_code,
      fulfillment_status: item.fulfillment_status,
      shipping_address: item.shipping_address,
      channel: item.channel,
    }));
  }, [data]);




  const onRowClicked = (params: any) => {
  if (selectedOrder?.order_id=== params.data.order_id) {
    setSelectedOrder(null);
  } else {
    setSelectedOrder(params.data);
  }
};

const getRowStyle = (params: any) => {
  if (selectedOrder?.order_id=== params.data.order_id) {
   return {
  backgroundColor: "#E0E0E0", // MUI primary.main (blue 700)
   color: "#fff !important",      //           // white text for contrast
  fontWeight: 600,            // makes it stand out a bit more
};
  }
  return {};
};
  return (
    <Box display="flex">
      <Box flex={1} p={1}>
        {!customerId && ( 
        <Box display="flex" justifyContent="space-between" alignItems="center" pr={3}>
          <Typography variant="h1" p={1} color="#0D0D12" fontWeight={700}>
            Orders
          </Typography>

          <Box display="flex" alignItems="center" gap={3}>
            

            <FormControl size="small">
              <TextField
                label="Order ID"
                value={(orderIdFilter || "").toUpperCase()}
                onChange={(e) => {
                  const value = e.target.value;
                  setOrderIdFilter(value ? value.toUpperCase() : undefined);
                  setPage(1);
                }}
                size="small"
                placeholder="Search by Customer ID"
              />
            </FormControl>


            <FormControl size="small">
              <InputLabel>Page Size</InputLabel>
              <Select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                label="Page Size"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>

           
          </Box>
        </Box> )}

        {isLoading || isFetching ? (
          <Loader />
        ) : (
         

          
                      <ResponsiveDashboard
            rowData={rowData}
            userCol={orderCol}
            onRowClicked={onRowClicked}
            getRowStyle={getRowStyle} 
            selectedOrderId={selectedOrder?.order_id}
            enablePagination
            currentPage={page}
            totalPages={data?.total_pages || 1}
            onPageChange={(newPage: any) => setPage(newPage)}
            pagination={false}
            currentMenu="orders"

                        
          />
        )}

      </Box>
    </Box>
  );
};

export default Orders;
