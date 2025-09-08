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
  // const numericCustId = parseInt(String(custId).replace(/\D/g, ""), 10);

  const { data, error, isLoading, isFetching } = useGetCustomerSegmentQuery(
    { custId: String(custId) },
    { skip: !custId }
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
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error)
    return <Alert severity="error">Failed to load customer segment</Alert>;

  if (!data || !data.data || data.data.length === 0)
    return <Alert severity="warning">No customer segment found</Alert>;

  const customer = data.data[0];

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #E0E0E0",
        overflowX: "auto",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Customer ID: {customer.cust_id}
        </Typography>

        <Table size="small" sx={{ minWidth: 300 }}>
          {/* General Info */}
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} sx={{ bgcolor: "#F5F5F5" }}>
                <Typography variant="body2" fontWeight={600}>
                  General Info
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              ["Status", customer.customer_status],
              ["Segment", customer.customer_segments],
              ["CLV", `$${customer.clv}`],
              ["Total Revenue", `$${customer.total_revenue}`],
              ["Purchased No Of Items", customer.num_total_purchases],
            ].map(([label, value]) => (
              <TableRow key={label}>
                <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                  {label}
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Purchase Details */}
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} sx={{ bgcolor: "#F5F5F5" }}>
                <Typography variant="body2" fontWeight={600}>
                  Purchase Details
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              [
                "First Purchase",
                `${customer.first_purchase || "N/A"} ($${
                  customer.first_purchase_amt || "N/A"
                })`,
              ],

              // show only if first purchase date exists
              customer.first_purch_date && [
                "First Purchase Date",
                `${customer.first_purchase} ($${
                  customer.first_purchase_amt || "N/A"
                })`,
              ],

              [
                "Second Purchase",
                customer.second_purchase && customer.second_purchase_amt
                  ? `${customer.second_purchase} ($${customer.second_purchase_amt})`
                  : "N/A",
              ],

              // show only if second purchase date exists
              customer.second_purch_date && [
                "Second Purchase Date",
                customer.second_purch_date,
              ],

              ["Profit Source", customer.first_profit_name],
            ]
              .filter(Boolean) // remove null/false
              .map(([label, value]) => (
                <TableRow key={label}>
                  <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                    {label}
                  </TableCell>
                  <TableCell sx={{ fontSize: 14 }}>{value}</TableCell>
                </TableRow>
              ))}

            {/* {[
              [
                "First Purchase",
                `${customer.first_purchase || "N/A"} ($${
                  customer.first_purchase_amt || "N/A"
                })`,
              ],
              [
                customer.second_purch_date && [
                  "First Purchase Date",
                  `${customer.first_purchase} ($${
                    customer.first_purchase_amt || "N/A"
                  })`,
                ],
              ].filter(Boolean), // removes null
              [
                "Second Purchase",

                // `${customer.second_purchase} ($${customer.second_purchase_amt} )`,
                `${
                  customer.second_purchase && customer.second_purchase_amt
                    ? `${customer.second_purchase} ($${customer.second_purchase_amt})`
                    : "NA"
                }`,
              ],
              [
                "Second Purchase Date",
                customer.second_purch_date ? customer.second_purch_date : "N/A",
              ],
              ["Profit Source", customer.first_profit_name],
            ].map(([label, value]) => (
              <TableRow key={label}>
                <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                  {label}
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>{value}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>

          {/* Brand Affinity */}
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} sx={{ bgcolor: "#F5F5F5" }}>
                <Typography variant="body2" fontWeight={600}>
                  Brand Affinity
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              ["Babyletto", customer.is_babyletto_customer],
              ["Namesake", customer.is_namesake_customer],
              ["DaVinci", customer.is_davinci_customer],
              ["Nursery Works", customer.is_nursery_works_customer],
            ].map(([label, value]) => (
              <TableRow key={label}>
                <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                  {label}
                </TableCell>
                <TableCell sx={{ fontSize: 14 }}>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentCard;
