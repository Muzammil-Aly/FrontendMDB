// "use client";
// import { useEffect, useMemo, useState } from "react";
// import AgGridTable from "@/components/ag-grid";
// import { touchups_columns } from "@/constants/Grid-Table/ColDefs";
// import useTouchupsColumn from "@/hooks/Ag-Grid/useTouchupsColumn";
// import {
//   Box,
//   Typography,
//   TextField,
//   CircularProgress,
//   InputAdornment,
//   FormControl,
//   IconButton,
//   MenuItem,
// } from "@mui/material";
// import { Cancel as CancelIcon } from "@mui/icons-material";
// import Loader from "@/components/Common/Loader";
// import { useGetTouchupsQuery } from "@/redux/services/profileApi";
// import { getRowStyle } from "@/utils/gridStyles";
// import debounce from "lodash.debounce";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// interface Props {
//   lotNo?: string;
//   setSelectedTouchup?: React.Dispatch<React.SetStateAction<Touchup | null>>;
// }

// interface Touchup {
//   order_id: string;
//   lot_no: string | null;
//   sku: string;
//   customer_id: string | null;
//   parts_item_no: string | null;
//   parts_item_name: string | null;
//   parts_item_name_2: string | null;
//   touchup_pen_item_no: string | null;
//   touchup_pen_item_name: string | null;
//   brand: string | null;
//   color_slug: string | null;
//   color_name: string | null;
// }

// const Touchups = ({ lotNo, setSelectedTouchup }: Props) => {
//   const { isActive, activeTabName, isTouchupPensOpen } = useSelector(
//     (state: RootState) => state.tab
//   );

//   const touchupsCol = useTouchupsColumn(touchups_columns);
//   const [highlightedId, setHighlightedId] = useState<string | null>(null);
//   const [selectedTouchupDetail, setSelectedTouchupDetail] =
//     useState<Touchup | null>(null);
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);

//   // Filters
//   const [lotNoInput, setLotNoInput] = useState("");
//   const [orderIdInput, setOrderIdInput] = useState("");
//   const [customerIdInput, setCustomerIdInput] = useState("");
//   const [skuInput, setSkuInput] = useState("");
//   const [colorSlugInput, setColorSlugInput] = useState("");
//   //  state for page size selection
//   const [pageSizeInput, setPageSizeInput] = useState(pageSize);

//   const handlePageSizeChange = (value: number) => {
//     setPageSizeInput(value);
//     setPage(1); // reset to page 1
//   };

//   const [isTyping, setIsTyping] = useState({
//     lot_no: false,
//     order_id: false,
//     customer_id: false,
//     sku: false,
//     color_slug: false,
//   });

//   const [filters, setFilters] = useState<{
//     lot_no?: string;
//     order_id?: string;
//     customer_id?: string;
//     sku?: string;
//     color_slug?: string;
//   }>({});

//   // 🔹 Debounced filter handler
//   const handleFilterChange = useMemo(
//     () =>
//       debounce((key: string, value: string) => {
//         setFilters((prev) => ({
//           ...prev,
//           [key]: value.trim() || undefined,
//         }));
//         setIsTyping((prev) => ({ ...prev, [key]: false }));
//         setPage(1);
//       }, 800),
//     []
//   );

//   // 🔹 Fetch data
//   // const { data, isLoading, isFetching } = useGetTouchupsQuery(
//   //   {
//   //     order_id: filters.order_id || undefined,
//   //     page,
//   //     page_size: pageSizeInput,
//   //     lot_no: filters.lot_no || lotNo ? lotNo : "",
//   //     customer_id: filters.customer_id,
//   //     sku: filters.sku,
//   //     color_slug: filters.color_slug,
//   //   }
//   //   // { skip: !orderId }
//   // );

//   // 🔹 Fetch data (fixed null-safe handling)
//   const { data, isLoading, isFetching } = useGetTouchupsQuery(
//     {
//       page,
//       page_size: pageSizeInput,
//       order_id: filters.order_id || undefined,
//       customer_id: filters.customer_id || undefined,
//       sku: filters.sku || undefined,
//       color_slug: filters.color_slug || undefined,

//       // 🔹 Clean and explicit handling for lot_no
//       lot_no:
//         filters.lot_no !== undefined
//           ? filters.lot_no
//           : lotNo !== undefined
//           ? lotNo
//           : undefined,
//     },
//     {
//       // Optional: skip call entirely if nothing to fetch (for safety)
//       skip: !pageSizeInput,
//     }
//   );

