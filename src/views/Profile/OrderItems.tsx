"use client";
import AgGridTable from "@/components/ag-grid";
import {
  users,
  orders,
  orderItems,
  support_ticket_comments,
  support_tickets,
  marketing_events,
} from "@/constants/Grid-Table/ColDefs";
import {
  ordersRow,
  ticketColumns,
  commentColumns,
  orderColumns,
} from "@/constants/Grid-Table/RowData";
import useOrdersColumn from "@/hooks/Ag-Grid/useOrdersColumn";
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
import UserDetailsModal from "./UserDetailsModal";
import CustomSearchField from "@/components/Common/CustomSearch";
import { Phone, Send } from "@mui/icons-material";
import debounce from "lodash.debounce";
import { formatDate } from "@/utils/FormatDate";
import { useGetProfilesQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";
import useOrderItems from "@/hooks/Ag-Grid/useOrderItems";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useGetSegmentsQuery } from "@/redux/services/profileApi";
import { exportProfilesToPDF } from "@/utils/exportPDF";
interface SegmentOption {
  id: string;
  name: string;
}
const OrderItems = () => {
  const orderItemsCol = useOrderItems(orderItems);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [storeFilter, setStoreFilter] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState(10);
  const [segmentFilter, setSegmentFilter] = useState<string | undefined>(
    undefined
  );

  const [segmentSearch, setSegmentSearch] = useState("");
 

  const [sourceFilter, setSourceFilter] = useState<string | undefined>(
    undefined
  );
  const [customerIdFilter, setCustomerIdFilter] = useState<string | undefined>(
    undefined
  );

  const { data, isLoading, refetch, isFetching } = useGetProfilesQuery(
    {
      page,
      page_size: pageSize,
      email: searchTerm || undefined,
      source: sourceFilter || undefined,
      customer_id: customerIdFilter || undefined,
    },
    { skip: false }
  );

  const rowData = useMemo(() => {
    const results = data?.data || [];

    return results.map((item: any) => {
      // const location = item.attributes.location || {};

      return {
        email: item.email,
        Phone: item.phone || "",
        full_name: item.full_name || "",
        source: item.source || "",
        customer_id: item.customer_id || "",
        join_type: item.join_type || "",
        key: item.key || "",
      };
    });
  }, [data]);
  const { data: segmentsData } = useGetSegmentsQuery({
    page: 1,
    page_size: 100,
  });


  const onRowClicked = (params: any) => {
    setSelectedUser(params.data);
    setModalOpen(true);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1);
      }, 5000),
    []
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setSearchTerm("");
      setPage(1);
      debouncedSearch.cancel(); // cancel pending debounce
    } else {
      debouncedSearch(value);
    }
  };


  return (
    <Box display="flex">
      

      
        <Box flex={1} p={2}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pr={3}
          >
            <Typography variant="h1" p={2} color="#0D0D12" fontWeight={700}>
             Order Items
            </Typography>

            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Box mt={-1}>
                <Box display={"flex"} alignItems="center" gap={1}>
                  <CustomSearchField
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search by Email"
                  />

                  {
                    <Send
                      onClick={() => {
                        setSearchTerm(searchInput);
                        setPage(1);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "#004FA7",
                        height: "36px",
                        width: "36px",
                      }}
                    />
                  }
                </Box>
              </Box>

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
                  label="Source"
                  value={sourceFilter || ""}
                  onChange={(e) => {
                    setSourceFilter(e.target.value || undefined);
                    setPage(1);
                  }}
                  size="small"
                  placeholder="Search by Source"
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

              <FormControl size="small">
                <button
                  onClick={() =>
                    exportProfilesToPDF(
                      rowData,
                      pageSize,
                      storeFilter,
                      segmentSearch
                    )
                  }
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#004FA7",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Export PDF
                </button>
              </FormControl>

            
            </Box>
          </Box>

          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <AgGridTable
              rowData={rowData}
              columnDefs={ orderItemsCol}
              onRowClicked={onRowClicked}
              height={480}
              enablePagination
              currentPage={page}
              totalPages={data?.total_pages || 1}
              onPageChange={(newPage: any) => setPage(newPage)}
              pagination={false}
            />
          )}

          <UserDetailsModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            userData={selectedUser}
          />
        </Box>
    


    </Box>
  );
};

export default OrderItems;
