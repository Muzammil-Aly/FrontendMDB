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
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import Loader from "@/components/Common/Loader";
import debounce from "lodash.debounce";
import CustomDatePicker from "@/components/Common/DatePicker/DatePicker";

import { orders } from "@/constants/Grid-Table/ColDefs";
import useOrdersColumn from "@/hooks/Ag-Grid/useOrdersColumn";
import { useGetCustomerOrdersQuery } from "@/redux/services/profileApi";
import { exportProfilesToPDF } from "@/utils/exportPDF";
import ResponsiveDashboard from "./TabsContent/ResponsiveDashboard";
interface OrdersProps {
  customerId?: string;
}
import CustomSearchField from "@/components/Common/CustomSearch";
import { Phone, Send } from "@mui/icons-material";

import { getRowStyle } from "@/utils/gridStyles";
import SearchInput from "@/components/Common/CustomSearch/SearchInput";
import CustomSelect from "@/components/Common/CustomTabs/CustomSelect";
const Orders = ({ customerId }: { customerId?: string }) => {
  const orderCol = useOrdersColumn(orders);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderIdFilter, setOrderIdFilter] = useState<string | undefined>(
    undefined
  );
  const [customerNameFilter, setCustomerNameFilter] = useState<
    string | undefined
  >(undefined);
  const [customerReferenceNoFilter, setCustomerReferenceNoFilter] = useState<
    string | undefined
  >(undefined);
  const [shippingAddressFilter, setShippingAddressFilter] = useState<
    string | undefined
  >(undefined);

  const [trackigFilter, setTrackingFilter] = useState<string | undefined>(
    undefined
  );
  const [orderIdInput, setOrderIdInput] = useState("");
  const [customerIdInput, setCustomerIdInput] = useState("");
  const [customerIdFilter, setCustomerIdFilter] = useState<string | undefined>(
    undefined
  );
  const [isCustomerIDTyping, setIsCustomerIDTyping] = useState(false);

  const [customerNameInput, setCustomerNameInput] = useState("");
  const [shippingAddressInput, setShippingAddressInput] = useState("");
  const [customerReferenceNoInput, setCustomerReferenceNoInput] = useState("");
  const [trackingInput, setTrackingInput] = useState("");
  const [orderIdtyping, setIsOrderIdTyping] = useState(false);
  const [customerNametyping, setIsCustomerNameTyping] = useState(false);
  const [shippingAddresstyping, setIsShippingAddressTyping] = useState(false);
  const [customerReferenceNotyping, setIsCustomerReferenceNoTyping] =
    useState(false);
  const [trackingtyping, setIsTrackingTyping] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );
  const [dateInput, setDateInput] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [profitNametyping, setIsProfitNameTyping] = useState(false);
  const [profitNameInput, setProfitNameInput] = useState("");
  const [profitNameFilter, setProfitNameFilter] = useState<string | undefined>(
    undefined
  );
  const [isRetailerNametyping, setIsRetailerNameTyping] = useState(false);
  const [retailerNameInput, setRetailerNameInput] = useState("");
  const [retailerNameFilter, setRetailerNameFilter] = useState<
    string | undefined
  >(undefined);

  const [isFullfillmenttyping, setIsFullfillmentTyping] = useState(false);
  const [FullfillmentInput, setFullfillmentInput] = useState("");
  const [FullfillmentFilter, setFullfillmentFilter] = useState<
    string | undefined
  >(undefined);

  const [isOrderStatustyping, setIsOrderStatusTyping] = useState(false);
  const [OrderStatusInput, setOrderStatusInput] = useState("");
  const [OrderStatusFilter, setOrderStatusFilter] = useState<
    string | undefined
  >(undefined);

  const [isPsiNumbertyping, setIsPsiNumbertyping] = useState(false);
  const [psiNumberInput, setPsiNumberInput] = useState("");
  const [psiNumberStatusFilter, setPsiNumberFilter] = useState<
    string | undefined
  >(undefined);

  const { data, isLoading, isFetching } = useGetCustomerOrdersQuery({
    page,
    page_size: pageSize,
    order_id: orderIdFilter || undefined,
    customer_id: customerIdFilter || customerId || undefined,
    customer_name: customerNameFilter || undefined,
    customer_reference_no: customerReferenceNoFilter || undefined,
    shipping_address: shippingAddressFilter || undefined,
    tracking: trackigFilter || undefined,
    customer_email: searchTerm || undefined,
    order_date: dateFilter || "",
    profit_name: profitNameFilter || undefined,
    retailer: retailerNameFilter || undefined,
    fulfillment_status: FullfillmentFilter || undefined,
    order_status: OrderStatusFilter || undefined,
    psi_number: psiNumberStatusFilter || undefined,
  });

  const rowData = useMemo(() => {
    const results = data?.data || [];

    return results.map((item: any) => ({
      order_id: item.order_id,
      customer_id: item.customer_id,
      customer_name: item.customer_name || "N/A",
      customer_reference_no: item.customer_reference_no || "N/A",
      profit_name: item.profit_name,
      customer_no: item.customer_no,
      phone_no: item.phone_no || "N/A",
      customer_email: item.customer_email || "N/A",
      // order_date: item.order_date,
      order_date: item.order_date ? item.order_date.split("T")[0] : "N/A",

      total_value: `$${item.total_value}`,
      discount_code: item.discount_code,
      fulfillment_status: item.fulfillment_status,
      shipping_address: item.shipping_address,
      channel: item.channel,
      tracking: item.tracking || "N/A",
      retailer: item.retailer || "N/A",
      order_status: item.order_status || "N/A",
      psi_number: item.psi_number || "N/A",
      rma_status: item.rma_status || "N/A",
      receive: item.receive || "N/A",
      extend: item.extend || "N/A",
      redo: item.redo || "N/A",
      order_url: item.order_url || "N/A",
      shipping_zip_code: item.shipping_zip_code || "N/A",
    }));
  }, [data]);

  const onRowClicked = (params: any) => {
    const event = params?.event;
    if ((event?.target as HTMLElement).closest(".MuiIconButton-root")) {
      return; // ignore clicks from any MUI icon button
    }
    if (selectedOrder?.order_id === params.data.order_id) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(params.data);
    }
  };
  // console.log("Selected order", selectedOrder);

  // const getRowStyle = (params: any) => {
  //   if (selectedOrder?.order_id === params.data.order_id) {
  //     return {
  //       backgroundColor: "#E0E0E0", // MUI primary.main (blue 700)
  //       color: "#fff !important", //           // white text for contrast
  //       fontWeight: 600, // makes it stand out a bit more
  //     };
  //   }
  //   return {};
  // };

  const debouncedOrderId = useMemo(
    () =>
      debounce((value: string) => {
        setOrderIdFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setIsOrderIdTyping(false);
      }, 5000),
    []
  );
  const debouncedCustomerId = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerIdFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setIsCustomerIDTyping(false);
      }, 5000),
    []
  );
  const debouncedCustomerName = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerNameFilter(value || undefined);
        setPage(1);
        setIsCustomerNameTyping(false);
      }, 5000),
    []
  );

  const debouncedProfitName = useMemo(
    () =>
      debounce((value: string) => {
        setProfitNameFilter(value || undefined);
        setPage(1);
        setIsProfitNameTyping(false);
      }, 5000),
    []
  );

  const debouncedRetailerName = useMemo(
    () =>
      debounce((value: string) => {
        setRetailerNameFilter(value || undefined);
        setPage(1);
        setIsRetailerNameTyping(false);
      }, 5000),
    []
  );
  const debouncedPsiNumber = useMemo(
    () =>
      debounce((value: string) => {
        setPsiNumberFilter(value || undefined);
        setPage(1);
        setIsPsiNumbertyping(false);
      }, 5000),
    []
  );
  const debouncedOrderStatus = useMemo(
    () =>
      debounce((value: string) => {
        setOrderStatusFilter(value || undefined);
        setPage(1);
        setIsOrderStatusTyping(false);
      }, 5000),
    []
  );

  const debouncedFullfilmentStatus = useMemo(
    () =>
      debounce((value: string) => {
        setFullfillmentFilter(value || undefined);
        setPage(1);
        setIsFullfillmentTyping(false);
      }, 5000),
    []
  );

  const debouncedShippingAddress = useMemo(
    () =>
      debounce((value: string) => {
        setShippingAddressFilter(value || undefined);
        setPage(1);
        setIsShippingAddressTyping(false);
      }, 5000),
    []
  );
  const debouncedcustomerReferenceNo = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerReferenceNoFilter(value || undefined);
        setPage(1);
        setIsCustomerReferenceNoTyping(false);
      }, 5000),
    []
  );
  const debouncedTracking = useMemo(
    () =>
      debounce((value: string) => {
        setTrackingFilter(value || undefined);
        setPage(1);
        setIsTrackingTyping(false);
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

  return (
    <Box display="flex">
      <Box flex={1} p={1}>
        {!customerId && (
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="space-between"
            alignItems="flex-start"
            pl={7}
            // gap={2}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width="100%"
              gap={2}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={3}
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
                    Orders
                  </Typography>
                </Box>

                <Box mt={1}>
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
              <Box display="flex" alignItems="center" gap={2}>
                <CustomDatePicker
                  label="Order Date"
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
                    setPageSize(val);
                    setPage(1);
                  }}
                />
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={4} ml={2} mb={2}>
              {/* <FormControl size="small">
                <TextField
                  label="Order ID"
                  value={(orderIdFilter || "").toUpperCase()}
                  onChange={(e) => {
                    const value = e.target.value;
                    setOrderIdFilter(value ? value.toUpperCase() : undefined);
                    setPage(1);
                  }}
                  size="small"
                  placeholder="Search by Order ID"
                />
              </FormControl> */}

              {/* <FormControl size="small" sx={{ width: 160 }}>
                <TextField
                  label="Order ID"
                  value={orderIdInput.toUpperCase()}
                  onChange={(e) => {
                    const value = e.target.value;
                    setOrderIdInput(value);

                    if (value.trim() === "") {
                      setOrderIdFilter(undefined);
                      debouncedOrderId.cancel(); // cancel pending debounce
                    } else {
                      debouncedOrderId(value);
                      setIsOrderIdTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Order ID"
                  InputProps={{
                    endAdornment: orderIdInput.trim() !== "" &&
                      orderIdtyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl> */}

              <SearchInput
                label="Order ID"
                value={orderIdInput}
                setValue={(val) => {
                  setOrderIdInput(val);
                  setIsOrderIdTyping(true);
                }}
                setFilter={setOrderIdFilter}
                debouncedFunction={debouncedOrderId}
                loading={orderIdtyping}
                width={150}
              />
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
                width={150}
              />
              {/* 
              <FormControl size="small" sx={{ width: 200 }}>
                <TextField
                  label="Customer Name"
                  value={customerNameInput}
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
                      customerNametyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl> */}

              <SearchInput
                label="Customer Name"
                value={customerNameInput}
                setValue={(val) => {
                  setCustomerNameInput(val);
                  setIsCustomerNameTyping(true);
                }}
                setFilter={setCustomerNameFilter}
                debouncedFunction={debouncedCustomerName}
                loading={customerNametyping}
                width={200}
              />

              {/* <FormControl size="small" sx={{ width: 210 }}>
                <TextField
                  label="Shipping Address"
                  value={shippingAddressInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setShippingAddressInput(value);

                    if (value.trim() === "") {
                      setShippingAddressFilter(undefined);
                      debouncedShippingAddress.cancel(); // cancel pending debounce
                    } else {
                      setIsShippingAddressTyping(true);
                      debouncedShippingAddress(value);
                    }
                  }}
                  size="small"
                  placeholder="Shipping Address"
                  InputProps={{
                    endAdornment: shippingAddressInput.trim() !== "" &&
                      shippingAddresstyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl> */}

              <SearchInput
                label="Shipping Address"
                value={shippingAddressInput}
                setValue={(val) => {
                  setShippingAddressInput(val);
                  setIsShippingAddressTyping(true);
                }}
                setFilter={setShippingAddressFilter}
                debouncedFunction={debouncedShippingAddress}
                loading={shippingAddresstyping}
                width={200}
              />

              {/* <FormControl size="small" sx={{ width: 230 }}>
                <TextField
                  label="Customer Reference No "
                  value={customerReferenceNoInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomerReferenceNoInput(value);
                    if (value.trim() === "") {
                      setCustomerReferenceNoFilter(undefined);
                      debouncedcustomerReferenceNo.cancel(); // cancel pending debounce
                    } else {
                      setIsCustomerReferenceNoTyping(true);
                      debouncedcustomerReferenceNo(value);
                    }
                  }}
                  size="small"
                  placeholder="Customer Reference No"
                  InputProps={{
                    endAdornment: customerReferenceNoInput.trim() !== "" &&
                      customerReferenceNotyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl> */}
              <SearchInput
                label="Customer Reference No"
                value={customerReferenceNoInput}
                setValue={(val) => {
                  setCustomerReferenceNoInput(val);
                  setIsCustomerReferenceNoTyping(true);
                }}
                setFilter={setCustomerReferenceNoFilter}
                debouncedFunction={debouncedcustomerReferenceNo}
                loading={customerReferenceNotyping}
                width={240}
              />

              {/* <FormControl size="small" sx={{ width: 140 }}>
                <TextField
                  label="Tracking"
                  value={trackingInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTrackingInput(value);
                    if (value.trim() === "") {
                      setTrackingFilter(undefined);
                      debouncedTracking.cancel(); // cancel pending debounce
                    } else {
                      debouncedTracking(value);
                      setIsTrackingTyping(true);
                    }
                  }}
                  size="small"
                  placeholder="Tracking"
                  InputProps={{
                    endAdornment: trackingInput.trim() !== "" &&
                      trackingtyping && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                  }}
                />
              </FormControl> */}
              <SearchInput
                label="Tracking"
                value={trackingInput}
                setValue={(val) => {
                  setTrackingInput(val);
                  setIsTrackingTyping(true);
                }}
                setFilter={setTrackingFilter}
                debouncedFunction={debouncedTracking}
                loading={trackingtyping}
              />

              {/* <FormControl size="small" sx={{ width: 100 }}>
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
            </Box>
            <Box display="flex" alignItems="center" gap={2} ml={2} mb={2}>
              <SearchInput
                label="Profit Name"
                value={profitNameInput}
                setValue={(val) => {
                  setProfitNameInput(val);
                  setIsProfitNameTyping(true);
                }}
                setFilter={setProfitNameFilter}
                debouncedFunction={debouncedProfitName}
                loading={profitNametyping}
                width={200}
              />

              <SearchInput
                label="Retailer Name"
                value={retailerNameInput}
                setValue={(val) => {
                  setRetailerNameInput(val);
                  setIsRetailerNameTyping(true);
                }}
                setFilter={setRetailerNameFilter}
                debouncedFunction={debouncedRetailerName}
                loading={isRetailerNametyping}
                width={200}
              />
              <SearchInput
                label="Order Status"
                value={OrderStatusInput}
                setValue={(val) => {
                  setOrderStatusInput(val);
                  setIsOrderStatusTyping(true);
                }}
                setFilter={setOrderStatusFilter}
                debouncedFunction={debouncedOrderStatus}
                loading={isOrderStatustyping}
                width={200}
              />

              <SearchInput
                label="Fullfillment Status"
                value={FullfillmentInput}
                setValue={(val) => {
                  setFullfillmentInput(val);
                  setIsFullfillmentTyping(true);
                }}
                setFilter={setFullfillmentFilter}
                debouncedFunction={debouncedFullfilmentStatus}
                loading={isFullfillmenttyping}
                width={200}
              />
              <SearchInput
                label="PSI Number"
                value={psiNumberInput}
                setValue={(val) => {
                  setPsiNumberInput(val);
                  setIsPsiNumbertyping(true);
                }}
                setFilter={setPsiNumberFilter}
                debouncedFunction={debouncedPsiNumber}
                loading={isPsiNumbertyping}
                width={200}
              />
            </Box>
          </Box>
        )}

        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <ResponsiveDashboard
            rowData={rowData}
            userCol={orderCol}
            onRowClicked={onRowClicked}
            // getRowStyle={getRowStyle}

            getRowStyle={getRowStyle(highlightedId)}
            selectedOrderId={selectedOrder?.order_id}
            enablePagination
            currentPage={page}
            totalPages={data?.total_pages || 1}
            onPageChange={(newPage: any) => setPage(newPage)}
            pagination={false}
            currentMenu="orders"
            paginationPageSize={pageSize}
          />
        )}
      </Box>
    </Box>
  );
};

export default Orders;
