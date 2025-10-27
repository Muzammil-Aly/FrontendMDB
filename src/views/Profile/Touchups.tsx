"use client";
import { useEffect } from "react";
import AgGridTable from "@/components/ag-grid";
import { touchups_columns } from "@/constants/Grid-Table/ColDefs";
import useTouchupsColumn from "@/hooks/Ag-Grid/useTouchupsColumn";
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
import { getRowStyle } from "@/utils/gridStyles";
import debounce from "lodash.debounce";
import { flex } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
interface Props {
  orderId: string;
  setSelectedTouchup: React.Dispatch<React.SetStateAction<any | null>>;
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
  filters?: any;
}

const Touchups = ({ orderId, setSelectedTouchup }: Props) => {
  const { isActive, activeTabName, isTouchupPensOpen } = useSelector(
    (state: RootState) => state.tab
  );
  const touchupsCol = useTouchupsColumn(touchups_columns);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedTouchupDetail, setSelectedTouchupDetail] =
    useState<Touchup | null>(null);
  const [selectedTouchupp, setSelectedTouchupp] = useState<Touchup | null>(
    null
  );
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

  const onRowClicked = (params: any) => {
    const clicked = params.data as Touchup;

    if (highlightedId === clicked.order_id) {
      // Deselect row
      setSelectedTouchupDetail(null);
      setHighlightedId(null);
      setSelectedTouchup(null);
    } else {
      // Select new row
      setSelectedTouchupDetail(clicked);
      setHighlightedId(clicked.order_id);
      setSelectedTouchup(clicked); //  use clicked, not old detail
    }
  };
  useEffect(() => {
    if (isTouchupPensOpen && data?.data?.length > 0) {
      setSelectedTouchupDetail?.(data.data[0]);
      setSelectedTouchup(data.data[0]);
    }
  }, [data]);
  console.log("selectedTouchupDetail Toucup", selectedTouchupDetail);
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
      // className="drag-handle"
      gap={2}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
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
          // filters={filters}
        />
      )}
    </Box>
  );
};

export default Touchups;
