// "use client";
// import { useState, useEffect } from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
// import AgGridTable from "@/components/ag-grid";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import { Box, Paper, Typography } from "@mui/material";
// import CustomerSegmentCard from "../CustomerSegmentCard";
// import OrderItems from "../OrderItems";
// import SupportTicketComments from "../SupportTicketComments";
// import Touchups from "../Touchups";

// import { useDispatch } from "react-redux";
// import { setActiveTab } from "../../../app/redux/tabSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import TouchupsPens from "../TouchupsPens";
// const ResponsiveGridLayout = WidthProvider(Responsive);

// const ResponsiveDashboard = ({
//   rowData,
//   userCol,
//   onRowClicked,
//   selectedCustId,
//   selectedOrderId,
//   selectedTicket,
//   currentPage,
//   totalPages,
//   onPageChange,
//   currentMenu,
//   paginationPageSize,
//   getRowStyle,
//   filters,
// }: any) => {
//   const { isActive, activeTabName, isActiveTouchUp } = useSelector(
//     (state: RootState) => state.tab
//   );
//   const dispatch = useDispatch();

//   const hasId = selectedCustId || selectedOrderId || selectedTicket;

//   type OrderItem = { order_id: string; [key: string]: any };
//   const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(
//     null
//   );

//   const [selectedTouchup, setSelectedTouchup] = useState<any | null>(null);
//   const [orderItemSec, setOrderItemSec] = useState<boolean>(false);
//   useEffect(() => {
//     if (hasId) {
//       dispatch(setActiveTab({ isActive: true, name: currentMenu }));
//     } else {
//       dispatch(setActiveTab({ isActive: false }));
//     }
//   }, [hasId, currentMenu, dispatch]);

//   useEffect(() => {
//     if (selectedOrderItem && hasId) {
//       dispatch(setActiveTab({ isActive: true, name: currentMenu }));
//     } else {
//       dispatch(setActiveTab({ isActive: false }));
//     }
//   }, [hasId, currentMenu, dispatch]);
//   // useEffect(() => {
//   //   // Reset when orderId changes or is cleared
//   //   setSelectedOrderItem(null);
//   //   setSelectedTouchup(null);
//   // }, [selectedOrderId]);

//   // useEffect(() => {
//   //   //  whenever parent filters change, clear inner selections
//   //   setSelectedOrderItem(null);
//   //   setSelectedTouchup(null);
//   // }, [filters]);
//   useEffect(() => {
//     if (selectedOrderId && currentMenu === "orders") {
//       setOrderItemSec(true);
//     } else {
//       setOrderItemSec(false);
//     }
//   }, [selectedOrderId, currentMenu]);

//   console.log("selectedTouchup in responsivDashbord", selectedTouchup);

//   const layouts = {
//     lg: [
//       {
//         i: "profiles",
//         x: 0,
//         y: 0,
//         w: hasId ? 7 : 12,
//         h: 16,
//         minW: 4,
//         minH: 16,
//         maxH: 50,
//       },
//       {
//         i: "customer_segments",
//         x: hasId ? 7 : 0,
//         y: 0,
//         w: hasId ? 5 : 12,
//         h: 16,
//         minW: 3,
//         minH: 16,
//         maxH: 50,
//       },
//       {
//         i: "order_items",
//         x: 0,
//         y: 16,
//         w: 12,
//         h: selectedOrderItem ? 7 : 0,
//         minH: 0,
//         maxH: 40,
//       },
//     ],
//     md: [
//       { i: "profiles", x: 0, y: 0, w: hasId ? 6 : 12, h: 16, maxH: 40 },
//       { i: "customer_segments", x: 6, y: 0, w: 6, h: 16, maxH: 40 },
//       {
//         i: "order_items",
//         x: 0,
//         y: 20,
//         w: 12,
//         h: selectedOrderItem ? 12 : 0,
//         maxH: 50,
//       },
//     ],
//     sm: [
//       { i: "profiles", x: 0, y: 0, w: 12, h: 18, maxH: 40 },
//       { i: "customer_segments", x: 0, y: 18, w: 12, h: 18, maxH: 40 },
//       {
//         i: "order_items",
//         x: 0,
//         y: 36,
//         w: 12,
//         h: selectedOrderItem ? 12 : 0,
//         maxH: 40,
//       },
//     ],
//   };

