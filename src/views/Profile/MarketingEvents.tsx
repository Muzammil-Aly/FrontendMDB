"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useGetCustomerEventsQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";

import { marketing_events } from "@/constants/Grid-Table/ColDefs";
import useMarketingEvents from "@/hooks/Ag-Grid/useMarketingItems";
import AgGridTable from "@/components/ag-grid";
interface OrdersProps {
  customerId?: string; // optional prop
}

const MarketingEvents: React.FC = ({ customerId }: { customerId?: string }) => {
  const eventCol = useMarketingEvents(marketing_events);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [eventIdFilter, setEventIdFilter] = useState<string | undefined>();
  const [customerIdFilter, setCustomerIdFilter] = useState<string | undefined>();
  const [campaignFilter, setCampaignFilter] = useState<string | undefined>();
  const [eventTypeFilter, setEventTypeFilter] = useState<string | undefined>();

  const { data, isLoading, isFetching } = useGetCustomerEventsQuery({
    page,
    page_size: pageSize,
    event_id: eventIdFilter,
    customer_id: customerIdFilter || customerId,
    campaign_name: campaignFilter,
    event_type: eventTypeFilter,
  });

  const rowData = useMemo(() => {
    const results = data?.data || [];
    return results.map((item: any) => ({
      event_id: item.event_id,
      event_type: item.event_type,
      customer_id: item.customer_id ?? "N/A",
      event_timestamp: new Date(item.event_timestamp).toLocaleString(),
      campaign_name: item.campaign_name,
    }));
  }, [data]);

  return (
    <Box display="flex">
      <Box flex={1} p={1}>

         {!customerId && ( 
        <Box display="flex" justifyContent="space-between" alignItems="center" pr={3}>
          <Typography variant="h1" p={1} color="#0D0D12" fontWeight={700}>
            Marketing Events
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="Event ID"
              value={eventIdFilter || ""}
              onChange={(e) => {
                setEventIdFilter(e.target.value || undefined);
                setPage(1);
              }}
              size="small"
            />

            <TextField
              label="Customer ID"
              value={customerIdFilter || ""}
              onChange={(e) => {
                setCustomerIdFilter(e.target.value || undefined);
                setPage(1);
              }}
              size="small"
            />

            <TextField
              label="Campaign"
              value={campaignFilter || ""}
              onChange={(e) => {
                setCampaignFilter(e.target.value || undefined);
                setPage(1);
              }}
              size="small"
            />

            <TextField
              label="Event Type"
              value={eventTypeFilter || ""}
              onChange={(e) => {
                setEventTypeFilter(e.target.value || undefined);
                setPage(1);
              }}
              size="small"
            />

            <FormControl size="small">
              <InputLabel>Page Size</InputLabel>
              <Select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                label="Page Size"
                sx={{ minWidth: 100 }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>

          </Box>
        </Box>
         )}
        {isLoading || isFetching ? (
          <Loader />
        ) : (
            <AgGridTable
            rowData={rowData}
            columnDefs={eventCol}
            // onRowClicked={onRowClicked}
            height={480}
            enablePagination
            currentPage={page}
            totalPages={data?.total_pages || 1}
            onPageChange={(newPage: any) => setPage(newPage)}
            pagination={false}
            style={{ width: '100%', overflowX: 'auto' }}
          />
         
        )}
      </Box>
    </Box>
  );
};

export default MarketingEvents;
