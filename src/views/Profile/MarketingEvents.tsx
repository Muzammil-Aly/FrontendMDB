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
  IconButton,
} from "@mui/material";
import { useGetCustomerEventsQuery } from "@/redux/services/profileApi";
import CloseIcon from "@mui/icons-material/Close";

import Loader from "@/components/Common/Loader";
import CustomSearchField from "@/components/Common/CustomSearch";
import { Phone, Send, SpaceBar } from "@mui/icons-material";
import debounce from "lodash.debounce";

import { marketing_events } from "@/constants/Grid-Table/ColDefs";
import useMarketingEvents from "@/hooks/Ag-Grid/useMarketingItems";
import AgGridTable from "@/components/ag-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
interface MarketingEventsProps {
  customerId?: string; // optional prop
}
const MarketingEvents: React.FC<MarketingEventsProps> = ({ customerId }) => {
  const eventCol = useMarketingEvents(marketing_events);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [eventIdFilter, setEventIdFilter] = useState<string | undefined>();
  const [customerIdFilter, setCustomerIdFilter] = useState<
    string | undefined
  >();
  const [campaignFilter, setCampaignFilter] = useState<string | undefined>();
  const [eventTypeFilter, setEventTypeFilter] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [customerNameFilter, setCustomerNameFilter] = useState<
    string | undefined
  >(undefined);
  const [customerNameInput, setCustomerNameInput] = useState("");
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [dateInput, setDateInput] = useState<any>(null);
  const [eventIdInput, setEventIdInput] = useState("");
  const [customerIdInput, setCustomerIdInput] = useState("");
  const [campaignNameInput, setCampaignNameInput] = useState("");

  const { data, isLoading, isFetching } = useGetCustomerEventsQuery({
    page,
    page_size: pageSize,
    event_id: eventIdFilter,
    customer_id: customerIdFilter || customerId,
    campaign_name: campaignFilter,
    email: searchTerm || undefined,
    customer_name: customerNameFilter || undefined,
    event_type: eventTypeFilter,
    event_timestamp: dateFilter || undefined,
  });

  const rowData = useMemo(() => {
    const results = data?.data || [];
    return results.map((item: any) => ({
      event_id: item.event_id,
      event_type: item.event_type,
      customer_id: item.customer_id ?? "N/A",
      customer_name: item.customer_name || "N/A",
      email: item.email || "N/A",
      event_timestamp: item.event_timestamp,
      campaign_name: item.campaign_name,
    }));
  }, [data]);
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
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1);
      }, 5000),
    []
  );
  const debouncedCustomerName = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerNameFilter(value ? value : undefined);
        setPage(1);
      }, 5000),
    []
  );
  const debouncedEventId = useMemo(
    () =>
      debounce((value: string) => {
        setEventIdFilter(value);
        setPage(1);
      }, 5000),
    []
  );
  const debouncedCustomerId = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerIdFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
      }, 5000),
    []
  );
  const debouncedCampainName = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerNameFilter(value ? value : undefined);
        setPage(1);
      }, 5000),
    []
  );
  return (
    <Box display="flex">
      <Box flex={1} p={1}>
        {!customerId && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={"column"}
            pr={3}
          >
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
              gap={7}
              mb={2}
            >
              <Typography variant="h1" p={1} color="#0D0D12" fontWeight={700}>
                Marketing Events
              </Typography>
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

              {/* <FormControl size="small" sx={{ width: 220 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Event Time Stamp"
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
              {/* <FormControl size="small" sx={{ width: 220 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Event Time Stamp "
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
                      textField: (textFieldProps) => (
                        <TextField
                          {...textFieldProps}
                          size="small"
                          placeholder="Select Date"
                          InputProps={{
                            ...textFieldProps.InputProps,
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
                              textFieldProps.InputProps?.endAdornment
                            ),
                          }}
                        />
                      ),
                    }}
                  />
                </LocalizationProvider>
              </FormControl> */}
              <FormControl size="small" sx={{ width: 220 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    enableAccessibleFieldDOMStructure={false}
                    label="Event Time Stamp "
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              gap={2}
              mb={2}
              pr={35}
            >
              <FormControl size="small">
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
                    }
                  }}
                  size="small"
                  placeholder="Customer Name"
                />
              </FormControl>
              <FormControl>
                <TextField
                  label="Event ID"
                  value={eventIdInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEventIdInput(value);
                    if (value.trim() === "") {
                      setEventIdFilter(undefined);
                      debouncedEventId.cancel(); // cancel pending debounce
                    } else {
                      debouncedEventId(value);
                    }
                  }}
                  size="small"
                  placeholder="Event ID"
                />
              </FormControl>
              <FormControl>
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
              </FormControl>

              {/* <TextField
              label="Event Type"
              value={eventTypeFilter || ""}
              onChange={(e) => {
                setEventTypeFilter(e.target.value || undefined);
                setPage(1);
              }}
              size="small"
            /> */}
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
            style={{ width: "100%", overflowX: "auto" }}
            paginationPageSize={pageSize}
          />
        )}
      </Box>
    </Box>
  );
};

export default MarketingEvents;
