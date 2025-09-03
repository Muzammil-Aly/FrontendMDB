"use client";
import { users } from "@/constants/Grid-Table/ColDefs";

import useUsersColumn from "@/hooks/Ag-Grid/useUsersColumn";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Autocomplete,
  CircularProgress,
  InputAdornment,
  ListSubheader,
} from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";
import CustomSearchField from "@/components/Common/CustomSearch";
import { Phone, Send } from "@mui/icons-material";
import debounce from "lodash.debounce";
import { useGetProfilesQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";

import Orders from "./Orders";
import SupportTickets from "./SupportTickets";

import ResponsiveDashboard from "./TabsContent/ResponsiveDashboard";
import MarketingEvents from "./MarketingEvents";
import DetailedInfo from "./DetailedInfo";
interface SegmentOption {
  id: string;
  name: string;
}
const Profile = () => {
  const userCol = useUsersColumn(users);

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );

  React.useState<string | number | null>(null); // for row style

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [activeMenu, setActiveMenu] = useState("Profile Information");
  const menuItems = [
    "Profile Information",

    "Customer Profiles",
    "Orders",
    "Support Tickets",
    "Marketing Events",
  ];

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
  const [isTyping, setIsTyping] = useState(false);
  const [isCustomerIDTyping, setIsCustomerIDTyping] = useState(false);
  const [isFullNameTyping, setIsFullNameTyping] = useState(false);
  const [isPhoneNumberTyping, setIsPhoneNumberTyping] = useState(false);
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

  // const onRowClicked = (params: any) => {
  //   if (selectedUser?.customer_id === params.data.customer_id) {
  //     // same row clicked again → clear & close
  //     setSelectedUser(null);
  //   } else {
  //     // new row → set and open
  //     setSelectedUser(params.data);
  //   }
  // };
  // const onRowClicked = (params: any) => {
  //   const custId = params.data.customer_id;

  //   // Only allow numeric IDs (either number or string of digits)
  //   const numericCustId =
  //     typeof custId === "number"
  //       ? custId
  //       : /^\d+$/.test(custId)
  //       ? parseInt(custId, 10)
  //       : null;

  //   if (!numericCustId) {
  //     // If not numeric → do nothing (or show toast/message if you want)
  //     return;
  //   }

  //   if (selectedUser?.customer_id === numericCustId) {
  //     // same row clicked again → clear & close
  //     setSelectedUser(null);
  //   } else {
  //     // new row → set and open
  //     setSelectedUser({ ...params.data, customer_id: numericCustId });
  //   }
  // };

  // const getRowStyle = (params: any) => {
  //   if (selectedUser?.customer_id === params.data.customer_id) {
  //     return {
  //       backgroundColor: "#E0E0E0", // MUI primary.main (blue 700)
  //       color: "#fff !important", //           // white text for contrast
  //       fontWeight: 600, // makes it stand out a bit more
  //     };
  //   }
  //   return {};
  // };

  const onRowClicked = (params: any) => {
    const { customer_id } = params.data;

    // always set highlight for clicked row
    setHighlightedId(customer_id);

    // check if ID is numeric
    if (!isNaN(Number(customer_id))) {
      // numeric → send to next component
      if (selectedUser?.customer_id === customer_id) {
        setSelectedUser(null); // toggle off
      } else {
        setSelectedUser(params.data);
      }
    } else {
      // string → don't send to next component
      setSelectedUser(null);
    }
  };

  const getRowStyle = (params: any) => {
    if (highlightedId === params.data.customer_id) {
      return {
        backgroundColor: "#E0E0E0",
        color: "#fff !important",
        fontWeight: 600,
      };
    }
    return {};
  };

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

  const menuConfig: Record<string, { component?: React.ReactNode }> = {
    Orders: {
      component: <Orders />,
    },

    "Support Tickets": {
      component: <SupportTickets />,
    },

    "Marketing Events": {
      component: <MarketingEvents />,
    },
    "Profile Information": {
      component: <DetailedInfo />,
    },
  };

  const sourceOptions = ["All", "Klaviyo", "Shopify", "Wismo", "Zendesk"];

  return (
    <Box display="flex">
      <Box
        sx={{
          width: 200,
          height: 800,
          borderRight: "1px solid #ddd",
          bgcolor: "#f9f9f9",
          p: 2,
        }}
      >
        <Typography
          variant="h1"
          p={2}
          color="#0D0D12"
          fontWeight={700}
          mb={10}
          mt={1}
        >
          UCP
        </Typography>
        {menuItems.map((item) => (
          <Typography
            key={item}
            component="h2"
            variant="subtitle2"
            onClick={() => setActiveMenu(item)}
            sx={{
              p: 2,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: activeMenu === item ? "bold" : "normal",
              bgcolor: activeMenu === item ? "#e0e0e0" : "transparent",
              borderRadius: "10px",
            }}
            // sx={{
            //           p: 1,
            //           borderRadius: 1,
            //           cursor: "pointer",
            //           fontWeight: activeMenu ? 600 : 400,
            //           bgcolor: activeMenu ? "#e0e0e0" : "transparent",
            //           "&:hover": { bgcolor: "#F3F4F6" },
            //           fontSize: 15,
            //         }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {activeMenu === "Customer Profiles" && (
        <Box flex={1} p={1}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pr={3}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="h1" p={2} color="#0D0D12" fontWeight={700}>
                Profile
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
                          endAdornment: searchInput.trim() !== "" &&
                            isTyping && (
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
                    {/* <FormControl size="small" sx={{ width: 140 }}>
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
                          }
                        }}
                        size="small"
                        placeholder="Customer ID"
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
                            setIsCustomerIDTyping(true);
                            debouncedCustomerId(value);
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
                          setIsFullNameTyping(true);
                          debouncedFullName(value);
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
                          setIsPhoneNumberTyping(true);
                          debouncedPhoneNumber(value);
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
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <FormControl size="small" sx={{ width: 150 }}>
                      <Autocomplete
                        size="small"
                        options={sourceOptions}
                        value={sourceFilter ?? "All"}
                        onChange={(e, newValue) => {
                          setSourceFilter(
                            !newValue || newValue === "All"
                              ? undefined
                              : newValue
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
            <ResponsiveDashboard
              rowData={rowData}
              userCol={userCol}
              onRowClicked={onRowClicked}
              height={465}
              getRowStyle={getRowStyle}
              selectedCustId={selectedUser?.customer_id}
              enablePagination
              currentPage={page}
              totalPages={data?.total_pages || 1}
              onPageChange={(newPage: any) => setPage(newPage)}
              pagination={false}
              currentMenu="profiles"
              paginationPageSize={pageSize}
            />
          )}
        </Box>
      )}

      {menuConfig[activeMenu] && (
        <Box flex={1} p={1}>
          {menuConfig[activeMenu]?.component
            ? menuConfig[activeMenu].component
            : null}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