//   console.log("Selected order id is ", selectedOrderItem);
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         minHeight: "100vh",
//         // pl: { xs: 1, sm: 2, md: 4, lg: 6 },
//       }}
//     >
//       <ResponsiveGridLayout
//         className="layout"
//         layouts={layouts}
//         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//         cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
//         rowHeight={30}
//         draggableHandle=".drag-handle"
//         isDraggable
//         isResizable
//         draggableCancel=".no-drag"
//         resizeHandles={["se", "e", "s"]}
//       >
//         <Paper
//           key="profiles"
//           elevation={3}
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//           sx={{
//             p: 2,
//             borderRadius: 3,
//             // height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             // overflow: "hidden",
//           }}
//         >
//           <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
//             <Box
//             //  sx={ { minWidth: 1000 }}
//             >
//               <AgGridTable
//                 rowData={rowData}
//                 columnDefs={userCol}
//                 onRowClicked={onRowClicked}
//                 getRowStyle={getRowStyle}
//                 enablePagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={onPageChange}
//                 pagination={true}
//                 paginationPageSize={paginationPageSize}
//                 cancel=".no-drag .MuiIconButton-root"

//                 // height="100%"
//               />
//             </Box>
//           </Box>
//         </Paper>
//         {hasId ? (
//           <Paper
//             key="customer_segments"
//             elevation={3}
//             onClick={(e) => e.stopPropagation()}
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               overflow: "hidden",
//             }}
//           >
//             <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
//               {selectedCustId && currentMenu === "profiles" && (
//                 <CustomerSegmentCard custId={selectedCustId} />
//               )}
//               {selectedOrderId && currentMenu === "orders" && (
//                 <OrderItems
//                   orderId={selectedOrderId}
//                   setSelectedOrderItem={setSelectedOrderItem}
//                   orderItemSec={orderItemSec}
//                   filters={filters}
//                 />
//               )}
//               {selectedTicket && currentMenu === "support_tickets" && (
//                 <SupportTicketComments ticketId={selectedTicket} />
//               )}
//             </Box>
//           </Paper>
//         ) : (
//           <Typography>No id is found</Typography>
//         )}

//         {selectedOrderItem && hasId && (
//           <Paper
//             key="order_items"
//             elevation={3}
//             sx={{ p: 2, borderRadius: 3, height: "100%" }}
//           >
//             <Touchups
//               orderId={selectedOrderItem.order_id}
//               setSelectedTouchup={setSelectedTouchup}
//             />

//             {selectedTouchup && (
//               <Box sx={{ p: 2, borderRadius: 3, height: "100%" }}>
//                 <TouchupsPens
//                   orderId={selectedOrderItem.order_id}
//                   Colorslug={selectedTouchup?.color_slug}
//                 />
//               </Box>
//             )}
//           </Paper>
//         )}
//       </ResponsiveGridLayout>
//     </Box>
//   );
// };

// export default ResponsiveDashboard;
// "use client";
// import { useState, useEffect } from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
// import AgGridTable from "@/components/ag-grid";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import { Box, Paper, Typography } from "@mui/material";
// import CustomerSegmentCard from "../CustomerSegmentCard";
// import OrderItems from "../OrderItems";
// import SupportTicketComments from "../SupportTicketComments";
// import Touchups from "../Touchups";
// import TouchupsPens from "../TouchupsPens";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setActiveTab,
//   setOrderItemsOpen,
//   setTouchupsOpen,
//   setTouchupPensOpen,
//   resetAllTabs,
// } from "../../../app/redux/tabSlice";
// import { RootState } from "../../../redux/store";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const ResponsiveDashboard = ({
//   rowData,
//   userCol,
//   onRowClicked,
//   selectedCustId,
//   selectedOrderId,
//   selectedTicket,
//   currentPage,
//   totalPages,
//   onPageChange,
//   currentMenu,
//   paginationPageSize,
//   getRowStyle,
//   filters,
// }: any) => {
//   const { isActive } = useSelector((state: RootState) => state.tab);
//   const dispatch = useDispatch();

//   const hasId = selectedCustId || selectedOrderId || selectedTicket;

//   type OrderItem = { order_id: string; [key: string]: any };
//   const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(
//     null
//   );
//   const [selectedTouchup, setSelectedTouchup] = useState<any | null>(null);
//   const [orderItemSec, setOrderItemSec] = useState<boolean>(false);

//   // Keep active tab logic stable
//   useEffect(() => {
//     if (hasId) {
//       dispatch(setActiveTab({ isActive: true, name: currentMenu }));
//     } else {
//       dispatch(setActiveTab({ isActive: false }));
//     }
//   }, [hasId, currentMenu, dispatch]);

