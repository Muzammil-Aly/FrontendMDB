// "use client";
// import { useState, useMemo } from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
// import AgGridTable from "@/components/ag-grid";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import { Box, Paper } from "@mui/material";
// import Touchups from "../../Touchups";
// import TouchupsPens from "../../TouchupsPens";
// import { inventory_columns } from "@/constants/Grid-Table/ColDefs";
// import useInventoryColumn from "@/hooks/Ag-Grid/useInventoryColumn";
// import Loader from "@/components/Common/Loader";
// import { useGetInventoryQuery } from "@/redux/services/profileApi";
// import { getRowStyle } from "@/utils/gridStyles";
// import SearchInput from "@/components/Common/CustomSearch/SearchInput";
// import DropdownSearchInput from "@/components/Common/CustomSearch/DropdownSearchInput";
// import CustomSelect from "@/components/Common/CustomTabs/CustomSelect";
// import { useGetLocationCodesQuery } from "@/redux/services/InventoryApi";
// import debounce from "lodash.debounce";
// import AllTouchups from "../../AllTouchups";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const Inventory = () => {
//   const tiCol = useInventoryColumn(inventory_columns);

//   const [highlightedId, setHighlightedId] = useState<string | null>(null);
//   const [pageSize, setPageSize] = useState(10);
//   const [page, setPage] = useState(1);
//   const [locationCodeInput, setLocationCodeInput] = useState("");
//   const [locationCodeFilter, setLocationCodeFilter] = useState<
//     string | undefined
//   >(undefined);
//   const [itemNoInput, setItemNoInput] = useState("");
//   const [ItemNoFilter, setItemNoFilter] = useState<string | undefined>(
//     undefined
//   );
//   const [descriptionInput, setDescriptionInput] = useState("");
//   const [descriptionFilter, setDescriptionFilter] = useState<
//     string | undefined
//   >(undefined);
//   const [descriptionTyping, setDescriptionTyping] = useState(false);

//   const [selectedInventoryItem, setSelectedInventoryItem] = useState<
//     any | null
//   >(null);
//   const [selectedTouchup, setSelectedTouchup] = useState<any | null>(null);
//   const [isItemNoInputTyping, setItemNoInputTyping] = useState(false);
//   const [islocationCodeInputTyping, setLocationCodeInputTyping] =
//     useState(false);
//   const { data, isLoading, isFetching } = useGetInventoryQuery({
//     page,
//     page_size: pageSize,
//     location_code: locationCodeFilter || undefined,
//     item_no: ItemNoFilter || undefined,
//     description: descriptionFilter,
//   });

//   // const rowData = useMemo(() => {
//   //   const items = data?.data || data || [];
//   //   return Array.isArray(items)
//   //     ? items.map((item: any) => ({
//   //         "Location Code": item["Location Code"],
//   //         "Item No_": item["Item No_"],
//   //         Description: item.Description,
//   //         Qty_: item.Qty_,
//   //         ETA: item.ETA,
//   //         "Qty_ Available": item["Qty_ Available"],
//   //         "Avail_ Qty_ on Hand": item["Avail_ Qty_ on Hand"],
//   //         "Avail_ Qty_ to Commit": item["Avail_ Qty_ to Commit"],
//   //         "Qty_ on Blocked Lot_Bin": item["Qty_ on Blocked Lot_Bin"],
//   //       }))
//   //     : [];
//   // }, [data]);

//   // const rowData = useMemo(() => {
//   //   const items = data?.data || data || [];
//   //   return Array.isArray(items)
//   //     ? items.map((item: any) => ({
//   //         "Location Code": item.location_code,
//   //         "Item No": item.item_no,
//   //         Description: item.description ?? "-",
//   //         Qty: item.qty ?? "-",
//   //         ETA: item.eta ?? "-",
//   //         "Qty Available": item.qty_available ?? 0,
//   //         "Avail Qty on Hand": item.avail_qty_on_hand ?? 0,
//   //         "Avail Qty to Commit": item.avail_qty_to_commit ?? 0,
//   //         "Qty on Blocked Lot Bin": item.qty_on_blocked_lot_bin ?? "-",
//   //         "Qty on SO": item.qty_on_so ?? "-",
//   //         "Life Cycle Status": item.life_cycle_status_code ?? "-",
//   //         "Qty on PO": item.qty_on_po ?? "-",
//   //       }))
//   //     : [];
//   // }, [data]);
//   const rowData = useMemo(() => {
//     const items = data?.data || data || [];
//     return Array.isArray(items)
//       ? items.map((item: any) => ({
//           location_code: item.location_code ?? "-",
//           item_no: item.item_no ?? "-",
//           description: item.description ?? "-",
//           qty: item.qty ?? "-",
//           eta: item.eta ?? "-",
//           qty_available: item.qty_available ?? 0,
//           avail_qty_on_hand: item.avail_qty_on_hand ?? 0,
//           avail_qty_to_commit: item.avail_qty_to_commit ?? 0,
//           qty_on_blocked_lot_bin: item.qty_on_blocked_lot_bin ?? "-",
//           qty_on_so: item.qty_on_so ?? "-",
//           life_cycle_status_code: item.life_cycle_status_code ?? "-",
//           qty_on_po: item.qty_on_po ?? "-",
//         }))
//       : [];
//   }, [data]);

