// import CustomButton from "@/components/Common/CustomButton";
// import { ICellRendererParams } from "ag-grid-community";
// import { useMemo } from "react";
// import { Avatar, Box, Typography } from "@mui/material";

// export interface Column {
//   field: string;
//   headerName?: string;
//   cellRenderer?: React.ComponentType<ICellRendererParams>;
//   width?: number;
//   flex?: number;
// }

// const useSupportTicket = (columns: Column[]) => {
//   return useMemo(() => {
//     return columns.map((col: any) => {
//       switch (col.field) {
//         case "ticket_id":
//           return { ...col, headerName: "Ticket ID", flex: 1, minWidth: 150 };

//         case "customer_id":
//           return {
//             ...col,
//             headerName: "Customer ID",
//             flex: 1.2,
//             minWidth: 200,
//           };
//         case "email":
//           return { ...col, headerName: "Email", minWidth: 150 };
//         case "phone_no":
//           return { ...col, headerName: "Phone", minWidth: 150 };
//         case "customer_name":
//           return { ...col, headerName: "Customer Name", minWidth: 150 };

//         case "created_at":
//           return {
//             ...col,
//             headerName: "Created At",
//             flex: 1,
//             minWidth: 160,
//           };

//         case "resolved_at":
//           return {
//             ...col,
//             headerName: "Resolved At",
//             flex: 1,
//             minWidth: 160,
//           };

//         case "status":
//           return {
//             ...col,
//             headerName: "Status",
//             flex: 1,
//             minWidth: 130,
//           };

//         case "channel":
//           return { ...col, headerName: "Channel", flex: 1, minWidth: 140 };

//         case "tags":
//           return {
//             ...col,
//             headerName: "Tags",
//             flex: 1.5,
//             minWidth: 200,
//             valueFormatter: (params: any) => params.value || "-", // plain string now
//           };

//         case "csat_score":
//           return {
//             ...col,
//             headerName: "CSAT Score",
//             flex: 1,
//             minWidth: 140,
//             cellStyle: { textAlign: "center", fontWeight: 600 },
//             valueFormatter: (params: any) =>
//               params.value !== null ? params.value : "-",
//           };

//         case "sentiment_score":
//           return {
//             ...col,
//             headerName: "Sentiment Score",
//             flex: 1,
//             minWidth: 160,
//             cellStyle: { textAlign: "center", fontWeight: 600 },
//             valueFormatter: (params: any) =>
//               params.value !== null ? params.value : "-",
//           };

//         case "last_comment_at":
//           return {
//             ...col,
//             headerName: "Last Comment At",
//             flex: 1,
//             minWidth: 180,
//             valueFormatter: (params: any) => params.value || "-",
//           };

//         case "comment_count":
//           return {
//             ...col,
//             headerName: "Comment Count",
//             flex: 1,
//             minWidth: 160,
//             cellStyle: { textAlign: "right", fontWeight: 600 },
//             valueFormatter: (params: any) =>
//               params.value !== null ? params.value : "0",
//           };

//         default:
//           return { ...col, flex: 1, minWidth: 120 };
//       }
//     });
//   }, [columns]);
// };

// export default useSupportTicket;

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

const useSupportTicket = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "ticket_id":
          return { ...col, headerName: "Ticket ID", flex: 1, minWidth: 150 };

        case "customer_id":
          return {
            ...col,
            headerName: "Customer ID",
            flex: 1.2,
            minWidth: 200,
          };

        case "email":
          return { ...col, headerName: "Email", minWidth: 150 };

        case "phone_no":
          return { ...col, headerName: "Phone", minWidth: 150 };

        case "customer_name":
          return { ...col, headerName: "Customer Name", minWidth: 150 };

        case "created_at":
          return {
            ...col,
            headerName: "Created At",
            flex: 1,
            minWidth: 160,
          };

        case "resolved_at":
          return {
            ...col,
            headerName: "Resolved At",
            flex: 1,
            minWidth: 160,
          };

        case "status":
          return {
            ...col,
            headerName: "Status",
            flex: 1,
            minWidth: 130,
            cellRenderer: (params: ICellRendererParams) => {
              const value = params.value || "Unknown";
              let bg = "#F5F5F5";
              let color = "#616161";

              switch (value.toLowerCase()) {
                case "new":
                  bg = "#E3F2FD"; // light blue
                  color = "#1976D2";
                  break;

                case "open":
                  bg = "#E8F5E9"; // light green
                  color = "#2E7D32";
                  break;

                case "pending":
                  bg = "#FFF8E1"; // light yellow
                  color = "#F9A825";
                  break;

                case "hold":
                  bg = "#E0F7FA"; // light cyan
                  color = "#00838F";
                  break;

                case "solved":
                  bg = "#E8F5E9"; // pale green
                  color = "#1B5E20";
                  break;

                case "closed":
                  bg = "#F3E5F5"; // light purple
                  color = "#6A1B9A";
                  break;

                case "deleted":
                  bg = "#FFEBEE"; // light red
                  color = "#C62828";
                  break;

                default:
                  bg = "#ECEFF1"; // grey
                  color = "#455A64";
              }

              return (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    px: 1,
                    py: 0.3,
                    borderRadius: "6px",
                    backgroundColor: bg,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color,
                      fontWeight: 600,
                      textTransform: "capitalize",
                      fontSize: "0.75rem",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              );
            },
          };

        case "channel":
          return { ...col, headerName: "Channel", flex: 1, minWidth: 140 };

        case "tags":
          return {
            ...col,
            headerName: "Tags",
            flex: 1.5,
            minWidth: 200,
            valueFormatter: (params: any) => params.value || "-",
          };

        case "csat_score":
          return {
            ...col,
            headerName: "CSAT Score",
            flex: 1,
            minWidth: 140,
            cellStyle: { textAlign: "center", fontWeight: 600 },
            valueFormatter: (params: any) =>
              params.value !== null ? params.value : "-",
          };

        case "sentiment_score":
          return {
            ...col,
            headerName: "Sentiment Score",
            flex: 1,
            minWidth: 160,
            cellStyle: { textAlign: "center", fontWeight: 600 },
            valueFormatter: (params: any) =>
              params.value !== null ? params.value : "-",
          };

        case "last_comment_at":
          return {
            ...col,
            headerName: "Last Comment At",
            flex: 1,
            minWidth: 180,
            valueFormatter: (params: any) => params.value || "-",
          };

        case "comment_count":
          return {
            ...col,
            headerName: "Comment Count",
            flex: 1,
            minWidth: 160,
            cellStyle: { textAlign: "right", fontWeight: 600 },
            valueFormatter: (params: any) =>
              params.value !== null ? params.value : "0",
          };

        default:
          return { ...col, flex: 1, minWidth: 120 };
      }
    });
  }, [columns]);
};

export default useSupportTicket;
