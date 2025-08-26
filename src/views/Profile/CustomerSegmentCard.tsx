"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box,
} from "@mui/material";
import { useGetCustomerSegmentQuery } from "@/redux/services/profileApi";

interface Props {
  custId: string | number;
}

const CustomerSegmentCard: React.FC<Props> = ({ custId }) => {
  const numericCustId = parseInt(String(custId).replace(/\D/g, ""), 10);

  const { data, error, isLoading, isFetching } = useGetCustomerSegmentQuery(
    { custId: numericCustId },
    { skip: isNaN(numericCustId) }
  );



  if (isLoading || isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error">Failed to load customer segment</Alert>;

  if (!data || !data.data || data.data.length === 0)
    return <Alert severity="warning">No customer segment found</Alert>;

  const customer = data.data[0];

  // Show centered loader while loading
  if (isLoading || isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px", // or any height you want for the card area
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 900, margin: "0 auto", borderRadius: 3, boxShadow: 0 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Customer ID: {customer.cust_id}
        </Typography>

        <Table size="small">
          {/* General Info */}
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h6">General Info</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><b>Status</b></TableCell>
              <TableCell>{customer.customer_status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Segment</b></TableCell>
              <TableCell>{customer.customer_segments}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>CLV</b></TableCell>
              <TableCell>${customer.clv}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Total Revenue</b></TableCell>
              <TableCell>${customer.total_revenue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Purchases</b></TableCell>
              <TableCell>{customer.num_total_purchases}</TableCell>
            </TableRow>
          </TableBody>

          {/* Purchase Details */}
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h6">Purchase Details</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><b>First Purchase</b></TableCell>
              <TableCell>
                {customer.first_purchase} (${customer.first_purchase_amt})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Second Purchase</b></TableCell>
              <TableCell>
                {customer.second_purchase} (${customer.second_purchase_amt})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Second Purchase Date</b></TableCell>
              <TableCell>
                {new Date(customer.second_purch_date).toLocaleDateString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Profit Source</b></TableCell>
              <TableCell>{customer.first_profit_name}</TableCell>
            </TableRow>
          </TableBody>

          {/* Brand Affinity */}
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h6">Brand Affinity</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Babyletto</TableCell>
              <TableCell>{customer.is_babyletto_customer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Namesake</TableCell>
              <TableCell>{customer.is_namesake_customer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DaVinci</TableCell>
              <TableCell>{customer.is_davinci_customer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nursery Works</TableCell>
              <TableCell>{customer.is_nursery_works_customer}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentCard;
