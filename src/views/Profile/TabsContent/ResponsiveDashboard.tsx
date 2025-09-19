"use client";
import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import AgGridTable from "@/components/ag-grid";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Box, Paper, Typography } from "@mui/material";
import CustomerSegmentCard from "../CustomerSegmentCard";
import OrderItems from "../OrderItems";
import SupportTicketComments from "../SupportTicketComments";
import Touchups from "../Touchups";
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
}: any) => {
  // const layouts = {
  //   lg: [
  //     {
  //       i: "profiles",
  //       x: 0,
  //       y: 0,
  //       w: selectedCustId || selectedOrderId || selectedTicket ? 7 : 12,
  //       h: 16,
  //       minW: 4,
  //       minH: 16,
  //       maxH: 50,
  //     },
  //     {
  //       i: "customer_segments",
  //       x: 8,
  //       y: 0,
  //       w: 5,
  //       h: 16,
  //       minW: 3,
  //       minH: 16,
  //       maxH: 50,
  //       isDraggable: !!(selectedCustId || selectedOrderId || selectedTicket),
  //       static: !(selectedCustId || selectedOrderId || selectedTicket),
  //     },
  //   ],
  //   md: [
  //     {
  //       i: "profiles",
  //       x: 0,
  //       y: 0,
  //       w: selectedCustId || selectedOrderId || selectedTicket ? 6 : 12,
  //       h: 16,
  //       maxH: 40,
  //     },
  //     {
  //       i: "customer_segments",
  //       x: 6,
  //       y: 0,
  //       w: 6,
  //       h: 16,
  //       maxH: 40,
  //       isDraggable: !!(selectedCustId || selectedOrderId || selectedTicket),
  //       static: !(selectedCustId || selectedOrderId || selectedTicket),
  //     },
  //   ],
  //   sm: [
  //     {
  //       i: "profiles",
  //       x: 0,
  //       y: 0,
  //       w: 12,
  //       h: 18,
  //       maxH: 40,
  //     },
  //     {
  //       i: "customer_segments",
  //       x: 0,
  //       y: 12,
  //       w: 12,
  //       h: 18,
  //       maxH: 40,
  //       isDraggable: !!(selectedCustId || selectedOrderId || selectedTicket),
  //       static: !(selectedCustId || selectedOrderId || selectedTicket),
  //     },
  //   ],
  // };
// layouts

  const hasId = selectedCustId || selectedOrderId || selectedTicket;
  type OrderItem = { order_id: string; [key: string]: any };
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(null);
  const [selectedTouchup, setSelectedTouchup] = useState<any | null>(null);

const layouts = {
  lg: [
    { i: "profiles", x: 0, y: 0, w: hasId ? 7 : 12, h: 16, minW: 4, minH: 16, maxH: 50 },
    { i: "customer_segments", x: hasId ? 7 : 0, y: 0, w: hasId ? 5 : 12, h: 16, minW: 3, minH: 16, maxH: 50 },
    { i: "order_items", x: 0, y: 16, w: 12, h: selectedOrderItem ? 7 : 0, minH: 0, maxH: 40 },
  ],
  md: [
    { i: "profiles", x: 0, y: 0, w: 6, h: 16, maxH: 40 },
    { i: "customer_segments", x: 6, y: 0, w: 6, h: 16, maxH: 40 },
    { i: "order_items", x: 0, y: 16, w: 12, h: selectedOrderItem ? 12 : 0, maxH: 40 },
  ],
  sm: [
    { i: "profiles", x: 0, y: 0, w: 12, h: 18, maxH: 40 },
    { i: "customer_segments", x: 0, y: 18, w: 12, h: 18, maxH: 40 },
    { i: "order_items", x: 0, y: 36, w: 12, h: selectedOrderItem ? 12 : 0, maxH: 40 },
  ],
};

console.log("Selected order id is ",selectedOrderItem);
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", pl: "50px" }}>
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
        <Paper
          key="profiles"
          elevation={3}
          onClick={(e) => {
            e.stopPropagation();
          }}
          sx={{
            p: 2,
            borderRadius: 3,
            // height: "100%",
            display: "flex",
            flexDirection: "column",
            // overflow: "hidden",
          }}
        >
          <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
            <Box
            //  sx={ { minWidth: 1000 }}
            >
              <AgGridTable
                rowData={rowData}
                columnDefs={userCol}
                onRowClicked={onRowClicked}
                getRowStyle={getRowStyle}
                enablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                pagination={true}
                paginationPageSize={paginationPageSize}
                cancel=".no-drag .MuiIconButton-root"

                // height="100%"
              />
            </Box>
          </Box>
        </Paper>
{hasId ? (
  <Paper
    key="customer_segments"
    elevation={3}
    onClick={(e) => e.stopPropagation()}
    sx={{
      p: 2,
      borderRadius: 3,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
      {selectedCustId && currentMenu === "profiles" && (
        <CustomerSegmentCard custId={selectedCustId} />
      )}
      {selectedOrderId && currentMenu === "orders" && (
        <OrderItems
          orderId={selectedOrderId}
          setSelectedOrderItem={setSelectedOrderItem}
        />
      )}
      {selectedTicket && currentMenu === "support_tickets" && (
        <SupportTicketComments ticketId={selectedTicket} />
      )}
    </Box>
  </Paper>
) : (
  <Typography>No id is found</Typography>
)}


{selectedOrderItem && hasId && (
  <Paper
    key="order_items"
    
    elevation={3}
    sx={{ p: 2, borderRadius: 3, height: "100%" }}
  >
    
    <Touchups
      orderId={selectedOrderItem.order_id}
      setSelectedTouchup={setSelectedTouchup}
    />
  </Paper>
)}





      </ResponsiveGridLayout>
     
    </Box>
    
  );
};

export default ResponsiveDashboard;
