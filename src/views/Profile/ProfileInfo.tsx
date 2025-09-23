"use client";
import AgGridTable from "@/components/ag-grid";
import { users } from "@/constants/Grid-Table/ColDefs";

import useUsersColumn from "@/hooks/Ag-Grid/useUsersColumn";
import ClearIcon from "@mui/icons-material/Clear";

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
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React, { useState, useMemo, useEffect } from "react";
import UserDetailsModal from "./UserDetailsModal";
import CustomSearchField from "@/components/Common/CustomSearch";
import { Phone, Send } from "@mui/icons-material";
import debounce from "lodash.debounce";
import { useGetProfilesQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getRowStyle } from "@/utils/gridStyles";
import SearchInput from "@/components/Common/CustomSearch/SearchInput";
import CustomDatePicker from "@/components/Common/DatePicker/DatePicker";
import CustomSelect from "@/components/Common/CustomTabs/CustomSelect";

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
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [lastDateFilter, setLastDateFilter] = useState<string | undefined>(
    undefined
  );
  const [lastDateInput, setLastDateInput] = useState<any>(null);

  const [dateInput, setDateInput] = useState<any>(null);
  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );
  const { data, isLoading, refetch, isFetching } = useGetProfilesQuery(
    {
      page,
      page_size: pageSize,
      email: searchTerm || undefined,
      source: sourceFilter || undefined,
      customer_id: customerIdFilter || undefined,
      full_name: fullNameFilter || undefined,
      phone: phoneNumberFilter || undefined,
      created_at: dateFilter || undefined,
      last_order_date: lastDateFilter || undefined,
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
    const event = params?.event;
    if ((event?.target as HTMLElement).closest(".MuiIconButton-root")) {
      return; // ignore clicks from any MUI icon button
    }
    const { customer_id } = params.data;

    setSelectedUser(params.data);

    setHighlightedId(customer_id);

    setModalOpen(true);
  };
  // const getRowStyle = (params: any) => {
  //   if (highlightedId === params.data.customer_id) {
  //     return {
  //       backgroundColor: "#E0E0E0",
  //       color: "#fff !important",
  //       fontWeight: 600,
  //     };
  //   }
  //   return {};
  // };
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
    <Box flex={1} pl={8}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pr={3}
      >
        <Box display={"flex"} flexDirection={"column"}>
          {/* <Typography
            variant="h2"
            p={2}
            mb={1}
            color="#0D0D12"
            fontWeight={700}
          >
            Profile Information
          </Typography> */}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box
              sx={{
                textAlign: "center",
                p: 3,
                // background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                borderRadius: "16px",
                // boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: "2.5rem",
                  background: "linear-gradient(90deg, black)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.5px",
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "60%",
                    height: "4px",
                    left: "20%",
                    bottom: -8,
                    // background: "linear-gradient(90deg, #004080)",
                    borderRadius: "4px",
                  },
                }}
              >
                Profile Information
              </Typography>
            </Box>

            <Box
              display={"flex"}
              alignItems={"center"}
              gap={2}
              justifyContent={"space-between"}
            >
              <Box>
                {/* <FormControl size="small" sx={{ width: 150 }}>
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
                </FormControl> */}

                <FormControl size="small" sx={{ width: 180 }}>
                  <Autocomplete
                    size="small"
                    options={[...sourceOptions]}
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
                        placeholder="Select Source"
                        size="small"
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: "12px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                            "&:hover": {
                              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1976d2",
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Box>
              <Box>
                {/* <FormControl size="small">
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
                </FormControl> */}
                <CustomSelect
                  label="Page Size"
                  value={pageSize}
                  options={[10, 50, 100]}
                  onChange={(val) => {
                    setPageSize(val); // val is already a number
                    setPage(1);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={0}
            mb={2}
            // pl={1}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              gap={2}
              pl={1}
            >
              <Box mt={0}>
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
                {/* <FormControl size="small" sx={{ width: 135 }}>
                  <TextField
                    label="Customer ID"
                    variant="outlined"
                    value={customerIdInput.toUpperCase()}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCustomerIdInput(value);

                      if (value.trim() === "") {
                        setCustomerIdFilter(undefined);
                        debouncedCustomerId.cancel();
                      } else {
                        debouncedCustomerId(value);
                        setIsCustomerIDTyping(true);
                      }
                    }}
                    size="small"
                    placeholder="Customer ID"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
                        transition: "0.2s",
                        "&:hover": {
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment:
                        customerIdInput.trim() !== "" ? (
                          <InputAdornment position="end">
                            {isCustomerIDTyping ? (
                              <CircularProgress size={18} />
                            ) : (
                              <IconButton
                                size="small"
                                sx={{
                                  color: "#888",
                                  "&:hover": {
                                    color: "#d32f2f",
                                    bgcolor: "transparent",
                                  },
                                }}
                                onClick={() => {
                                  setCustomerIdInput("");
                                  setCustomerIdFilter(undefined);
                                  debouncedCustomerId.cancel();
                                }}
                              >
                                <ClearIcon fontSize="small" />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ) : null,
                    }}
                  />
                </FormControl> */}
                <SearchInput
                  label="Customer ID"
                  value={customerIdInput}
                  setValue={(val) => {
                    setCustomerIdInput(val);
                    setIsCustomerIDTyping(true);
                  }}
                  setFilter={setCustomerIdFilter}
                  debouncedFunction={debouncedCustomerId}
                  loading={isCustomerIDTyping}
                />
              </Box>
              {/* <FormControl size="small" sx={{ width: 150 }}>
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
              </FormControl> */}

              <SearchInput
                label="Full Name"
                value={fullNameInput}
                setValue={(val) => {
                  setFullNameInput(val);
                  setIsFullNameTyping(true);
                }}
                setFilter={setFullNameFilter}
                debouncedFunction={debouncedFullName}
                loading={isFullNameTyping}
              />

              {/* <FormControl size="small" sx={{ width: 200, ml: 2 }}>
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
              </FormControl> */}
              <SearchInput
                label="Phone Number"
                value={phoneNumberInput}
                setValue={(val) => {
                  setPhoneNumberInput(val);
                  setIsPhoneNumberTyping(true);
                }}
                setFilter={setPhoneNumberFilter}
                debouncedFunction={debouncedPhoneNumber}
                loading={isPhoneNumberTyping}
                width={160}
              />

              <Box display={"flex"} justifyContent={"space-between"} gap={2}>
                {/* <FormControl size="small" sx={{ width: 190 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      enableAccessibleFieldDOMStructure={false}
                      label="Created At"
                      value={dateInput}
                      onChange={(newValue) => {
                        if (!newValue) {
                          setDateInput(null);
                          setDateFilter(undefined);
                        } else {
                          setDateInput(newValue);
                          setDateFilter(dayjs(newValue).format("YYYY-MM-DD"));
                        }
                        setPage(1);
                      }}
                      slots={{
                        textField: (textFieldProps) => {
                          // filter out unwanted internal props
                          const {
                            sectionListRef,
                            areAllSectionsEmpty,
                            ...rest
                          } = textFieldProps;

                          return (
                            <TextField
                              {...rest}
                              size="small"
                              placeholder="Select Date"
                              InputProps={{
                                ...rest.InputProps,
                                endAdornment: dateInput ? (
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setDateInput(null);
                                      setDateFilter(undefined);
                                      setPage(1);
                                    }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                ) : (
                                  rest.InputProps?.endAdornment
                                ),
                              }}
                            />
                          );
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl> */}

                <CustomDatePicker
                  label="Created At"
                  value={dateInput}
                  setValue={setDateInput}
                  setFilter={setDateFilter}
                  setPage={setPage}
                />
              </Box>
              <Box>
                {/* <FormControl size="small" sx={{ width: 190 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      enableAccessibleFieldDOMStructure={false}
                      label="Last Order Date"
                      value={lastDateInput}
                      onChange={(newValue) => {
                        if (!newValue) {
                          setLastDateInput(null);
                          setLastDateFilter(undefined);
                        } else {
                          setLastDateInput(newValue);
                          setLastDateFilter(
                            dayjs(newValue).format("YYYY-MM-DD")
                          );
                        }
                        setPage(1);
                      }}
                      slots={{
                        textField: (textFieldProps) => {
                          // filter out unwanted internal props
                          const {
                            sectionListRef,
                            areAllSectionsEmpty,
                            ...rest
                          } = textFieldProps;

                          return (
                            <TextField
                              {...rest}
                              size="small"
                              placeholder="Select Date"
                              InputProps={{
                                ...rest.InputProps,
                                endAdornment: lastDateInput ? (
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setLastDateInput(null);
                                      setLastDateFilter(undefined);
                                      setPage(1);
                                    }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                ) : (
                                  rest.InputProps?.endAdornment
                                ),
                              }}
                            />
                          );
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl> */}

                <CustomDatePicker
                  label="Last Order Date"
                  value={lastDateInput}
                  setValue={setLastDateInput}
                  setFilter={setLastDateFilter}
                  setPage={setPage}
                />
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
          // getRowStyle={getRowStyle}
          getRowStyle={getRowStyle(highlightedId)}
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
