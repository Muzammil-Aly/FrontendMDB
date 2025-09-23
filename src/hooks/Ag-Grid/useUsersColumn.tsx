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

// const useUsersColumn = (columns: Column[]) => {
//   return useMemo(() => {
//     return columns.map((col: any) => {
//       switch (col.field) {
//         case "customer_id":
//           return { ...col, headerName: "Customer ID", width: 140 };
//         case "email":
//           return { ...col, headerName: "Email", width: 240 };
//         case "phone":
//           return { ...col, headerName: "Phone", width: 135 };
//         case "full_name":
//           return { ...col, headerName: "Full Name", width: 180 };
//         case "source":
//           return { ...col, headerName: "Source", width: 95 };
//         case "join_type":
//           return { ...col, headerName: "Join Type", width: 110 };
//         case "key":
//           return { ...col, headerName: "Key", width: 240 };
//         default:
//           return col;
//       }
//     });
//   }, [columns]);
// };

// export default useUsersColumn;

import { ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { fontSize, height } from "@mui/system";

export interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<ICellRendererParams>;
  width?: number;
  flex?: number;
}

const useUsersColumn = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "customer_id":
          return {
            ...col,
            headerName: "Customer ID",
            width: 140,
            cellStyle: { fontWeight: "600", fontSize: "16px" },
          };
        case "email":
          return { ...col, headerName: "Email", width: 240 };
        case "phone":
          return { ...col, headerName: "Phone", width: 135 };
        case "full_name":
          return { ...col, headerName: "Full Name", width: 180 };
        case "source":
          return {
            ...col,
            headerName: "Source",
            width: 120,
            cellRenderer: (params: ICellRendererParams) => {
              const value = params.value || "Unknown";
              let bg = "#F5F5F5";
              let color = "#616161";

              switch (value.toLowerCase()) {
                case "wismo":
                  bg = "#E3F2FD"; // bright light blue
                  color = "#0D47A1"; // deep vivid blue
                  break;

                case "klaviyo":
                  bg = "#FFFFFF"; // pure white background
                  color = "#24CE78"; // Klaviyo bright green

                  break;
                case "zendesk":
                  bg = "#FFE9D5"; // peachy orange background
                  color = "#EF6820"; // bold orange
                  break;

                case "shopify":
                  bg = "#DCFCE7"; // fresh mint green background
                  color = "#15803D"; // rich dark green
                  break;

                default:
                  bg = "#F5F5F5";
                  color = "#424242";
              }

              return (
                <Box
                  sx={{
                    display: "flex",
                    px: 1.5, // add horizontal padding
                    py: 0.6,
                    borderRadius: "20px", // small corner rounding (rectangle look)
                    backgroundColor: bg,
                    height: "30px",
                    textAlign: "center",
                    justifyContent: "center",
                    mt: "8px",
                    boxShadow: `0 1px 2px rgba(0,0,0,0.08)`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              );
            },
          };
        case "join_type":
          return { ...col, headerName: "Join Type", width: 110 };
        case "key":
          return { ...col, headerName: "Key", width: 240 };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useUsersColumn;