//   const rowData = useMemo(() => {
//     const items = (lotNo && data)?.data || data || [];
//     return Array.isArray(items)
//       ? items.map((item: any) => ({
//           order_id: item.order_id,
//           lot_no: item.lot_no,
//           sku: item.sku,
//           customer_id: item.customer_id,
//           parts_item_no: item.parts_item_no,
//           parts_item_name: item.parts_item_name,
//           parts_item_name_2: item.parts_item_name_2,
//           touchup_pen_item_no: item.touchup_pen_item_no,
//           touchup_pen_item_name: item.touchup_pen_item_name,
//           brand: item.brand,
//           color_slug: item.color_slug,
//           color_name: item.color_name,
//         }))
//       : [];
//   }, [data]);

//   const onRowClicked = (params: any) => {
//     const clicked = params.data as Touchup;
//     if (!clicked) return;
//     if (highlightedId === clicked.order_id) {
//       setSelectedTouchupDetail(null);
//       setHighlightedId(null);
//       setSelectedTouchup?.(null);
//     } else {
//       setSelectedTouchupDetail(clicked);
//       setHighlightedId(clicked.order_id);
//       setSelectedTouchup?.(clicked);
//     }
//   };

//   useEffect(() => {
//     if (data?.data?.length > 0) {
//       setSelectedTouchupDetail(data.data[0]);
//       setSelectedTouchup?.(data.data[0]);
//     } else {
//       setSelectedTouchupDetail(null);
//       setSelectedTouchup?.(null);
//     }
//   }, [data]);

//   // 🔹 Reset individual filter
//   const handleCancelFilter = (key: keyof typeof filters) => {
//     switch (key) {
//       case "lot_no":
//         setLotNoInput("");
//         break;
//       case "order_id":
//         setOrderIdInput("");
//         break;
//       case "customer_id":
//         setCustomerIdInput("");
//         break;
//       case "sku":
//         setSkuInput("");
//         break;
//       case "color_slug":
//         setColorSlugInput("");
//         break;
//     }
//     setFilters((prev) => ({ ...prev, [key]: undefined }));
//     setPage(1);
//   };

//   const renderFilter = (
//     label: string,
//     value: string,
//     key: keyof typeof filters
//   ) => (
//     <FormControl sx={{ width: 150 }}>
//       <TextField
//         value={value.toUpperCase()}
//         onChange={(e) => {
//           const val = e.target.value;
//           switch (key) {
//             case "lot_no":
//               setLotNoInput(val);
//               break;
//             case "order_id":
//               setOrderIdInput(val);
//               break;
//             case "customer_id":
//               setCustomerIdInput(val);
//               break;
//             case "sku":
//               setSkuInput(val);
//               break;
//             case "color_slug":
//               setColorSlugInput(val);
//               break;
//           }
//           setIsTyping((prev) => ({ ...prev, [key]: true }));
//           handleFilterChange(key, val);
//         }}
//         placeholder={label}
//         size="small"
//         variant="outlined"
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "20px",
//             backgroundColor: "#ffffff",
//             border: "1px solid #e0e0e0",
//             fontSize: "0.8rem",
//             fontWeight: 500,
//             transition: "all 0.25s ease",
//             "&:hover": {
//               borderColor: "#42a5f5",
//               boxShadow: "0 2px 6px rgba(66, 165, 245, 0.15)",
//             },
//             "&.Mui-focused": {
//               borderColor: "#1976d2",
//               boxShadow: "0 0 6px rgba(25, 118, 210, 0.25)",
//             },
//           },
//           "& .MuiInputBase-input": {
//             padding: "6px 14px",
//             textTransform: "uppercase",
//           },
//         }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               {isTyping[key] ? (
//                 <CircularProgress size={16} />
//               ) : value.trim() !== "" ? (
//                 <IconButton
//                   size="small"
//                   onClick={() => handleCancelFilter(key)}
//                   sx={{ p: 0.2 }}
//                 >
//                   <CancelIcon fontSize="small" />
//                 </IconButton>
//               ) : null}
//             </InputAdornment>
//           ),
//         }}
//         InputLabelProps={{ style: { display: "none" } }}
//       />
//     </FormControl>
//   );

