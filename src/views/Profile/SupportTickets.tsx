"use client";
import {
  
  support_tickets,
} from "@/constants/Grid-Table/ColDefs";
import useSupportTicketColumn from "@/hooks/Ag-Grid/useSupportTickets";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Autocomplete,
  ListSubheader,
} from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";

import {  useGetSupportTicketsQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";

import { exportProfilesToPDF } from "@/utils/exportPDF";
import ResponsiveDashboard from "./TabsContent/ResponsiveDashboard";
interface OrdersProps {
  customerId?: string; // optional prop
}

const SupportTickets = ({ customerId }: { customerId?: string }) => {
  const ticketColumns = useSupportTicketColumn(support_tickets);

  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [storeFilter, setStoreFilter] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState(10);
  
  const [customerIdFilter, setCustomerIdFilter] = useState<string | undefined>(
    undefined
  );
  const [ticketIdFilter, setTicketIdFilter] = useState<string | undefined>(
    undefined
  );

  
  const { data, isLoading, refetch, isFetching } = useGetSupportTicketsQuery(
    {
      page,
      page_size: pageSize,
      customer_id: customerIdFilter ||customerId   || undefined,
      ticket_id: ticketIdFilter || undefined,
      
    },
    { skip: false }
  );

 const rowData = useMemo(() => {
  const results = data?.data || [];

  return results.map((item: any) => {
    return {
      ticket_id: item.ticket_id,
      customer_id: item.customer_id || "",
      created_at: item.created_at || "",
      resolved_at: item.resolved_at || "",
      status: item.status || "",
      channel: item.channel || "",
      tags: item.tags || "",
      csat_score: item.csat_score ?? null,
      sentiment_score: item.sentiment_score ?? null,
      last_comment_at: item.last_comment_at || null,
      comment_count: item.comment_count ?? null,
    };
  });
}, [data]);



 

    const onRowClicked = (params: any) => {
  if (selectedTicket?.customer_id=== params.data.customer_id) {
    setSelectedTicket(null);
  } else {
    setSelectedTicket(params.data);
  }
};


 
const getRowStyle = (params: any) => {
  if (selectedTicket?.customer_id=== params.data.customer_id) {
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
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pr={3}
          >
            <Typography variant="h1" p={1} color="#0D0D12" fontWeight={700}>
             Support Tickets
            </Typography>

            <Box display={"flex"} alignItems={"center"} gap={3}>
             
              <FormControl size="small">
                <TextField
                  label="Customer ID"
                  value={(customerIdFilter || "").toUpperCase()}
                  onChange={(e) => {
                    const value = e.target.value;

                    setCustomerIdFilter(
                      value ? value.toUpperCase() : undefined
                    );
                    setPage(1);
                  }}
                  size="small"
                  placeholder="Search by Customer ID"
                />
              </FormControl>



               <FormControl size="small">
                <TextField
                  label="Ticket ID"
                  value={(ticketIdFilter || "").toUpperCase()}
                  onChange={(e) => {
                    const value = e.target.value;

                    setTicketIdFilter(
                      value ? value.toUpperCase() : undefined
                    );
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
          </Box>)}

          {isLoading || isFetching ? (
            <Loader />
          ) : (
          
              <ResponsiveDashboard
                        rowData={rowData}
                        userCol={ticketColumns}
                        onRowClicked={onRowClicked}
            getRowStyle={getRowStyle} 

                        selectedTicket={selectedTicket?.customer_id}
                        enablePagination
                        currentPage={page}
                        totalPages={data?.total_pages || 1}
                        onPageChange={(newPage: any) => setPage(newPage)}
                        pagination={false}
                        currentMenu="support_tickets"
   paginationPageSize={pageSize}
                                    
                      />
          )}

         
        </Box>
    


    </Box>
  );
};

export default SupportTickets;
