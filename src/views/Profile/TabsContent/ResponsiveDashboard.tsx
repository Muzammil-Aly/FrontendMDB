"use client";
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import AgGridTable from "@/components/ag-grid";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Box, Paper, Typography } from "@mui/material";
import CustomerSegmentCard from "../CustomerSegmentCard";
import OrderItems from "../OrderItems";
import SupportTicketComments from "../SupportTicketComments";

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
  const layouts = {
    lg: [
      {
        i: "profiles",
        x: 0,
        y: 0,
        w: selectedCustId || selectedOrderId || selectedTicket ? 8 : 12,
        h: 28,
        minW: 4,
        minH: 16,
        maxH: 50,
      },
      {
        i: "customer_segments",
        x: 8,
        y: 0,
        w: 4,
        h: 16,
        minW: 3,
        minH: 16,
        maxH: 50,
        isDraggable: !!(selectedCustId || selectedOrderId || selectedTicket),
        static: !(selectedCustId || selectedOrderId || selectedTicket),
      },
    ],
    md: [
      {
        i: "profiles",
        x: 0,
        y: 0,
        w: selectedCustId || selectedOrderId || selectedTicket ? 6 : 12,
        h: 16,
        maxH: 40,
      },
      {
        i: "customer_segments",
        x: 6,
        y: 0,
        w: 6,
        h: 16,
        maxH: 40,
        isDraggable: !!(selectedCustId || selectedOrderId || selectedTicket),
        static: !(selectedCustId || selectedOrderId || selectedTicket),
      },
    ],
    sm: [
      {
        i: "profiles",
        x: 0,
        y: 0,
        w: 12,
        h: 18,
        maxH: 40,
      },
      {
        i: "customer_segments",
        x: 0,
        y: 12,
        w: 12,
        h: 18,
        maxH: 40,
        isDraggable: !!(selectedCustId || selectedOrderId || selectedTicket),
        static: !(selectedCustId || selectedOrderId || selectedTicket),
      },
    ],
  };

  const hasId = selectedCustId || selectedOrderId || selectedTicket;

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
        rowHeight={30}
        draggableHandle=".drag-handle"
        isDraggable
        isResizable
        resizeHandles={["se", "e", "s"]}
      >
        <Paper
          key="profiles"
          elevation={3}
          onClick={(e) => e.stopPropagation()}
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
                // height="100%"
              />
            </Box>
          </Box>
        </Paper>

        {hasId ? (
          <Paper
            key="customer_segments"
            elevation={3}
            className="drag-handle"
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
                <OrderItems orderId={selectedOrderId} />
              )}
              {selectedTicket && currentMenu === "support_tickets" && (
                <SupportTicketComments ticketId={selectedTicket} />
              )}
            </Box>
          </Paper>
        ) : (
          <Typography>No id is found</Typography>
        )}
      </ResponsiveGridLayout>
    </Box>
  );
};

export default ResponsiveDashboard;
