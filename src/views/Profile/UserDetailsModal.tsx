"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Stack } from "@mui/material";

import OrderHistory from "./TabsContent/OrderHistory";
import CustomerSegmentCard from "./CustomerSegmentCard";
import SupportTickets from "./SupportTickets";
import MarketingEvents from "./MarketingEvents";

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: 2,
  p: 2.5,
  width: "95%",
  maxWidth: 1080,
  maxHeight: "90vh",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  open,
  onClose,
  userData,
}) => {
  const [activeMenu, setActiveMenu] = useState("Customer Segments");

  const menuItems = [
    "Customer Segments",
    "Orders",
    "Support Tickets",
    "Marketing Events",
  ];

  useEffect(() => {
    if (open) setActiveMenu("Customer Segments");
  }, [open]);

  if (!userData) return null;

  const userDetails = [
    { label: "Customer ID", value: userData.customer_id },
    { label: "Email", value: userData.email },
    { label: "Phone", value: userData.phone },
    { label: "Full Name", value: userData.full_name },
    { label: "Source", value: userData.source },
    { label: "Join Type", value: userData.join_type },
    { label: "Key", value: userData.key },
  ];

  const menuConfig: Record<string, { component: React.ReactNode }> = {
    "Customer Segments": {
      component: <CustomerSegmentCard custId={userData.customer_id} />,
    },
    Orders: {
      component: <OrderHistory customerId={userData.customer_id} />,
    },
    "Support Tickets": {
      component: <SupportTickets customerId={userData.customer_id} />,
    },
    "Marketing Events": {
      component: <MarketingEvents customerId={userData.customer_id} />,
    },
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-details-title">
      <Box sx={style}>
        {/* Header */}
        <Stack mb={3}>
          <Typography fontWeight={700} fontSize={18} mb={1}>
            Profile Information
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            }}
            gap={1.5}
          >
            {userDetails.map(({ label, value }) => (
              <Stack
                key={label}
                direction="row"
                justifyContent="space-between"
                borderBottom="1px solid #E0E0E0"
                pb={0.5}
              >
                <Typography fontWeight={600} fontSize={15}>
                  {label}:
                </Typography>
                <Typography fontWeight={400} fontSize={15} color="#666D80">
                  {value || "N/A"}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>

        {/* User Name */}
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Stack>
            <Typography
              id="user-details-title"
              variant="subtitle1"
              fontWeight={700}
            >
              {userData.name}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              color="#666D80"
              fontSize={12}
            >
              Last Activity: {userData.least_active}
            </Typography>
          </Stack>
        </Stack>

        {/* Sidebar + Content */}
        <Stack direction="row" spacing={2} height="calc(70vh - 200px)">
          {/* Sidebar */}
          <Box
            sx={{
              minWidth: "180px",
              borderRight: "1px solid #E0E0E0",
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            {menuItems.map((item) => {
              // if (item === "Orders" && userData.source !== "Wismo") return null;

              const isActive = activeMenu === item;
              return (
                <Typography
                  key={item}
                  variant="body2"
                  onClick={() => setActiveMenu(item)}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    cursor: "pointer",
                    fontWeight: isActive ? 600 : 400,
                    bgcolor: isActive ? "#e0e0e0" : "transparent",
                    "&:hover": { bgcolor: "#F3F4F6" },
                    fontSize: 15,
                  }}
                >
                  {item}
                </Typography>
              );
            })}
          </Box>

          {/* Content */}
          <Box
            flex={1}
            borderRadius={1.5}
            p={1.5}
            bgcolor="#FAFAFA"
            overflow="auto"
          >
            {menuConfig[activeMenu]?.component}
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UserDetailsModal;
