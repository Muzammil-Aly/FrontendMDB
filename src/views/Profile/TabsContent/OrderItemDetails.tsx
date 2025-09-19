"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  item: any;
}

const OrderItemDetails = ({ item }: Props) => {
  return (
    <Box>
      <Typography variant="h6">Item Details</Typography>
      <Typography>Line No: {item.line_no}</Typography>
      <Typography>SKU: {item.sku}</Typography>
      <Typography>Product: {item.product_name}</Typography>
      <Typography>Quantity: {item.quantity}</Typography>
      <Typography>Amount: {item.amount}</Typography>
    </Box>
  );
};

export default OrderItemDetails;