//   const {
//     data: locationCodeSuggestions = [],
//     isFetching: isLocationCodeLoading,
//   } = useGetLocationCodesQuery(locationCodeInput, {
//     skip: locationCodeInput.trim().length < 1,
//   });

//   const onRowClicked = (params: any) => {
//     setHighlightedId(params.data["Item No_"]);
//     setSelectedInventoryItem(params.data);
//   };
//   console.log("selectedInventoryItem", selectedInventoryItem);

//   const debouncedLocationCode = useMemo(
//     () =>
//       debounce((value: string) => {
//         setLocationCodeFilter(value ? value.toUpperCase() : undefined);
//         setPage(1);
//         setLocationCodeInputTyping(false);
//       }, 5000),
//     []
//   );

//   const debouncedItemNo = useMemo(
//     () =>
//       debounce((value: string) => {
//         setItemNoFilter(value);
//         setPage(1);
//         setItemNoInputTyping(false);
//       }, 5000),
//     []
//   );
//   const debouncedDescription = useMemo(
//     () =>
//       debounce((value: string) => {
//         setDescriptionFilter(value);
//         setPage(1);
//         setDescriptionTyping(false);
//       }, 5000),
//     []
//   );
//   const baseLayout = [
//     {
//       i: "inventory",
//       x: 0,
//       y: 0,
//       w: 12,
//       h: 15,
//       minW: 6,
//       minH: 10,
//     },
//     {
//       i: "touchups",
//       x: 0,
//       y: 20,
//       w: 12,
//       h: 14,
//       minH: 8,
//     },
//     {
//       i: "touchups_pens",
//       x: 0,
//       y: 35,
//       w: 12,
//       h: 14,
//       minH: 8,
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         minHeight: "100vh",
//         overflow: "hidden",
//         // ml: 5,
//         // mr: 5,
//         mb: 1,
//         // mt: 2,
//       }}
//     >
//       {/* Filters */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box
//           display="flex"
//           // justifyContent="space-between"
//           gap={2}
//           mb={2}
//           mt={2}
//           ml={10}
//         >
//           <DropdownSearchInput
//             label="Location Code"
//             value={locationCodeInput}
//             setValue={setLocationCodeInput}
//             setFilter={setLocationCodeFilter}
//             debouncedFunction={debouncedLocationCode}
//             loading={isLocationCodeLoading}
//             suggestions={locationCodeSuggestions?.results || []}
//             width={150}
//           />
//           <SearchInput
//             label="Item No"
//             value={itemNoInput}
//             setValue={(val) => {
//               setItemNoInput(val);
//               setItemNoInputTyping(true);
//             }}
//             setFilter={setItemNoFilter}
//             debouncedFunction={debouncedItemNo}
//             loading={isItemNoInputTyping}
//             width={150}
//           />
//           <SearchInput
//             label="Description"
//             value={descriptionInput}
//             setValue={(val) => {
//               setDescriptionInput(val);
//               setDescriptionTyping(true);
//             }}
//             setFilter={setDescriptionFilter}
//             debouncedFunction={debouncedDescription}
//             loading={descriptionTyping}
//             width={150}
//           />
//         </Box>
//         <Box>
//           <CustomSelect
//             label="Page Size"
//             value={pageSize}
//             options={[10, 50, 100]}
//             onChange={(val) => setPageSize(val)}
//           />
//         </Box>
//       </Box>
//       {/* Responsive Layout */}
//       <ResponsiveGridLayout
//         className="layout"
//         layouts={{ lg: baseLayout, md: baseLayout, sm: baseLayout }}
//         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
//         cols={{ lg: 12, md: 12, sm: 12, xs: 4 }}
//         rowHeight={30}
//         isDraggable
//         isResizable
//         draggableHandle=".drag-handle"
//         draggableCancel=".no-drag"
//         resizeHandles={["se", "e", "s"]}
//       >
//         {/* Inventory Table */}
//         <Paper
//           key="inventory"
//           sx={{
//             p: 2,
//             borderRadius: 3,
//             height: "100%",
//             overflowY: "auto",
//             overflowX: "hidden",
//             ml: 5,
//           }}
//         >
//           {isLoading || isFetching ? (
//             <Loader />
//           ) : (
//             <AgGridTable
//               rowData={rowData}
//               columnDefs={tiCol}
//               onRowClicked={onRowClicked}
//               getRowStyle={getRowStyle(highlightedId)}
//               enablePagination
//               currentPage={page}
//               totalPages={data?.total_pages || 1}
//               onPageChange={setPage}
//               pagination
//               paginationPageSize={pageSize}
//             />
//           )}
//         </Paper>

