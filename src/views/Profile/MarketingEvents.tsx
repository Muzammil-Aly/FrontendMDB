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
  InputAdornment,
  CircularProgress,
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
import { getRowStyle } from "@/utils/gridStyles";
import SearchInput from "@/components/Common/CustomSearch/SearchInput";
import CustomDatePicker from "@/components/Common/DatePicker/DatePicker";
import CustomSelect from "@/components/Common/CustomTabs/CustomSelect";
interface MarketingEventsProps {
  customerId?: string; // optional prop
}
const MarketingEvents: React.FC<MarketingEventsProps> = ({ customerId }) => {
  const eventCol = useMarketingEvents(marketing_events);
  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );
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
  const [isEventIdTyping, setIsEventIdTyping] = useState(false);
  const [isCustomerIdTyping, setIsCustomerIdTyping] = useState(false);
  const [isCustomerNameTyping, setIsCustomerNameTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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

      event_timestamp: item.event_timestamp
        ? item.event_timestamp.split("T")[0]
        : "N/A",
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

  const debouncedCustomerName = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerNameFilter(value ? value : undefined);
        setPage(1);
        setIsCustomerNameTyping(false);
      }, 5000),
    []
  );
  const debouncedEventId = useMemo(
    () =>
      debounce((value: string) => {
        setEventIdFilter(value);
        setPage(1);
        setIsEventIdTyping(false);
      }, 5000),
    []
  );
  const debouncedCustomerId = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerIdFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setIsCustomerIdTyping(false);
      }, 5000),
    []
  );
  const debouncedCampainName = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerNameFilter(value ? value : undefined);
        setPage(1);
        setIsCustomerNameTyping(false);
      }, 5000),
    []
  );
  return (
    <Box display="flex">
      <Box flex={1} pl={8}>
        {!customerId && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            flexDirection={"column"}
            // pr={3}
          >
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"flex-start"}
              // gap={7}
              mb={2}
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
                    // WebkitTextFillColor: "transparent",
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
                  Marketing Events
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              gap={2}
              mb={2}
              pl={"10px"}
              // pr={55}
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

              {/* <FormControl size="small" sx={{ width: 200 }}>
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
              </FormControl> */}
              <SearchInput
                label="Customer Name"
                value={customerNameInput || ""}
                setValue={(val) => {
                  setCustomerNameInput(val);
                  setIsCustomerNameTyping(true);
                }}
                setFilter={setCustomerNameFilter}
                debouncedFunction={debouncedCustomerName}
                loading={isCustomerNameTyping}
                width={180}
              />
              {/* <FormControl size="small" sx={{ width: 200 }}>
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
                      setIsEventIdTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Event ID"
                  InputProps={{
                    endAdornment: eventIdInput.trim() !== "" &&
                      isEventIdTyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl> */}
              <SearchInput
                label="Event ID"
                value={eventIdInput}
                setValue={(val) => {
                  setEventIdInput(val);
                  setIsEventIdTyping(true);
                }}
                setFilter={setEventIdFilter}
                debouncedFunction={debouncedEventId}
                loading={isEventIdTyping}
              />

              {/* <FormControl size="small" sx={{ width: 200 }}>
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
              </FormControl> */}
              <SearchInput
                label="Customer ID"
                value={customerIdInput}
                setValue={(val) => {
                  setCustomerIdInput(val);
                  setIsCustomerIdTyping(true);
                }}
                setFilter={setCustomerIdFilter}
                debouncedFunction={debouncedCustomerId}
                loading={isCustomerIdTyping}
              />

              {/* <FormControl size="small" sx={{ width: 220 }}>
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
              </FormControl> */}
              <CustomDatePicker
                label="Event Time Stamp"
                value={dateInput}
                setValue={setDateInput}
                setFilter={setDateFilter}
                setPage={setPage}
              />
              <CustomSelect
                label="Page Size"
                value={pageSize}
                options={[10, 50, 100]}
                onChange={(val) => {
                  setPageSize(val); // val is already a number
                  setPage(1);
                }}
              />
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
            getRowStyle={getRowStyle(highlightedId)}
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