//   // Handle order item section toggle
//   useEffect(() => {
//     if (selectedOrderId && currentMenu === "orders") {
//       setOrderItemSec(true);
//     } else {
//       setOrderItemSec(false);
//     }
//   }, [selectedOrderId, currentMenu]);

//   // Do NOT reset state on filters — preserve open tabs
//   // Each child handles its own data update based on filters

//   const layouts = {
//     lg: [
//       {
//         i: "profiles",
//         x: 0,
//         y: 0,
//         w: hasId ? 7 : 12,
//         h: 16,
//         minW: 4,
//         minH: 16,
//         maxH: 50,
//       },
//       {
//         i: "customer_segments",
//         x: hasId ? 7 : 0,
//         y: 0,
//         w: hasId ? 5 : 12,
//         h: 16,
//         minW: 3,
//         minH: 16,
//         maxH: 50,
//       },
//       {
//         i: "order_items",
//         x: 0,
//         y: 16,
//         w: 12,
//         h: 10, // fixed height for visibility
//         minH: 0,
//         maxH: 50,
//       },
//     ],
//     md: [
//       { i: "profiles", x: 0, y: 0, w: hasId ? 6 : 12, h: 16, maxH: 40 },
//       { i: "customer_segments", x: 6, y: 0, w: 6, h: 16, maxH: 40 },
//       { i: "order_items", x: 0, y: 20, w: 12, h: 10, maxH: 50 },
//     ],
//     sm: [
//       { i: "profiles", x: 0, y: 0, w: 12, h: 18, maxH: 40 },
//       { i: "customer_segments", x: 0, y: 18, w: 12, h: 18, maxH: 40 },
//       { i: "order_items", x: 0, y: 36, w: 12, h: 12, maxH: 40 },
//     ],
//   };

//   return (
//     <Box sx={{ width: "100%", minHeight: "100vh" }}>
//       <ResponsiveGridLayout
//         className="layout"
//         layouts={layouts}
//         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//         cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
//         rowHeight={30}
//         draggableHandle=".drag-handle"
//         isDraggable
//         isResizable
//         draggableCancel=".no-drag"
//         resizeHandles={["se", "e", "s"]}
//       >
//         {/* ========== AG GRID SECTION ========== */}
//         <Paper
//           key="profiles"
//           elevation={3}
//           sx={{
//             p: 2,
//             borderRadius: 3,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
//             <AgGridTable
//               rowData={rowData}
//               columnDefs={userCol}
//               onRowClicked={onRowClicked}
//               getRowStyle={getRowStyle}
//               enablePagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={onPageChange}
//               pagination
//               paginationPageSize={paginationPageSize}
//               cancel=".no-drag .MuiIconButton-root"
//             />
//           </Box>
//         </Paper>

//         {/* ========== CUSTOMER SEGMENT / ORDER ITEMS / SUPPORT ========== */}
//         <Paper
//           key="customer_segments"
//           elevation={3}
//           sx={{
//             p: 2,
//             borderRadius: 3,
//             height: "100%",
//             display: hasId ? "flex" : "none",
//             flexDirection: "column",
//             overflow: "hidden",
//           }}
//         >
//           <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
//             {selectedCustId && currentMenu === "profiles" && (
//               <CustomerSegmentCard custId={selectedCustId} filters={filters} />
//             )}
//             {selectedOrderId && currentMenu === "orders" && (
//               <OrderItems
//                 orderId={selectedOrderId}
//                 setSelectedOrderItem={setSelectedOrderItem}
//                 orderItemSec={orderItemSec}
//                 filters={filters}
//               />
//             )}
//             {selectedTicket && currentMenu === "support_tickets" && (
//               <SupportTicketComments
//                 ticketId={selectedTicket}
//                 filters={filters}
//               />
//             )}
//           </Box>
//         </Paper>

//         {/* ========== TOUCHUPS / TOUCHUP PENS ========== */}
//         <Paper
//           key="order_items"
//           elevation={3}
//           sx={{
//             p: 2,
//             borderRadius: 3,
//             height: "100%",
//             display: selectedOrderItem && hasId ? "block" : "none",
//           }}
//         >
//           {selectedOrderItem && (
//             <>
//               <Touchups
//                 orderId={selectedOrderItem.order_id}
//                 setSelectedTouchup={setSelectedTouchup}
//                 filters={filters}
//               />