//         {/* Touchups */}
//         <Paper
//           key="touchups"
//           sx={{
//             p: 2,
//             borderRadius: 3,
//             height: "100%",
//             overflowY: "auto",
//             overflowX: "hidden",
//             ml: 5,
//           }}
//         >
//           {/* <AllTouchups /> */}
//           <Touchups />
//         </Paper>

//         {/* Touchups Pens */}
//         <Paper
//           key="touchups_pens"
//           sx={{
//             p: 2,
//             borderRadius: 3,
//             height: "100%",
//             overflowY: "auto",
//             overflowX: "hidden",
//             ml: 5,
//           }}
//         >
//           <TouchupsPens />
//         </Paper>
//       </ResponsiveGridLayout>
//     </Box>
//   );
// };

// export default Inventory;

"use client";
import { useState, useMemo, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import AgGridTable from "@/components/ag-grid";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  Box,
  Paper,
  Drawer,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import Touchups from "../../Touchups";
import TouchupsPens from "../../TouchupsPens";
import { inventory_columns } from "@/constants/Grid-Table/ColDefs";
import useInventoryColumn from "@/hooks/Ag-Grid/useInventoryColumn";
import Loader from "@/components/Common/Loader";
import { useGetInventoryQuery } from "@/redux/services/profileApi";
import { getRowStyle } from "@/utils/gridStyles";
import SearchInput from "@/components/Common/CustomSearch/SearchInput";
import DropdownSearchInput from "@/components/Common/CustomSearch/DropdownSearchInput";
import CustomSelect from "@/components/Common/CustomTabs/CustomSelect";
import { useGetLocationCodesQuery } from "@/redux/services/InventoryApi";
import debounce from "lodash.debounce";
import InventorySOTable from "./InventorySOTable";
import InventoryPOTable from "./InventoryPOTable";
import InventoryQTYone from "./InventoryQTYone";
import InventoryQTYtwo from "./InventoryQTYtwo";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Inventory = () => {
  // const tiCol = useInventoryColumn(inventory_columns);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [locationCodeInput, setLocationCodeInput] = useState("");
  const [locationCodeFilter, setLocationCodeFilter] = useState<
    string | undefined
  >(undefined);
  const [itemNoInput, setItemNoInput] = useState("");
  const [ItemNoFilter, setItemNoFilter] = useState<string | undefined>(
    undefined
  );
  const [descriptionInput, setDescriptionInput] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState<
    string | undefined
  >(undefined);
  const [descriptionTyping, setDescriptionTyping] = useState(false);

  const [selectedInventoryItem, setSelectedInventoryItem] = useState<
    any | null
  >(null);

  const [isItemNoInputTyping, setItemNoInputTyping] = useState(false);
  const [islocationCodeInputTyping, setLocationCodeInputTyping] =
    useState(false);
  const [selectedQtyoneItem, setSelectedQtyoneItem] = useState<any | null>(
    null
  );

  const [openDrawer, setOpenDrawer] = useState<null | "qty" | "so" | "po">(
    null
  );

  const { data, isLoading, isFetching } = useGetInventoryQuery({
    page,
    page_size: pageSize,
    location_code: locationCodeFilter || undefined,
    item_no: ItemNoFilter || undefined,
    description: descriptionFilter,
  });
  console.log("selectedQtyoneItem", selectedQtyoneItem);

  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          location_code: item.location_code ?? "-",
          item_no: item.item_no ?? "-",
          description: item.description ?? "-",
          qty: item.qty ?? "-",
          eta: item.eta ?? "-",
          qty_available: item.qty_available ?? 0,
          avail_qty_on_hand: item.avail_qty_on_hand ?? 0,
          avail_qty_to_commit: item.avail_qty_to_commit ?? 0,
          qty_on_blocked_lot_bin: item.qty_on_blocked_lot_bin ?? "-",
          qty_on_so: item.qty_on_so ?? "-",
          life_cycle_status_code: item.life_cycle_status_code ?? "-",
          qty_on_po: item.qty_on_po ?? "-",
        }))
      : [];
  }, [data]);

  const {
    data: locationCodeSuggestions = [],
    isFetching: isLocationCodeLoading,
  } = useGetLocationCodesQuery(locationCodeInput, {
    skip: locationCodeInput.trim().length < 1,
  });

  // const onRowClicked = (params: any) => {
  //   setHighlightedId(params.data.item_no);
  //   setSelectedInventoryItem(params.data);
  // };

  const onRowClicked = (params: any) => {
    const clickedId = params.data.item_no;

    // if same row clicked again → unselect
    if (highlightedId === clickedId) {
      setHighlightedId(null);
      setSelectedInventoryItem(null);
    } else {
      // select new row
      setHighlightedId(clickedId);
      setSelectedInventoryItem(params.data);
    }
  };

  const debouncedLocationCode = useMemo(
    () =>
      debounce((value: string) => {
        setLocationCodeFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setLocationCodeInputTyping(false);
      }, 500),
    []
  );

  const debouncedItemNo = useMemo(
    () =>
      debounce((value: string) => {
        setItemNoFilter(value);
        setPage(1);
        setItemNoInputTyping(false);
      }, 500),
    []
  );

  const debouncedDescription = useMemo(
    () =>
      debounce((value: string) => {
        setDescriptionFilter(value);
        setPage(1);
        setDescriptionTyping(false);
      }, 500),
    []
  );

  const baseLayout = [
    { i: "inventory", x: 0, y: 0, w: 12, h: 15, minW: 6, minH: 10 },
    { i: "touchups", x: 0, y: 20, w: 12, h: 14, minH: 8 },
    { i: "touchups_pens", x: 0, y: 35, w: 12, h: 14, minH: 8 },
  ];

  // const handleCloseDrawer = () => setOpenDrawer(null);

  const handleCloseDrawer = () => {
    setOpenDrawer(null);
    setSelectedInventoryItem(null);
    setSelectedQtyoneItem(null);
    setPendingDrawer(null);
    setHighlightedId(null);
  };

  // ✅ Unified drawer click handler for QTY, SO, and PO
  // const handleCellClick = (type: "qty" | "so" | "po", data: any) => {
  //   // if same row + same drawer clicked → close it
  //   if (
  //     selectedInventoryItem?.item_no === data.item_no &&
  //     openDrawer === type
  //   ) {
  //     setOpenDrawer(null);
  //     setSelectedInventoryItem(null);
  //     return;
  //   }

  //   // otherwise open the corresponding drawer
  //   setSelectedInventoryItem(data);
  //   setOpenDrawer(type);
  // };
  // const handleCellClick = (type: "qty" | "so" | "po", data: any) => {
  //   //  If same row + same drawer clicked again → close it
  //   if (
  //     selectedInventoryItem?.item_no === data.item_no &&
  //     openDrawer === type
  //   ) {
  //     setOpenDrawer(null);
  //     setSelectedInventoryItem(null);
  //     return;
  //   }

  //   //  First update item, then open drawer on next render tick
  //   setSelectedInventoryItem(data);
  //   setTimeout(() => setOpenDrawer(type), 0);
  // };

  const [pendingDrawer, setPendingDrawer] = useState<
    "qty" | "so" | "po" | null
  >(null);

  const handleCellClick = (type: "qty" | "so" | "po", data: any) => {
    // 👇 If same item and same drawer clicked again → close it
    if (
      selectedInventoryItem?.item_no === data.item_no &&
      selectedInventoryItem?.location_code === data.location_code &&
      openDrawer === type
    ) {
      setOpenDrawer(null);
      setSelectedInventoryItem(null);
      return;
    }

    // 👇 First update item, then open drawer after state updates
    setSelectedInventoryItem(data);
    setPendingDrawer(type);
  };

  // 👇 Effect to open drawer only after selected item is set
  useEffect(() => {
    if (selectedInventoryItem && pendingDrawer) {
      setOpenDrawer(pendingDrawer);
      setPendingDrawer(null);
    }
  }, [selectedInventoryItem, pendingDrawer]);

  // now you can safely use it here
  const tiCol = useInventoryColumn(inventory_columns(handleCellClick));
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", overflow: "hidden" }}>
      {/* ================= Filters ================= */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2} mb={2} mt={2} ml={10}>
          <DropdownSearchInput
            label="Location Code"
            value={locationCodeInput}
            setValue={setLocationCodeInput}
            setFilter={setLocationCodeFilter}
            debouncedFunction={debouncedLocationCode}
            loading={isLocationCodeLoading}
            suggestions={locationCodeSuggestions?.results || []}
            width={150}
          />
          <SearchInput
            label="Item No"
            value={itemNoInput}
            setValue={(val) => {
              setItemNoInput(val);
              setItemNoInputTyping(true);
            }}
            setFilter={setItemNoFilter}
            debouncedFunction={debouncedItemNo}
            loading={isItemNoInputTyping}
            width={150}
          />
          <SearchInput
            label="Description"
            value={descriptionInput}
            setValue={(val) => {
              setDescriptionInput(val);
              setDescriptionTyping(true);
            }}
            setFilter={setDescriptionFilter}
            debouncedFunction={debouncedDescription}
            loading={descriptionTyping}
            width={150}
          />
        </Box>
        <Box>
          <CustomSelect
            label="Page Size"
            value={pageSize}
            options={[10, 50, 100]}
            onChange={(val) => setPageSize(val)}
          />
        </Box>
      </Box>

      {/* ================= Grid Layout ================= */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: baseLayout, md: baseLayout, sm: baseLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 4 }}
        rowHeight={30}
        isDraggable
        isResizable
        draggableHandle=".drag-handle"
        draggableCancel=".no-drag"
        resizeHandles={["se", "e", "s"]}
      >
        {/* Inventory Table */}
        <Paper
          key="inventory"
          sx={{
            p: 2,
            borderRadius: 3,
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            ml: 5,
          }}
        >
          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <AgGridTable
              rowData={rowData}
              columnDefs={tiCol}
              onRowClicked={onRowClicked}
              getRowStyle={getRowStyle(highlightedId)}
              enablePagination
              currentPage={page}
              totalPages={data?.total_pages || 1}
              onPageChange={setPage}
              pagination
              paginationPageSize={pageSize}
            />
          )}
        </Paper>

        {/* Touchups */}
        <Paper
          key="touchups"
          sx={{
            p: 2,
            borderRadius: 3,
            height: "100%",
            overflowY: "auto",
            ml: 5,
          }}
        >
          <Touchups />
        </Paper>

        {/* Touchups Pens */}
        <Paper
          key="touchups_pens"
          sx={{
            p: 2,
            borderRadius: 3,
            height: "100%",
            overflowY: "auto",
            ml: 5,
          }}
        >
          <TouchupsPens />
        </Paper>
      </ResponsiveGridLayout>

      {/* ================= Floating Action Bar ================= */}
      {/* <AnimatePresence>
        {selectedInventoryItem && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 30,
              right: 50,
              background: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              borderRadius: 50,
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              zIndex: 9999,
            }}
          >
            <Tooltip title="View QTY Details" arrow>
              <IconButton color="primary" onClick={() => setOpenDrawer("qty")}>
                <Inventory2Icon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Sales Orders (SO)" arrow>
              <IconButton color="secondary" onClick={() => setOpenDrawer("so")}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Purchase Orders (PO)" arrow>
              <IconButton color="success" onClick={() => setOpenDrawer("po")}>
                <LocalShippingIcon />
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* ================= Drawers ================= */}
      <Drawer
        anchor="right"
        open={openDrawer === "qty"}
        onClose={handleCloseDrawer}
      >
        <Box sx={{ width: "80vw", display: "flex" }}>
          <InventoryQTYone
            location_code={selectedInventoryItem?.location_code}
            item_no={selectedInventoryItem?.item_no}
            setSelectedQtyoneItem={setSelectedQtyoneItem}
          />
          <InventoryQTYtwo selectedQtyoneItem={selectedQtyoneItem?.item_no} />
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={openDrawer === "so"}
        onClose={handleCloseDrawer}
      >
        <Box sx={{ width: "50vw" }}>
          <InventorySOTable
            location_code={selectedInventoryItem?.location_code}
            item_no={selectedInventoryItem?.item_no}
          />
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={openDrawer === "po"}
        onClose={handleCloseDrawer}
      >
        <Box sx={{ width: "50vw" }}>
          <InventoryPOTable
            location_code={selectedInventoryItem?.location_code}
            item_no={selectedInventoryItem?.item_no}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Inventory;
