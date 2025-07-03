"use client";
import React from "react";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import { useGetOrderHistoryQuery } from "@/redux/services/profileApi";
import { formatDate } from "@/utils/FormatDate";

interface OrderHistoryProps {
  profileId: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ profileId }) => {
  const { data, isLoading, error } = useGetOrderHistoryQuery({ profileId });

  if (isLoading)
    return (
      <Typography>
        <CircularProgress />
      </Typography>
    );
  if (error) return <Typography>Error loading order history.</Typography>;

  const orders = data?.data?.[0]?.order_history || [];

  return (
    <Box>
      <Typography fontWeight={600} mb={4} variant="h4">
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Typography>No order history available.</Typography>
      ) : (
        <Stack spacing={3} sx={{ maxHeight: 300, overflowY: "auto",pr: 1 }}>
          {orders.map((order: any, idx: number) => {
            const time = order.event_datetime;
            const props = order.event_properties;
            const value = props?.$extra?.price_set?.shop_money;

            return (
              <Box key={idx} sx={{ borderBottom: "1px solid #ddd", pb: 2 }}>
                <Typography variant="body2">
                  <strong>Product Name:</strong> {props?.Name || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Variant Name:</strong>{" "}
                  {props?.["Variant Name"] || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Quantity:</strong> {props?.Quantity || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Value:</strong>{" "}
                  {value?.currency
                    ? `${value.currency} ${value.amount}`
                    : "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {formatDate(time)}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default OrderHistory;
