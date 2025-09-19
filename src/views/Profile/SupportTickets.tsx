"use client";
import { support_tickets } from "@/constants/Grid-Table/ColDefs";
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
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React, { useState, useMemo, useEffect } from "react";

import { useGetSupportTicketsQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";
import CustomSearchField from "@/components/Common/CustomSearch";
import debounce from "lodash.debounce";
import { Phone, Send, SpaceBar } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { exportProfilesToPDF } from "@/utils/exportPDF";
import ResponsiveDashboard from "./TabsContent/ResponsiveDashboard";
import { getRowStyle } from "@/utils/gridStyles";

interface OrdersProps {
  customerId?: string; // optional prop
}

const SupportTickets = ({ customerId }: { customerId?: string }) => {
  const ticketColumns = useSupportTicketColumn(support_tickets);

  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [storeFilter, setStoreFilter] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [customerIdFilter, setCustomerIdFilter] = useState<string | undefined>(
    undefined
  );
  const [ticketIdFilter, setTicketIdFilter] = useState<string | undefined>(
    undefined
  );
  const [searchInput, setSearchInput] = useState("");

  const [customerNameFilter, setCustomerNameFilter] = useState<
    string | undefined
  >(undefined);
  const [phoneNumberFilter, setPhoneNumberFilter] = useState<
    string | undefined
  >(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );
  const [tagsFilter, setTagsFilter] = useState<string | undefined>(undefined);
  const [customerNameInput, setCustomerNameInput] = useState("");
  const [ticketIdInput, setTicketIdInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [customerIdInput, setCustomerIdInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [dateInput, setDateInput] = useState<any>(null);
  const [isCustomerIdTyping, setIsCustomerIdTyping] = useState(false);
  const [isCustomerNameTyping, setIsCustomerNameTyping] = useState(false);
  const [isPhoneNumberTyping, setIsPhoneNumberTyping] = useState(false);
  const [isTicketIdTyping, setIsTicketIdTyping] = useState(false);
  const [isTagsTyping, setIsTagsTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const debouncedCustomerId = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerIdFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setIsCustomerIdTyping(false);
      }, 5000),
    []
  );

  const debouncedCustomerName = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerNameFilter(value ? value : undefined);
        setPage(1);
        setIsCustomerNameTyping(false);
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
  const debouncedTicketId = useMemo(
    () =>
      debounce((value: string) => {
        setTicketIdFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setIsTicketIdTyping(false);
      }, 5000),
    []
  );
  const debouncedTags = useMemo(
    () =>
      debounce((value: string) => {
        setTagsFilter(value || undefined);
        setPage(1);
        setIsTagsTyping(false);
      }, 5000),
    []
  );
  const statusOptions = [
    "hold",
    "closed",
    "deleted",
    "pending",
    "open",
    "new",
    "solved",
  ];

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

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1);
        setIsTyping(false);
      }, 5000),
    []
  );

  const { data, isLoading, refetch, isFetching } = useGetSupportTicketsQuery(
    {
      page,
      page_size: pageSize,
      customer_id: customerIdFilter || customerId || undefined,
      ticket_id: ticketIdFilter || undefined,
      customer_name: customerNameFilter || undefined,
      phone_no: phoneNumberFilter || undefined,
      email: searchTerm || undefined,
      status: statusFilter || undefined,
      tags: tagsFilter || undefined,
      created_at: dateFilter || undefined,
    },
    { skip: false }
  );

  const rowData = useMemo(() => {
    const results = data?.data || [];
    // Customer Name, Email, Phone No
    return results.map((item: any) => {
      return {
        ticket_id: item.ticket_id,
        customer_id: item.customer_id || "",
        customer_name: item.customer_name || "",
        email: item.email || "",
        phone_no: item.phone_no || "",
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
    const event = params?.event;
    if ((event?.target as HTMLElement).closest(".MuiIconButton-root")) {
      return; // ignore clicks from any MUI icon button
    }
    if (selectedTicket?.ticket_id === params.data.ticket_id) {
      setSelectedTicket(null);
    } else {
      setSelectedTicket(params.data);
    }
  };

  // const getRowStyle = (params: any) => {
  //   if (selectedTicket?.ticket_id === params.data.ticket_id) {
  //     return {
  //       backgroundColor: "#E0E0E0", // MUI primary.main (blue 700)
  //       color: "#fff !important", //           // white text for contrast
  //       fontWeight: 600, // makes it stand out a bit more
  //     };
  //   }
  //   return {};
  // };

  return (
    <Box display="flex">
      <Box flex={1} p={1}>
        {!customerId && (
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            pl={8}
            gap={1}
            mb={2}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
              gap={35}
            >
              <Box display="flex" alignItems="center" gap={5}>
                <Typography variant="h1" p={1} color="#0D0D12" fontWeight={700}>
                  Support Tickets
                </Typography>
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
              </Box>
              <Box display="flex" alignItems="center" gap={3} ml={5}>
                <FormControl size="small" sx={{ width: 150 }}>
                  <Autocomplete
                    size="small"
                    options={statusOptions}
                    value={statusFilter ?? "All"}
                    onChange={(e, newValue) => {
                      setStatusFilter(
                        !newValue || newValue === "All" ? undefined : newValue
                      );

                      setPage(1);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        placeholder="Status"
                      />
                    )}
                  />
                </FormControl>

                {/* <FormControl size="small" sx={{ width: 190 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Created At"
                      value={dateInput}
                      onChange={(newValue) => {
                        setDateInput(newValue);
                        if (!newValue) {
                          setDateFilter(undefined);
                        } else {
                          // Format as backend expects (e.g., YYYY-MM-DD)
                          setDateFilter(dayjs(newValue).format("YYYY-MM-DD"));
                        }
                        setPage(1);
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          placeholder: "Select Date",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl> */}

                {/* <FormControl size="small" sx={{ width: 190 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
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
                      // slots={{
                      //   textField: (textFieldProps) => (
                      //     <TextField
                      //       {...textFieldProps}
                      //       size="small"
                      //       placeholder="Select Date"
                      //       InputProps={{
                      //         ...textFieldProps.InputProps,
                      //         endAdornment: dateInput ? (
                      //           <IconButton
                      //             size="small"
                      //             onClick={() => {
                      //               setDateInput(null);
                      //               setDateFilter(undefined);
                      //               setPage(1);
                      //             }}
                      //           >
                      //             <CloseIcon fontSize="small" />
                      //           </IconButton>
                      //         ) : (
                      //           textFieldProps.InputProps?.endAdornment
                      //         ),
                      //       }}
                      //     />
                      //   ),
                      // }}
                      slots={{
                        textField: ({ sectionListRef, ...rest }) => (
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
                        ),
                      }}
                    />
                  </LocalizationProvider>
                </FormControl> */}

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
            <Box display={"flex"} alignItems={"center"} gap={2} ml={2}>
              <FormControl size="small" sx={{ width: 150 }}>
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
                      setIsCustomerIdTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Customer ID"
                  InputProps={{
                    endAdornment: customerIdInput.trim() !== "" &&
                      isCustomerIdTyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl>

              <FormControl size="small" sx={{ width: 150 }}>
                <TextField
                  label="Ticket ID"
                  value={ticketIdInput || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTicketIdInput(value);
                    if (value.trim() === "") {
                      setTicketIdFilter(undefined);
                      debouncedTicketId.cancel(); // cancel pending debounce
                    } else {
                      debouncedTicketId(value);
                      setIsTicketIdTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Ticket ID"
                  InputProps={{
                    endAdornment: ticketIdInput.trim() !== "" &&
                      isTicketIdTyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl>

              <FormControl size="small" sx={{ width: 180 }}>
                <TextField
                  label="Tags"
                  value={tagsInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTagsInput(value);
                    if (value.trim() === "") {
                      setTagsFilter(undefined);
                      debouncedTags.cancel(); // cancel pending debounce
                    } else {
                      debouncedTags(value);
                      setIsTagsTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Tags"
                  InputProps={{
                    endAdornment: tagsInput.trim() !== "" && isTagsTyping && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl size="small" sx={{ ml: 2, width: 200 }}>
                <TextField
                  label="Customer Name"
                  value={customerNameInput || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomerNameInput(value);
                    if (value.trim() === "") {
                      setCustomerNameFilter(undefined);
                      debouncedCustomerName.cancel(); // cancel pending debounce
                    } else {
                      debouncedCustomerName(value);
                      setIsCustomerNameTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Customer Name"
                  InputProps={{
                    endAdornment: customerNameInput.trim() !== "" &&
                      isCustomerNameTyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl>
              <FormControl size="small" sx={{ width: 190 }}>
                <TextField
                  label="Phone Number"
                  value={phoneNumberInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPhoneNumberInput(value);
                    if (value.trim() === "") {
                      setPhoneNumberFilter(undefined);
                      debouncedPhoneNumber.cancel(); // cancel pending debounce
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
              <FormControl size="small" sx={{ width: 190 }}>
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
                        const { sectionListRef, areAllSectionsEmpty, ...rest } =
                          textFieldProps;

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
              </FormControl>
            </Box>
          </Box>
        )}

        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <ResponsiveDashboard
            rowData={rowData}
            userCol={ticketColumns}
            onRowClicked={onRowClicked}
            // getRowStyle={getRowStyle}
            getRowStyle={getRowStyle(highlightedId)}
            selectedTicket={selectedTicket?.ticket_id}
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
