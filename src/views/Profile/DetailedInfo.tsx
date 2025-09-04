"use client";
import AgGridTable from "@/components/ag-grid";
import { users } from "@/constants/Grid-Table/ColDefs";

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
  InputAdornment,
  CircularProgress,
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
  const [fullNameFilter, setFullNameFilter] = useState<string | undefined>(
    undefined
  );
  const [phoneNumberFilter, setPhoneNumberFilter] = useState<
    string | undefined
  >(undefined);
  const [customerIdInput, setCustomerIdInput] = useState("");
  const [fullNameInput, setFullNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [isCustomerIDTyping, setIsCustomerIDTyping] = useState(false);
  const [isFullNameTyping, setIsFullNameTyping] = useState(false);
  const [isPhoneNumberTyping, setIsPhoneNumberTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { data, isLoading, refetch, isFetching } = useGetProfilesQuery(
    {
      page,
      page_size: pageSize,
      email: searchTerm || undefined,
      source: sourceFilter || undefined,
      customer_id: customerIdFilter || undefined,
      full_name: fullNameFilter || undefined,
      phone: phoneNumberFilter || undefined,
    },
    { skip: false }
  );

  const rowData = useMemo(() => {
    const results = data?.data || [];

    return results.map((item: any) => {
      return {
        email: item.email,
        phone: item.phone || "",
        full_name: item.full_name || "",
        source: item.source || "",
        customer_id: item.customer_id || "",
        join_type: item.join_type || "",
        key: item.key || "",
        created_at: item.created_at || "",
        last_order_date: item.last_order_date || "",
        total_orders: item.total_orders || "",
      };
    });
  }, [data]);

  const onRowClicked = (params: any) => {
    setSelectedUser(params.data);
    setModalOpen(true);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setSearchTerm("");
      setPage(1);
      debouncedSearch.cancel(); // cancel pending debounce
    } else {
      debouncedSearch(value);
      setIsTyping(true);
    }
  };

  const sourceOptions = ["All", "Klaviyo", "Shopify", "Wismo", "Zendesk"];
  const debouncedCustomerId = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerIdFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setIsCustomerIDTyping(false);
      }, 5000),
    []
  );

  const debouncedFullName = useMemo(
    () =>
      debounce((value: string) => {
        setFullNameFilter(value ? value : undefined);
        setPage(1);
        setIsFullNameTyping(false);
      }, 5000),
    []
  );

  const debouncedPhoneNumber = useMemo(
    () =>
      debounce((value: string) => {
        setPhoneNumberFilter(value ? value : undefined);
        setPage(1);
        setIsPhoneNumberTyping(false);
      }, 5000),
    []
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1);
        setIsTyping(false);
      }, 5000),
    []
  );

  return (
    <Box flex={1} p={0}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pr={3}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Typography
            variant="h2"
            p={2}
            mb={1}
            color="#0D0D12"
            fontWeight={700}
          >
            Profile Information
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={0}
            mb={2}
            pl={1}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              gap={2}
              pl={1}
            >
              <Box mt={-1}>
                <Box display={"flex"} alignItems="center" gap={1}>
                  <CustomSearchField
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search by Email"
                    InputProps={{
                      endAdornment: searchInput.trim() !== "" && isTyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                    }}
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
              <Box ml={0}>
                {/* <FormControl size="small">
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
                  </FormControl> */}
                <FormControl size="small" sx={{ width: 140 }}>
                  <TextField
                    label="Customer ID"
                    value={customerIdInput.toUpperCase()}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCustomerIdInput(value);

                      if (value.trim() === "") {
                        setCustomerIdFilter(undefined);
                        debouncedCustomerId.cancel(); // cancel pending debounce
                      } else {
                        debouncedCustomerId(value);
                        setIsCustomerIDTyping(true);
                      }
                    }}
                    size="small"
                    placeholder="Customer ID"
                    InputProps={{
                      endAdornment: customerIdInput.trim() !== "" &&
                        isCustomerIDTyping && (
                          <InputAdornment position="end">
                            <CircularProgress size={20} />
                          </InputAdornment>
                        ),
                    }}
                  />
                </FormControl>
              </Box>
              <FormControl size="small" sx={{ width: 150 }}>
                <TextField
                  label="Full Name"
                  value={fullNameInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFullNameInput(value);

                    if (value.trim() === "") {
                      setFullNameFilter(undefined);
                      debouncedFullName.cancel();
                    } else {
                      debouncedFullName(value);
                      setIsFullNameTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Full Name"
                  InputProps={{
                    endAdornment: fullNameInput.trim() !== "" &&
                      isFullNameTyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl>
              <FormControl size="small" sx={{ width: 200, ml: 2 }}>
                <TextField
                  label="Phone Number"
                  value={phoneNumberInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPhoneNumberInput(value);

                    if (value.trim() === "") {
                      setPhoneNumberFilter(undefined);
                      debouncedPhoneNumber.cancel();
                    } else {
                      debouncedPhoneNumber(value);
                      setIsPhoneNumberTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Phone Number"
                  InputProps={{
                    endAdornment: phoneNumberInput.trim() !== "" &&
                      isPhoneNumberTyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl>
              <Box display={"flex"} justifyContent={"space-between"} gap={2}>
                <FormControl size="small" sx={{ width: 150 }}>
                  <Autocomplete
                    size="small"
                    options={sourceOptions}
                    value={sourceFilter ?? "All"}
                    onChange={(e, newValue) => {
                      setSourceFilter(
                        !newValue || newValue === "All" ? undefined : newValue
                      );

                      setPage(1);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Source"
                        placeholder="Source"
                      />
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
                    sx={{ width: 100 }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={40}
          >
            <Box>
              {/* <FormControl size="small" sx={{ ml: 2 }}>
                    <TextField
                      label="Full Name"
                      value={fullNameFilter || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFullNameFilter(value ? value : undefined);
                        setPage(1);
                      }}
                      size="small"
                      placeholder="Search by Full Name"
                    />
                  </FormControl>
                  <FormControl size="small" sx={{ width: 200, ml: 2 }}>
                    <TextField
                      label="Phone Number"
                      value={phoneNumberFilter || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPhoneNumberFilter(value ? value : undefined);
                        setPage(1);
                      }}
                      size="small"
                      placeholder="Phone Number"
                    />
                  </FormControl> */}
            </Box>
          </Box>
        </Box>
      </Box>

      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={userCol}
          onRowClicked={onRowClicked}
          height={465}
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
