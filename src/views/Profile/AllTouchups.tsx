"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import AgGridTable from "@/components/ag-grid";
import Loader from "@/components/Common/Loader";
import { touchups_columns } from "@/constants/Grid-Table/ColDefs";
import useTouchupsColumn from "@/hooks/Ag-Grid/useTouchupsColumn";
import { useGetTouchupsQuery } from "@/redux/services/profileApi";
import { getRowStyle } from "@/utils/gridStyles";
import debounce from "lodash.debounce";
import type { DebouncedFunc } from "lodash";

// Allowed filter keys
type FilterKey = "lot_no" | "sku" | "customer_id" | "brand";

const AllTouchups: React.FC = () => {
  const touchupsCol = useTouchupsColumn(touchups_columns);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    lot_no: "",
    sku: "",
    customer_id: "",
    brand: "",
  });

  const [isTyping, setIsTyping] = useState<Record<FilterKey, boolean>>({
    lot_no: false,
    sku: false,
    customer_id: false,
    brand: false,
  });

  const [appliedFilters, setAppliedFilters] = useState<
    Partial<Record<FilterKey, string>>
  >({});

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isFetching } = useGetTouchupsQuery(
    {
      page,
      page_size: pageSize,
      ...appliedFilters,
    },
    { skip: false }
  );

  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          order_id: item.order_id,
          lot_no: item.lot_no,
          sku: item.sku,
          customer_id: item.customer_id,
          parts_item_no: item.parts_item_no,
          parts_item_name: item.parts_item_name,
          parts_item_name_2: item.parts_item_name_2,
          touchup_pen_item_no: item.touchup_pen_item_no,
          touchup_pen_item_name: item.touchup_pen_item_name,
          brand: item.brand,
          color_slug: item.color_slug,
          color_name: item.color_name,
        }))
      : [];
  }, [data]);

  const onRowClicked = (params: any) => {
    const clicked = params.data;
    setHighlightedId(
      highlightedId === clicked.order_id ? null : clicked.order_id
    );
  };

  // Debounced filter creation
  const createDebouncedFilter = (
    key: FilterKey
  ): DebouncedFunc<(value: string) => void> =>
    debounce((value: string) => {
      setAppliedFilters((prev) => ({
        ...prev,
        [key]: value || undefined,
      }));
      setPage(1);
      setIsTyping((prev) => ({ ...prev, [key]: false }));
    }, 500);

  // Memoized debounced filters
  const debouncedFilters: Record<
    FilterKey,
    DebouncedFunc<(value: string) => void>
  > = useMemo(
    () => ({
      lot_no: createDebouncedFilter("lot_no"),
      sku: createDebouncedFilter("sku"),
      customer_id: createDebouncedFilter("customer_id"),
      brand: createDebouncedFilter("brand"),
    }),
    []
  );

  const handleFilterChange = (key: FilterKey, value: string) => {
    const normalized = value.toUpperCase();
    setFilters((prev) => ({ ...prev, [key]: normalized }));

    if (normalized.trim() === "") {
      setAppliedFilters((prev) => ({ ...prev, [key]: undefined }));
      debouncedFilters[key].cancel();
    } else {
      setIsTyping((prev) => ({ ...prev, [key]: true }));
      debouncedFilters[key](normalized);
    }
  };

  const renderTextField = (label: string, key: FilterKey, width = 140) => (
    <TextField
      value={filters[key]}
      onChange={(e) => handleFilterChange(key, e.target.value)}
      placeholder={label}
      size="small"
      variant="outlined"
      style={{ width }}
      InputProps={{
        style: {
          borderRadius: 6,
          backgroundColor: "#f9f9f9",
          fontSize: 13,
          padding: "6px 8px",
        },
        endAdornment: (
          <>
            {filters[key] && (
              <InputAdornment
                position="end"
                style={{ cursor: "pointer", fontSize: 12, marginRight: 4 }}
                onClick={() => handleFilterChange(key, "")}
              >
                ❌
              </InputAdornment>
            )}
            {isTyping[key] && (
              <InputAdornment position="end" style={{ marginRight: 4 }}>
                <CircularProgress size={14} />
              </InputAdornment>
            )}
          </>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#3f51b5",
            boxShadow: "0 0 0 1px rgba(63, 81, 181, 0.2)",
          },
          height: 32,
        },
      }}
    />
  );

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      <Box display="flex" gap={1}>
        {renderTextField("Lot No", "lot_no")}
        {renderTextField("SKU", "sku")}
        {renderTextField("Customer ID", "customer_id")}
        {renderTextField("Brand", "brand")}
      </Box>

      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={touchupsCol}
          height={300}
          onRowClicked={onRowClicked}
          getRowStyle={getRowStyle(highlightedId)}
          enablePagination
          pagination={false}
          currentPage={page}
          totalPages={data?.total_pages || 1}
          onPageChange={(newPage: any) => setPage(newPage)}
          paginationPageSize={pageSize}
        />
      )}
    </Box>
  );
};

export default AllTouchups;
