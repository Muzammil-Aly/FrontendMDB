"use client";
import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import AgGridTable from "@/components/ag-grid";
import { ZPartETA } from "@/constants/Grid-Table/ColDefs";
import useZpartETA from "@/hooks/Ag-Grid/useZpartEtaColumn";
import Loader from "@/components/Common/Loader";
import { useGetZpartEtAQuery } from "@/redux/services/profileApi";
import { getRowStyle } from "@/utils/gridStyles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setTouchupsOpen } from "../../app/redux/tabSlice";

interface Props {
  orderId?: string;
  sku?: string;
  setSelectedOrderItem?: React.Dispatch<React.SetStateAction<any | null>>;
  orderItemSec?: boolean;
  filters?: string;
}

interface ZPartETAItem {
  document_no: string;
  external_document_no: string;
  no: string;
  associated_whole_unit: string;
  description: string;
  alternative_status: string;
  customer_no: string;
  order_date: string;
  sales_order_aging_days: number;
  earliest_eta: string;
  earliest_eta_to_rex: string;
  earliest_eta_to_unga: string;
  earliest_eta_to_unnj: string | null;
  earliest_eta_to_ggtj: string | null;
  "Days to Earliest ETA": number;
  "Days to Rex ETA": number;
  qty: number;
}

const ZpartETA = ({ sku }: Props) => {
  const orderItemsCol = useZpartETA(ZPartETA);

  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );
  const [selectedItemDetail, setSelectedItemDetail] =
    useState<ZPartETAItem | null>(null);

  //  Fetch filtered ZPart ETA data (based on SKU)
  const { data, isLoading, isFetching } = useGetZpartEtAQuery(
    { sku: sku || "" },
    { skip: !sku } // Only fetch if sku is provided
  );

  //  Map the response data to table format
  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    if (!Array.isArray(items)) return [];

    return items.map((item: any) => ({
      document_no: item.document_no,
      external_document_no: item.external_document_no,
      no: item.no,
      associated_whole_unit: item.associated_whole_unit,
      description: item.description,
      alternative_status: item.alternative_status,
      customer_no: item.customer_no,
      order_date: item.order_date,
      sales_order_aging_days: item.sales_order_aging_days,
      earliest_eta: item.earliest_eta,
      earliest_eta_to_rex: item.earliest_eta_to_rex,
      earliest_eta_to_unga: item.earliest_eta_to_unga,
      earliest_eta_to_unnj: item.earliest_eta_to_unnj,
      earliest_eta_to_ggtj: item.earliest_eta_to_ggtj,
      "Days to Earliest ETA": item["Days to Earliest ETA"],
      "Days to Rex ETA": item["Days to Rex ETA"],
      qty: item.qty,
      sku: item.sku,
    }));
  }, [data]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      {/* Title */}
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
          mb: 2,
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
        ZPART ETA {sku ? `— ${sku}` : ""}
      </Typography>

      {/* Loader or Table */}
      {isLoading || isFetching ? (
        <Loader />
      ) : rowData.length === 0 ? (
        <Typography color="text.secondary" fontSize={14}>
          {sku
            ? `No ETA data found for SKU "${sku}"`
            : "Please select an SKU to view ETA data"}
        </Typography>
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={orderItemsCol}
          height={480}
          enablePagination={false}
          getRowStyle={getRowStyle(highlightedId)}
        />
      )}
    </Box>
  );
};

export default ZpartETA;
