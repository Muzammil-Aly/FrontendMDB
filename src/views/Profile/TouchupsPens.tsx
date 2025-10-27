"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import debounce from "lodash.debounce";
import AgGridTable from "@/components/ag-grid";
import Loader from "@/components/Common/Loader";
import { touchups_pens } from "@/constants/Grid-Table/ColDefs";
import useTouchupsPens from "@/hooks/Ag-Grid/useTouchupPens";
import { getRowStyle } from "@/utils/gridStyles";
import { useGetTouchupPensQuery } from "@/redux/services/profileApi";

interface Props {
  orderId: string;
  Colorslug?: string | null; // <-- corrected type
}

interface Touchup {
  ItemNum: string;
  ItemName: string;
  ItemName2?: string | null;
  Colorslug?: string | null;
  ColorName?: string | null;
  filters?: any;
}

const TouchupsPens: React.FC<Props> = ({ orderId, Colorslug }) => {
  const touchupsPenCol = useTouchupsPens(touchups_pens);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedTouchupDetail, setSelectedTouchupDetail] =
    useState<Touchup | null>(null);

  const [lotNoInput, setLotNoInput] = useState("");
  const [isLotNoTyping, setIsLotNoTyping] = useState(false);
  const [lotNoFilter, setLotNoFilter] = useState<string | undefined>(undefined);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // --- API Call ---
  // const { data, isLoading, isFetching } = useGetTouchupPensQuery(
  //   {
  //     page,
  //     page_size: pageSize,
  //     color_slug: Colorslug ?? undefined,
  //   },
  //   { skip: !orderId || !Colorslug }
  // );

  const { data, isLoading, isFetching } = useGetTouchupPensQuery(
    {
      page,
      page_size: pageSize,
      color_slug: Colorslug ?? undefined,
    },
    { skip: !Colorslug } // skip if null/undefined
  );

  // --- Memoized data ---
  // const rowData = useMemo(() => data ?? [], [data]);
  const rowData = useMemo(() => data?.results ?? [], [data]);
  // --- Row click handler ---
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

  // --- Debounced filter for lot number ---
  const debouncedLotNo = useMemo(
    () =>
      debounce((value: string) => {
        setLotNoFilter(value || undefined);
        setPage(1);
        setIsLotNoTyping(false);
      }, 800),
    []
  );

  // --- Render ---
  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {Colorslug && (
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
            Color Slug: {Colorslug ?? "N/A"}
          </Typography>
        )}
      </Box>

      {/* Loader / Table */}
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={touchupsPenCol}
          height={200}
          onRowClicked={onRowClicked}
          enablePagination
          getRowStyle={getRowStyle(highlightedId)}
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

export default TouchupsPens;
