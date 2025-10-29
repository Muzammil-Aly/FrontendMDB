"use client";
import React, { useState, useMemo, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import {
  useGetCustomerNamesQuery,
  useGetProfitNamesQuery,
  useGetRetailersQuery,
  useGetStatusesQuery,
  useGetFullfillmentStatusesQuery,
} from "@/redux/services/ordersApi";
import DropdownSearchInput from "@/components/Common/CustomSearch/DropdownSearchInput";

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
  const { isActive, isOrderItemsOpen, activeTabName } = useSelector(
    (state: RootState) => state.tab
  );

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
  const {
    data: customerNameSuggestions = [],
    isFetching: isCustomerNameLoading,
  } = useGetCustomerNamesQuery(customerNameInput, {
    skip: customerNameInput.trim().length < 1,
  });

  const { data: profitNameSuggestions = [], isFetching: isProfitNameLoading } =
    useGetProfitNamesQuery(profitNameInput, {
      skip: profitNameInput.trim().length < 1,
    });

  const { data: retailerSuggestions = [], isFetching: isRetailerLoading } =
    useGetRetailersQuery(retailerNameInput, {
      skip: retailerNameInput.trim().length < 1,
    });

  const { data: statusSuggestions = [], isFetching: isStatusLoading } =
    useGetStatusesQuery(OrderStatusInput, {
      skip: OrderStatusInput.trim().length < 1,
    });

  const {
    data: fullfillmentStatusSuggestions = [],
    isFetching: isFullfillmentStatusLoading,
  } = useGetFullfillmentStatusesQuery(FullfillmentInput, {
    skip: FullfillmentInput.trim().length < 1,
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
      receive: item.receive ?? "N/A",
      extend: item.extend ?? "N/A",
      redo: item.redo ?? "N/A",
      order_url: item.order_url ?? "N/A",
      shipping_zip_code: item.shipping_zip_code || "N/A",
    }));
  }, [data]);

  // const onRowClicked = (params: any) => {
  //   const event = params?.event;
  //   if ((event?.target as HTMLElement).closest(".MuiIconButton-root")) {
  //     return; // ignore clicks from any MUI icon button
  //   }
  //   if (selectedOrder?.order_id === params.data.order_id) {
  //     setSelectedOrder(null);
  //   } else {
  //     setSelectedOrder(params.data);
  //   }
  // };

  useEffect(() => {
    // Whenever filters or searchTerm change, reset selected order
    setSelectedOrder(null);
  }, [
    orderIdFilter,
    customerIdFilter,
    customerNameFilter,
    customerReferenceNoFilter,
    shippingAddressFilter,
    trackigFilter,
    dateFilter,
    profitNameFilter,
    retailerNameFilter,
    FullfillmentFilter,
    OrderStatusFilter,
    psiNumberStatusFilter,
    searchTerm,
  ]);

  // Auto-select first order when search/filter results load
  useEffect(() => {
    // If any search or filter is active
    const hasActiveFilter =
      orderIdFilter ||
      customerIdFilter ||
      customerNameFilter ||
      customerReferenceNoFilter ||
      shippingAddressFilter ||
      trackigFilter ||
      dateFilter ||
      profitNameFilter ||
      retailerNameFilter ||
      FullfillmentFilter ||
      OrderStatusFilter ||
      psiNumberStatusFilter ||
      searchTerm;

    // When data updates and filters are active
    if (isActive && hasActiveFilter && data?.data?.length > 0) {
      setSelectedOrder(data.data[0]); // 👈 auto-select the first order
    }
  }, [
    data, // refires when API data changes
    orderIdFilter,
    customerIdFilter,
    customerNameFilter,
    customerReferenceNoFilter,
    shippingAddressFilter,
    trackigFilter,
    dateFilter,
    profitNameFilter,
    retailerNameFilter,
    FullfillmentFilter,
    OrderStatusFilter,
    psiNumberStatusFilter,
    searchTerm,
  ]);

  useEffect(() => {
    if (
      orderIdFilter && // user searched by Order ID
      data?.orders?.length === 1 // only one match
    ) {
      setSelectedOrder(data.orders[0]); // auto-select it
    }
  }, [orderIdFilter, data]);
  const onRowClicked = (params: any) => {
    const event = params?.event;
    const target = event?.target as HTMLElement;

    // 🛑 ignore clicks from copy icon or from the "Open Order" link
    if (
      target.closest(".MuiIconButton-root") ||
      target.closest(".order-link") // custom class we’ll add
    ) {
      return;
    }

    // ✅ your normal logic
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
      <Box flex={1} p={customerId ? 0 : 1}>
        {!customerId && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="stretch"
            pl={7}
            width="100%"
            gap={2} // uniform spacing between rows
          >
            {/* Top row: Email search + Date + Page Size */}
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Box
                display="flex"
                alignItems="center"
                flex={1}
                minWidth={200}
                gap={1}
              >
                <CustomSearchField
                  value={searchInput}
                  onChange={handleSearchInput}
                  placeholder="Search by Email"
                  fullWidth
                  InputProps={{
                    endAdornment: searchInput.trim() !== "" && isTyping && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Send
                  onClick={() => {
                    setSearchTerm(searchInput);
                    setPage(1);
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#004FA7",
                    height: 36,
                    width: 36,
                  }}
                />
              </Box>

              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
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

            {/* First filter row */}
            <Box display="flex" flexWrap="wrap" gap={2}>
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
              <DropdownSearchInput
                label="Customer Name"
                value={customerNameInput}
                setValue={setCustomerNameInput}
                setFilter={setCustomerNameFilter}
                debouncedFunction={debouncedCustomerName}
                loading={isCustomerNameLoading}
                suggestions={customerNameSuggestions?.results || []}
                width={150}
              />
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
                width={150}
              />
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
                width={150}
              />
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
                width={150}
              />
            </Box>

            {/* Second filter row */}
            <Box display="flex" flexWrap="wrap" gap={2}>
              <DropdownSearchInput
                label="Profit Name"
                value={profitNameInput}
                setValue={setProfitNameInput}
                setFilter={setProfitNameFilter}
                debouncedFunction={debouncedProfitName}
                loading={isProfitNameLoading}
                suggestions={profitNameSuggestions?.results || []}
                width={150}
              />
              <DropdownSearchInput
                label="Retailer Name"
                value={retailerNameInput}
                setValue={setRetailerNameInput}
                setFilter={setRetailerNameFilter}
                debouncedFunction={debouncedRetailerName}
                loading={isRetailerLoading}
                suggestions={retailerSuggestions?.results || []}
                width={150}
              />
              <DropdownSearchInput
                label="Order Status"
                value={OrderStatusInput}
                setValue={setOrderStatusInput}
                setFilter={setOrderStatusFilter}
                debouncedFunction={debouncedOrderStatus}
                loading={isStatusLoading}
                suggestions={statusSuggestions?.results || []}
                width={150}
              />
              <DropdownSearchInput
                label="Fullfillment Status"
                value={FullfillmentInput}
                setValue={setFullfillmentInput}
                setFilter={setFullfillmentFilter}
                debouncedFunction={debouncedFullfilmentStatus}
                loading={isFullfillmentStatusLoading}
                suggestions={fullfillmentStatusSuggestions?.results || []}
                width={150}
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
                width={150}
              />
            </Box>
          </Box>
        )}

        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <Box ml={customerId ? 0 : 5}>
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
              filters={{
                orderIdFilter,
                customerIdFilter,
                customerNameFilter,
                profitNameFilter,
                retailerNameFilter,
                OrderStatusFilter,
                FullfillmentFilter,
                searchTerm,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Orders;
