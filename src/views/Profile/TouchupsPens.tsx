"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  CircularProgress,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import debounce from "lodash.debounce";
import AgGridTable from "@/components/ag-grid";
import Loader from "@/components/Common/Loader";
import { touchups_pens } from "@/constants/Grid-Table/ColDefs";
import useTouchupsPens from "@/hooks/Ag-Grid/useTouchupPens";
import { getRowStyle } from "@/utils/gridStyles";
import { useGetTouchupPensQuery } from "@/redux/services/profileApi";

interface Props {
  orderId?: string;
  Colorslug?: string | null;
}

interface Touchup {
  ItemNum: string;
  ItemName: string;
  ItemName2?: string | null;
  Colorslug?: string | null;
  ColorName?: string | null;
}

const TouchupsPens: React.FC<Props> = ({ orderId, Colorslug }) => {
  const touchupsPenCol = useTouchupsPens(touchups_pens);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedTouchupDetail, setSelectedTouchupDetail] =
    useState<Touchup | null>(null);

  // --- Filters ---
  const [filters, setFilters] = useState<{
    Colorslug?: string;
    ColorName?: string;
    ItemName2?: string;
  }>({});

  const [isTyping, setIsTyping] = useState({
    Colorslug: false,
    ColorName: false,
    ItemName2: false,
  });

  const [inputValues, setInputValues] = useState({
    Colorslug: "",
    ColorName: "",
    ItemName2: "",
  });

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [pageSizeInput, setPageSizeInput] = useState(pageSize);

  const handlePageSizeChange = (value: number) => {
    setPageSizeInput(value);
    setPage(1); // reset to page 1
  };

  // --- Debounce filter handler ---
  const handleFilterChange = useMemo(
    () =>
      debounce((key: string, value: string) => {
        setFilters((prev) => ({
          ...prev,
          [key]: value.trim() || undefined,
        }));
        setIsTyping((prev) => ({ ...prev, [key]: false }));
        setPage(1);
      }, 800),
    []
  );

  // --- Cancel filter ---
  const handleCancelFilter = (key: keyof typeof filters) => {
    setInputValues((prev) => ({ ...prev, [key]: "" }));
    setFilters((prev) => ({ ...prev, [key]: undefined }));
  };

  // --- API Call ---
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetTouchupPensQuery(
    {
      page,
      page_size: pageSizeInput,
      color_slug: Colorslug || filters.Colorslug,
      // colorslug: filters.Colorslug,
      color_name: filters.ColorName,
      item_name2: filters.ItemName2,
    },
    { skip: Colorslug === null }
  );

  const rowData = useMemo(() => data?.results ?? [], [data]);

  // --- Row Click ---
  const onRowClicked = (params: any) => {
    const clickedItem = params.data as Touchup;
    if (selectedTouchupDetail?.ItemNum === clickedItem.ItemNum) {
      setSelectedTouchupDetail(null);
      setHighlightedId(null);
    } else {
      setSelectedTouchupDetail(clickedItem);
      setHighlightedId(clickedItem.ItemNum);
    }
  };

  // --- Render Filter Box ---
  const renderFilter = (
    label: string,
    key: keyof typeof filters,
    value: string
  ) => (
    <FormControl sx={{ width: 150 }}>
      <TextField
        value={value.toUpperCase()}
        onChange={(e) => {
          const val = e.target.value;
          setInputValues((prev) => ({ ...prev, [key]: val }));
          setIsTyping((prev) => ({ ...prev, [key]: true }));
          handleFilterChange(key, val);
        }}
        placeholder={label}
        size="small"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            fontSize: "0.8rem",
            fontWeight: 500,
            transition: "all 0.25s ease",
            "&:hover": {
              borderColor: "#42a5f5",
              boxShadow: "0 2px 6px rgba(66, 165, 245, 0.15)",
            },
            "&.Mui-focused": {
              borderColor: "#1976d2",
              boxShadow: "0 0 6px rgba(25, 118, 210, 0.25)",
            },
          },
          "& .MuiInputBase-input": {
            padding: "6px 14px",
            textTransform: "uppercase",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isTyping[key] ? (
                <CircularProgress size={16} />
              ) : value.trim() !== "" ? (
                <IconButton
                  size="small"
                  onClick={() => handleCancelFilter(key)}
                  sx={{ p: 0.2 }}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ style: { display: "none" } }}
      />
    </FormControl>
  );

  // --- Render ---
  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography
          className="drag-handle"
          variant="caption"
          sx={{
            fontWeight: 600,
            color: "#fff",
            background: "#1976d2",
            px: 1.5,
            py: 0.5,
            fontSize: "1em",
            borderRadius: "3px 5px 5px 3px",
            position: "relative",
            display: "inline-block",
            "::before": {
              content: '""',
              position: "absolute",
              left: -8,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "8px solid #1976d2",
            },
          }}
        >
          Touchups Pens
        </Typography>

        {/* Filters */}
        <Box display="flex" gap={1.5} flexWrap="wrap" marginRight={5}>
          {renderFilter("Color slug", "Colorslug", inputValues.Colorslug)}
          {renderFilter("Color Name", "ColorName", inputValues.ColorName)}
          {renderFilter("Item Name 2", "ItemName2", inputValues.ItemName2)}
          <FormControl sx={{ width: 150 }}>
            <TextField
              select
              value={pageSizeInput}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "#42a5f5",
                    boxShadow: "0 2px 6px rgba(66, 165, 245, 0.15)",
                  },
                  "&.Mui-focused": {
                    borderColor: "#1976d2",
                    boxShadow: "0 0 6px rgba(25, 118, 210, 0.25)",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "6px 14px",
                  textTransform: "none",
                },
              }}
              InputLabelProps={{ style: { display: "none" } }}
            >
              {[10, 50, 100].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Box>

      {/* Table */}
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={touchupsPenCol}
          onRowClicked={onRowClicked}
          getRowStyle={getRowStyle(highlightedId)}
          enablePagination
          height={orderId ? 220 : 400}
          pagination={false}
          currentPage={page}
          totalPages={data?.total_pages || 1}
          onPageChange={(newPage: number) => setPage(newPage)}
          paginationPageSize={pageSizeInput}
        />
      )}
    </Box>
  );
};

export default TouchupsPens;