//   return (
//     <Box display="flex" flexDirection="column" width="100%" gap={2}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexWrap="wrap"
//         gap={1.5}
//       >
//         <Typography
//           className="drag-handle"
//           variant="caption"
//           sx={{
//             fontWeight: 600,
//             color: "#fff",
//             background: "#1976d2",
//             px: 1.5,
//             py: 0.5,
//             fontSize: "1em",
//             borderRadius: "3px 5px 5px 3px",
//             position: "relative",
//             display: "inline-block",
//             "::before": {
//               content: '""',
//               position: "absolute",
//               left: -8,
//               top: "50%",
//               transform: "translateY(-50%)",
//               width: 0,
//               height: 0,
//               borderTop: "8px solid transparent",
//               borderBottom: "8px solid transparent",
//               borderRight: "8px solid #1976d2",
//             },
//           }}
//         >
//           Touchups
//         </Typography>

//         <Box display="flex" gap={1.5} flexWrap="wrap" marginRight={3}>
//           {renderFilter("Lot No", lotNoInput, "lot_no")}
//           {/* {renderFilter("Order ID", orderIdInput, "order_id")} */}
//           {/* {renderFilter("Customer ID", customerIdInput, "customer_id")} */}
//           {renderFilter("SKU", skuInput, "sku")}
//           {/* {renderFilter("Color Slug", colorSlugInput, "color_slug")} */}
//           <FormControl sx={{ width: 150 }}>
//             <TextField
//               select
//               value={pageSizeInput}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               size="small"
//               variant="outlined"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "20px",
//                   backgroundColor: "#ffffff",
//                   border: "1px solid #e0e0e0",
//                   fontSize: "0.8rem",
//                   fontWeight: 500,
//                   transition: "all 0.25s ease",
//                   "&:hover": {
//                     borderColor: "#42a5f5",
//                     boxShadow: "0 2px 6px rgba(66, 165, 245, 0.15)",
//                   },
//                   "&.Mui-focused": {
//                     borderColor: "#1976d2",
//                     boxShadow: "0 0 6px rgba(25, 118, 210, 0.25)",
//                   },
//                 },
//                 "& .MuiInputBase-input": {
//                   padding: "6px 14px",
//                   textTransform: "none",
//                 },
//               }}
//               InputLabelProps={{ style: { display: "none" } }}
//             >
//               {[10, 50, 100].map((size) => (
//                 <MenuItem key={size} value={size}>
//                   {size}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </FormControl>
//         </Box>
//       </Box>

//       {isLoading || isFetching ? (
//         <Loader />
//       ) : (
//         <AgGridTable
//           rowData={rowData}
//           columnDefs={touchupsCol}
//           onRowClicked={onRowClicked}
//           height={lotNo ? 300 : 400}
//           getRowStyle={getRowStyle(highlightedId)}
//           enablePagination
//           pagination={false}
//           currentPage={page}
//           totalPages={data?.total_pages || 1}
//           onPageChange={(newPage: number) => setPage(newPage)}
//           paginationPageSize={pageSizeInput}
//         />
//       )}
//     </Box>
//   );
// };

// export default Touchups;
"use client";

import { useEffect, useMemo, useState } from "react";
import AgGridTable from "@/components/ag-grid";
import { touchups_columns } from "@/constants/Grid-Table/ColDefs";
import useTouchupsColumn from "@/hooks/Ag-Grid/useTouchupsColumn";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
  FormControl,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";
import Loader from "@/components/Common/Loader";
import { useGetTouchupsQuery } from "@/redux/services/profileApi";
import { getRowStyle } from "@/utils/gridStyles";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  lotNo?: string | null;
  shouldFilterNull?: boolean;
  setSelectedTouchup?: React.Dispatch<React.SetStateAction<Touchup | null>>;
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

