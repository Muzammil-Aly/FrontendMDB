"use client";
import AgGridTable from "@/components/ag-grid";
import { touchups_columns } from "@/constants/Grid-Table/ColDefs"; // your touchups colDefs
import useTouchupsColumn from "@/hooks/Ag-Grid/useTouchupsColumn"; // the hook we built earlier
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import Loader from "@/components/Common/Loader";
import { useGetTouchupsQuery } from "@/redux/services/profileApi";
// <-- adjust if your API hook has different name
import { getRowStyle } from "@/utils/gridStyles";
import debounce from "lodash.debounce";
import { flex } from "@mui/system";

interface Props {
  orderId: string;
  setSelectedTouchup?: React.Dispatch<React.SetStateAction<any | null>>;
}

interface Touchup {
  order_id: string;
  lot_no: string | null;
  sku: string;
  customer_id: string | null;
  parts_item_no: string | null;
  parts_item_name: string | null;
  parts_item_name_2: string | null;
  touchup_pen_item_no: string | null;
  touchup_pen_item_name: string | null;
  brand: string | null;
  color_slug: string | null;
  color_name: string | null;
}

const Touchups = ({ orderId, setSelectedTouchup }: Props) => {
  const touchupsCol = useTouchupsColumn(touchups_columns);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedTouchupDetail, setSelectedTouchupDetail] =
    useState<Touchup | null>(null);
  const [lotNoInput, setLotNoInput] = useState("");

  const [isLotNoTyping, setIsLotNoTyping] = useState(false);
  const [lotNoFilter, setlotNoFilter] = useState<string | undefined>(undefined);
  // console.log("Touchups orderId:", orderId);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch touchups from API
  const { data, isLoading, isFetching, refetch } = useGetTouchupsQuery(
    {
      order_id: orderId,
      page,
      page_size: pageSize,
      lot_no: lotNoFilter,
    },

    { skip: !orderId }
  );

  // Map API response -> rowData
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

  // Row click handler
  const onRowClicked = (params: any) => {
    if (selectedTouchupDetail?.order_id === params.data.order_id) {
      setSelectedTouchupDetail(null);
      setHighlightedId(null);
    } else {
      setSelectedTouchupDetail(params.data as Touchup);
      setHighlightedId(params.data.order_id);
    }
  };
  const debouncedItemNo = useMemo(
    () =>
      debounce((value: string) => {
        setlotNoFilter(value);
        setPage(1);
        setIsLotNoTyping(false);
      }, 5000),
    []
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      // justifyContent="center"
      // alignItems="center"
      // className="drag-handle"
      gap={2}
    >
      {/* Show Order ID */}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* <Typography variant="h6" sx={{ mb: 2 }}>
          Touchups for Order: {orderId ?? "N/A"}
        </Typography> */}
        <Typography
          className="drag-handle"
          variant="caption"
          sx={{
            fontWeight: 600,
            color: "#fff",
            background: "#1976d2",
            px: 1.5, // smaller horizontal padding
            py: 0.5, // smaller vertical padding
            fontSize: "1em", // very small text
            borderRadius: "3px 5px 5px 3px",
            position: "relative",
            display: "inline-block",
            "::before": {
              content: '""',
              position: "absolute",
              left: -8, // smaller triangle
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
          Touchups for Order: {orderId ?? "N/A"}
        </Typography>

        <FormControl sx={{ width: 150 }}>
          <TextField
            value={lotNoInput.toUpperCase()}
            onChange={(e) => {
              const value = e.target.value;
              setLotNoInput(value);

              if (value.trim() === "") {
                setlotNoFilter(undefined);
                debouncedItemNo.cancel();
              } else {
                debouncedItemNo(value);
                setIsLotNoTyping(true);
              }
            }}
            placeholder="Lot No"
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px", // modern pill shape
                backgroundColor: "#ffffff", // clean white
                border: "1px solid #e0e0e0", // subtle border
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
              endAdornment: lotNoInput.trim() !== "" && isLotNoTyping && (
                <InputAdornment position="end">
                  <CircularProgress size={16} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { display: "none" } }}
          />
        </FormControl>
      </Box>

      {/* Loader or Table */}
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={touchupsCol}
          height={200}
          enablePagination={false}
          onRowClicked={onRowClicked}
          getRowStyle={getRowStyle(highlightedId)}
        />
      )}
    </Box>
  );
};

export default Touchups;
