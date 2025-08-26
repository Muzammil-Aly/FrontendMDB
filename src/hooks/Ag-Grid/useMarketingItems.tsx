import CustomButton from "@/components/Common/CustomButton";
import { ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";
import { Avatar, Box, Typography } from "@mui/material";

export interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<ICellRendererParams>;
  width?: number;
  flex?: number;
}

const StatusCell = ({ value }: { value: string }) => {
  const status = value?.toLowerCase();

  const styles = {
    subscribed: {
      bgcolor: "#E0F8E9",
      color: "#299438",
    },
    unsubscribed: {
      bgcolor: "#FFF4E5",
      color: "#B26A00",
    },
    never_subscribed: {
      bgcolor: "#FDECEA",
      color: "#D32F2F",
    },
    default: {
      bgcolor: "#E3E8EB",
      color: "#68717D",
    },
  };

  const style = styles[status as keyof typeof styles] || styles.default;

  return (
    <Box
      sx={{
        ...style,
        fontWeight: 600,
        borderRadius: "12px",
        padding: "4px 12px",
        textTransform: "uppercase",
        fontSize: 13,
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {value}
    </Box>
  );
};



const useMarketingEvents = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "event_id":
          return { ...col, headerName: "Event ID", flex: 1, minWidth: 160 };

        case "customer_id":
          return { ...col, headerName: "Customer ID", flex: 1, minWidth: 160 };

        case "event_type":
          return {
            ...col,
            headerName: "Event Type",
            flex: 1,
            minWidth: 140,
            cellRenderer: (params: ICellRendererParams) => (
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: 13,
                  display: "inline-block",
                  bgcolor: "#E3E8EB",
                  color: "#555",
                  textTransform: "capitalize",
                }}
              >
                {params.value}
              </Box>
            ),
          };

        case "campaign_id":
          return { ...col, headerName: "Campaign ID", flex: 1, minWidth: 160 };

        case "campaign_name":
          return {
            ...col,
            headerName: "Campaign Name",
            flex: 1.5,
            minWidth: 220,
            cellRenderer: (params: ICellRendererParams) => (
              <Typography sx={{ fontWeight: 600 }}>{params.value}</Typography>
            ),
          };

        case "event_timestamp":
          return {
            ...col,
            headerName: "Event Timestamp",
            flex: 1.2,
            minWidth: 180,
            valueFormatter: (params: any) =>
              params.value
                ? new Date(params.value).toLocaleString()
                : "-",
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};



export default useMarketingEvents;
