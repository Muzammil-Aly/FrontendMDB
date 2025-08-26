"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Alert,
  Typography,
} from "@mui/material";
import { useGetCustomerOrdersQuery } from "@/redux/services/profileApi";
import OrderItems from "../OrderItems";

interface Order {
  order_id: string;
  order_date: string;
  customer_id: string;
  profit_name: string;
  channel: string;
  shipping_address: string;
  customer_no: string;
  fulfillment_status: string | null;
  discount_code: string | null;
  total_value: number;
}

interface OrdersTableProps {
  customerId?: string;
  orderId?: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ customerId, orderId }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data, isLoading, isFetching, error } = useGetCustomerOrdersQuery({
    customer_id: customerId,
    order_id: orderId,
    page: 1,
    page_size: 10,
  });

  if (isLoading || isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Failed to load orders</Alert>;
  }

  const orders: Order[] = Array.isArray(data?.data) ? data.data : [];

  if (orders.length === 0) {
    return <Alert severity="info">No orders found</Alert>;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Order ID</b></TableCell>
              <TableCell><b>Order Date</b></TableCell>
              <TableCell><b>Customer ID</b></TableCell>
              <TableCell><b>Customer No</b></TableCell>
              <TableCell><b>Profit Name</b></TableCell>
              <TableCell><b>Channel</b></TableCell>
              <TableCell><b>Shipping Address</b></TableCell>
              <TableCell><b>Fulfillment Status</b></TableCell>
              <TableCell><b>Discount Code</b></TableCell>
              <TableCell align="right"><b>Total Value</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedOrder(order)} // 👈 set clicked order
              >
                <TableCell>{order.order_id}</TableCell>
                <TableCell>
                  {new Date(order.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.customer_id}</TableCell>
                <TableCell>{order.customer_no}</TableCell>
                <TableCell>{order.profit_name}</TableCell>
                <TableCell>{order.channel}</TableCell>
                <TableCell>{order.shipping_address}</TableCell>
                <TableCell>
                  {order.fulfillment_status || (
                    <Typography color="text.secondary">Pending</Typography>
                  )}
                </TableCell>
                <TableCell>{order.discount_code || "N/A"}</TableCell>
                <TableCell align="right">
                  ${order.total_value.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedOrder && (
        <Box mt={3}>
          <OrderItems
            orderId={selectedOrder.order_id}
          />
        </Box>
      )}
    </>
  );
};

export default OrdersTable;
