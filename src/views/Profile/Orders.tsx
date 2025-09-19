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

  const { data, isLoading, isFetching } = useGetCustomerOrdersQuery({
    page,
    page_size: pageSize,
    order_id: orderIdFilter || undefined,
    customer_id: customerId || undefined,
    customer_name: customerNameFilter || undefined,
    customer_reference_no: customerReferenceNoFilter || undefined,
    shipping_address: shippingAddressFilter || undefined,
    tracking: trackigFilter || undefined,
    customer_email: searchTerm || undefined,
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
      order_date: item.order_date,
      total_value: item.total_value,
      discount_code: item.discount_code,
      fulfillment_status: item.fulfillment_status,
      shipping_address: item.shipping_address,
      channel: item.channel,
      tracking: item.tracking || "N/A",
      retailer: item.retailer || "N/A",
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

  const debouncedCustomerName = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerNameFilter(value || undefined);
        setPage(1);
        setIsCustomerNameTyping(false);
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
            gap={2}
          >
            <Box display={"flex"} alignItems={"center"} gap={5}>
              <Typography variant="h1" p={1} color="#0D0D12" fontWeight={700}>
                Orders
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

              <FormControl size="small" sx={{ width: 160 }}>
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
              </FormControl>

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
              </FormControl>
              <FormControl size="small" sx={{ width: 210 }}>
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
              </FormControl>
              <FormControl size="small" sx={{ width: 230 }}>
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
              </FormControl>

              <FormControl size="small" sx={{ width: 140 }}>
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
              </FormControl>

              <FormControl size="small" sx={{ width: 100 }}>
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