//               {selectedTouchup && (
//                 <Box sx={{ p: 2, borderRadius: 3, height: "100%" }}>
//                   <TouchupsPens
//                     orderId={selectedOrderItem.order_id}
//                     Colorslug={selectedTouchup?.color_slug}
//                     filters={filters}
//                   />
//                 </Box>
//               )}
//             </>
//           )}
//         </Paper>
//       </ResponsiveGridLayout>
//     </Box>
//   );
// };

// export default ResponsiveDashboard;

"use client";
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import AgGridTable from "@/components/ag-grid";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Box, Paper } from "@mui/material";
import CustomerSegmentCard from "../CustomerSegmentCard";
import OrderItems from "../OrderItems";
import SupportTicketComments from "../SupportTicketComments";
import Touchups from "../Touchups";
import TouchupsPens from "../TouchupsPens";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTab,
  setOrderItemsOpen,
  setTouchupsOpen,
  setTouchupPensOpen,
  resetAllTabs,
} from "../../../app/redux/tabSlice";
import { RootState } from "../../../redux/store";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ResponsiveDashboard = ({
  rowData,
  userCol,
  onRowClicked,
  selectedCustId,
  selectedOrderId,
  selectedTicket,
  currentPage,
  totalPages,
  onPageChange,
  currentMenu,
  paginationPageSize,
  getRowStyle,
  filters,
}: any) => {
  const dispatch = useDispatch();
  const {
    isOrderItemsOpen,
    isTouchupsOpen,
    isTouchupPensOpen,
    isCustomerSegmentsOpen,
  } = useSelector((state: RootState) => state.tab);

  const [selectedOrderItem, setSelectedOrderItem] = useState<any | null>(null);
  const [selectedTouchup, setSelectedTouchup] = useState<any | null>(null);

  const hasId = selectedCustId || selectedOrderId || selectedTicket;

  // ✅ Set active tab when record selected
  useEffect(() => {
    if (hasId) {
      dispatch(setActiveTab({ isActive: true, name: currentMenu }));
    } else {
      dispatch(setActiveTab({ isActive: false }));
      dispatch(resetAllTabs());
    }
  }, [hasId, currentMenu, dispatch]);

  // ✅ Auto-open Order Items when an order is selected
  useEffect(() => {
    if (selectedOrderId && currentMenu === "orders") {
      dispatch(setOrderItemsOpen(true));
    }
  }, [selectedOrderId, currentMenu, dispatch]);

  // ✅ Order Item click → open Touchups section
  const handleSelectOrderItem = (item: any) => {
    setSelectedOrderItem(item);
    dispatch(setTouchupsOpen(true));
  };

  // ✅ Touchup click → open Touchup Pens section
  const handleSelectTouchup = (item: any) => {
    setSelectedTouchup(item);
    dispatch(setTouchupPensOpen(true));
  };

  // const layouts = {
  //   lg: [
  //     {
  //       i: "profiles",
  //       x: 0,
  //       y: 0,
  //       w: hasId ? 7 : 12,
  //       h: 16,
  //       minW: 4,
  //       minH: 16,
  //       maxH: 50,
  //     },
  //     {
  //       i: "customer_segments",
  //       x: hasId ? 7 : 0,
  //       y: 0,
  //       w: hasId ? 5 : 12,
  //       h: 16,
  //       minW: 3,
  //       minH: 16,
  //       maxH: 50,
  //     },
  //     {
  //       i: "order_items",
  //       x: 0,
  //       y: 16,
  //       w: 12,
  //       h: 10,
  //       minH: 0,
  //       maxH: 50,
  //     },
  //   ],
  //   md: [
  //     { i: "profiles", x: 0, y: 0, w: hasId ? 6 : 12, h: 16, maxH: 40 },
  //     { i: "customer_segments", x: 6, y: 0, w: 6, h: 16, maxH: 40 },
  //     { i: "order_items", x: 0, y: 20, w: 12, h: 10, maxH: 50 },
  //   ],
  //   sm: [
  //     { i: "profiles", x: 0, y: 0, w: 12, h: 18, maxH: 40 },
  //     { i: "customer_segments", x: 0, y: 18, w: 12, h: 18, maxH: 40 },
  //     { i: "order_items", x: 0, y: 36, w: 12, h: 12, maxH: 40 },
  //   ],
  // };
  // 🧠 Build layout dynamically
  // 🧠 Build layout dynamically
  const baseLayout: any[] = [];

  // always show main profiles grid
  baseLayout.push({
    i: "profiles",
    x: 0,
    y: 0,
    w: hasId ? 7 : 12,
    h: hasId ? 17 : 20,
    minW: 4,
    minH: 10,
  });

  // only show second section when something is selected
  if (hasId) {
    baseLayout.push({
      i: "customer_segments",
      x: hasId ? 7 : 0,
      y: 0,
      w: hasId ? 5 : 12,
      h: isTouchupsOpen ? 17 : 17, // 👈 reduce height when no subtab open
      minW: 3,
      minH: 4,
    });
  }

  // only show order_items section when Touchups open
  if (isTouchupsOpen) {
    baseLayout.push({
      i: "order_items",
      x: 0,
      y: 16,
      w: 12,
      h: 15,
      minW: 3,
      minH: 8,
    });
  }

  // 👇 only include the "order_items" grid when visible
  if (isTouchupsOpen) {
    baseLayout.push({
      i: "order_items",
      x: 0,
      y: 16,
      w: 12,
      h: 10,
      minW: 3, // ✅ required
      minH: 8, // ✅ required
    });
  }

  const layouts = { lg: baseLayout, md: baseLayout, sm: baseLayout };

  return (
    <Box sx={{ width: "100%", minHeight: "auto" }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
        rowHeight={30}
        draggableHandle=".drag-handle"
        isDraggable
        isResizable
        draggableCancel=".no-drag"
        resizeHandles={["se", "e", "s"]}
      >
        {/* ========== AG GRID SECTION ========== */}
        <Paper
          key="profiles"
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1, minHeight: "100vh", overflow: "auto" }}>
            <AgGridTable
              rowData={rowData}
              columnDefs={userCol}
              onRowClicked={onRowClicked}
              getRowStyle={getRowStyle}
              enablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              pagination
              paginationPageSize={paginationPageSize}
              cancel=".no-drag .MuiIconButton-root"
            />
          </Box>
        </Paper>

        {/* ========== CUSTOMER SEGMENT / ORDER ITEMS / SUPPORT ========== */}
        <Paper
          key="customer_segments"
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            height: "100%",
            display: hasId ? "flex" : "none",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
            {selectedCustId && currentMenu === "profiles" && (
              <CustomerSegmentCard custId={selectedCustId} filters={filters} />
            )}

            {selectedOrderId && currentMenu === "orders" && (
              <OrderItems
                orderId={selectedOrderId}
                setSelectedOrderItem={handleSelectOrderItem}
                orderItemSec={isOrderItemsOpen}
                filters={filters}
              />
            )}

            {selectedTicket && currentMenu === "support_tickets" && (
              <SupportTicketComments
                ticketId={selectedTicket}
                filters={filters}
              />
            )}
          </Box>
        </Paper>

        {/* ========== TOUCHUPS / TOUCHUP PENS ==========
        <Paper
          key="order_items"
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            height: "100%",
            display: isTouchupsOpen ? "block" : "none",
          }}
        >
          {isTouchupsOpen && selectedOrderItem && (
            <>
              <Touchups
                orderId={selectedOrderItem.order_id}
                setSelectedTouchup={handleSelectTouchup}
                // filters={filters}
              />

              {isTouchupPensOpen && selectedTouchup && (
                <Box sx={{ p: 2, borderRadius: 3, height: "100%" }}>
                  <TouchupsPens
                    orderId={selectedOrderItem.order_id}
                    Colorslug={selectedTouchup?.color_slug}
                    // filters={filters}
                  />
                </Box>
              )}
            </>
          )}
        </Paper> */}
        {isTouchupsOpen && hasId && (
          <Paper
            key="order_items"
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              height: "100%",
            }}
          >
            {selectedOrderItem && (
              <>
                <Touchups
                  orderId={selectedOrderItem.order_id}
                  setSelectedTouchup={handleSelectTouchup}
                />

                {isTouchupPensOpen && selectedTouchup && (
                  <Box sx={{ p: 2, borderRadius: 3, height: "100%" }}>
                    <TouchupsPens
                      orderId={selectedOrderItem.order_id}
                      Colorslug={selectedTouchup?.color_slug}
                    />
                  </Box>
                )}
              </>
            )}
          </Paper>
        )}
      </ResponsiveGridLayout>
    </Box>
  );
};

export default ResponsiveDashboard;