const Touchups = ({
  lotNo,
  shouldFilterNull = false,
  setSelectedTouchup,
}: Props) => {
  const { isActive, activeTabName, isTouchupPensOpen } = useSelector(
    (state: RootState) => state.tab
  );

  const touchupsCol = useTouchupsColumn(touchups_columns);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedTouchupDetail, setSelectedTouchupDetail] =
    useState<Touchup | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [pageSizeInput, setPageSizeInput] = useState(pageSize);

  // 🔹 Filters
  const [filters, setFilters] = useState<{
    lot_no?: string;
    order_id?: string;
    customer_id?: string;
    sku?: string;
    color_slug?: string;
  }>({});

  const [inputs, setInputs] = useState({
    lot_no: "",
    order_id: "",
    customer_id: "",
    sku: "",
    color_slug: "",
  });

  const [isTyping, setIsTyping] = useState({
    lot_no: false,
    order_id: false,
    customer_id: false,
    sku: false,
    color_slug: false,
  });

  const handlePageSizeChange = (value: number) => {
    setPageSizeInput(value);
    setPage(1);
  };

  // 🔹 Debounced filter handler
  const handleFilterChange = useMemo(
    () =>
      debounce((key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({
          ...prev,
          [key]: value.trim() || undefined,
        }));
        setIsTyping((prev) => ({ ...prev, [key]: false }));
        setPage(1);
      }, 800),
    []
  );

  // 🔹 Query Params with clean null handling
  const queryParams = {
    page,
    page_size: pageSizeInput,
    order_id: filters.order_id || undefined,
    customer_id: filters.customer_id || undefined,
    sku: filters.sku || undefined,
    color_slug: filters.color_slug || undefined,
    ...(filters.lot_no ?? lotNo
      ? { lot_no: filters.lot_no ?? lotNo }
      : shouldFilterNull
      ? { lot_no: "null" } // filter for null lots only
      : {}),
  };

  const { data, isLoading, isFetching } = useGetTouchupsQuery(queryParams);

  // 🔹 Transform Data
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

  // 🔹 Row click handler
  const onRowClicked = (params: any) => {
    const clicked = params.data as Touchup;
    if (!clicked) return;
    if (highlightedId === clicked.color_slug) {
      setSelectedTouchupDetail(null);
      setHighlightedId(null);
      setSelectedTouchup?.(null);
    } else {
      setSelectedTouchupDetail(clicked);
      setHighlightedId(clicked.color_slug);
      setSelectedTouchup?.(clicked);
    }
  };

  // 🔹 Auto-select first row when data changes
  useEffect(() => {
    if (data?.data?.length > 0) {
      setSelectedTouchupDetail(data.data[0]);
      setSelectedTouchup?.(data.data[0]);
    } else {
      setSelectedTouchupDetail(null);
      setSelectedTouchup?.(null);
    }
  }, [data]);

  // 🔹 Reset Filter
  const handleCancelFilter = (key: keyof typeof filters) => {
    setInputs((prev) => ({ ...prev, [key]: "" }));
    setFilters((prev) => ({ ...prev, [key]: undefined }));
    setPage(1);
  };

  // 🔹 Render Input Filter
  const renderFilter = (label: string, key: keyof typeof filters) => (
    <FormControl sx={{ width: 150 }}>
      <TextField
        value={inputs[key].toUpperCase()}
        onChange={(e) => {
          const val = e.target.value;
          setInputs((prev) => ({ ...prev, [key]: val }));
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
              ) : inputs[key].trim() !== "" ? (
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
  // 🔹 If no lot number provided and should not filter nulls
  if (!lotNo && shouldFilterNull) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height={320}
        sx={{
          background: "linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)",
          borderRadius: "16px",
          border: "1px dashed #c7c7c7",
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            background: "linear-gradient(180deg, #fdfdfd 0%, #f5f5f5 100%)",
            borderColor: "#b0b0b0",
          },
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#e3f2fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#1976d2", fontWeight: 700, letterSpacing: "1px" }}
          >
            ℹ️
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: "#424242",
            fontWeight: 600,
            mb: 0.5,
            letterSpacing: "0.5px",
          }}
        >
          No Lot Number Found
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#757575",
            maxWidth: 300,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Please select or provide a valid <strong>Lot No</strong> to view
          touchup details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      {/* 🔹 Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={1.5}
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
          Touchups
        </Typography>

        {/* 🔹 Filters */}
        <Box display="flex" gap={1.5} flexWrap="wrap" marginRight={3}>
          {renderFilter("Lot No", "lot_no")}
          {renderFilter("SKU", "sku")}
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

      {/* 🔹 Table */}
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={touchupsCol}
          onRowClicked={onRowClicked}
          height={lotNo ? 300 : 400}
          getRowStyle={getRowStyle(highlightedId)}
          enablePagination
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

export default Touchups;
