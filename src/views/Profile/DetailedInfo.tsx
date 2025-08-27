"use client";
import AgGridTable from "@/components/ag-grid";
import {
  users,

} from "@/constants/Grid-Table/ColDefs";

import useUsersColumn from "@/hooks/Ag-Grid/useUsersColumn";

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
import { useGetProfilesQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";


interface SegmentOption {
  id: string;
  name: string;
}
const DetailedInfo = () => {
  const userCol = useUsersColumn(users);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  
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
  const sourceOptions = ["All", "Klaviyo", "Shopify", "Wismo"];

  
  return (
        <Box flex={1} p={2}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pr={1}
          >
          <Typography variant="h1" ml={0} p={0} color="#0D0D12" fontWeight={700}>
  Profile Information
</Typography>


            <Box display={"flex"} alignItems={"center"} gap={3} >
              <Box mt={-1}  >
                <Box display={"flex"} alignItems="center" gap={1}  >
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

              <FormControl size="small" sx={{ width: 150, ml: 0}}
                >
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

             <FormControl size="small" sx={{ minWidth: 150, ml: 0}}>
               <Autocomplete
                 size="small"
                 options={sourceOptions}
                 value={sourceFilter ?? "All"}
                 onChange={(e, newValue) => {
                   setSourceFilter(!newValue || newValue === "All" ? undefined : newValue);
             
                   setPage(1);
                 }}
                 renderInput={(params) => (
                   <TextField {...params} label="Source" placeholder="Search by Source" />
                 )}
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
          </Box>

          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <AgGridTable
              rowData={rowData}
              columnDefs={userCol}
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
      


    
  );
};

export default DetailedInfo;
