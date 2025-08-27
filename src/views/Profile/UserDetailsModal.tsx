
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
  p: "24px 48px",
  maxWidth: 1060,
  width: "100%",
  maxHeight: "85vh",
  overflowY: "auto",
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
    // "Detailed Information",
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

  const menuConfig: Record<
    string,
    { component: React.ReactNode }
  > = {
    "Customer Segments": {
      component: <CustomerSegmentCard custId={userData.customer_id} />,
    },
    Orders: {
     
      component:  <OrderHistory customerId={userData.customer_id} />,

    },
    "Support Tickets": {
      component:      <SupportTickets customerId={userData.customer_id} />,
    },
    "Marketing Events": {
      component: <MarketingEvents customerId={userData.customer_id} />  ,
    },
    // "Detailed Information": {
    //   component: (
    //     <Box>
    //       {userDetails.map(({ label, value }) => (
    //         <Stack
    //           key={label}
    //           direction="row"
    //           justifyContent="space-between"
    //           borderBottom="1px solid rgba(193, 199, 208, 0.3)"
    //           pb={1}
    //         >
    //           <Typography fontWeight={600}>{label}:</Typography>
    //           <Typography fontWeight={400} color="#666D80">
    //             {value || "N/A"}
    //           </Typography>
    //         </Stack>
    //       ))}
    //     </Box>
    //   ),
    // },
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-details-title">
      <Box sx={style}>
        <Box mb={4}>
          <Typography fontWeight={700} mb={2.8} fontSize={20}>
            Profile Information
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            gap={2}
          >
            {userDetails.map(({ label, value }) => (
              <Stack
                key={label}
                direction="row"
                justifyContent="space-between"
                borderBottom="1px solid rgba(193, 199, 208, 0.3)"
                pb={1}
              >
                <Typography fontWeight={600}>{label}:</Typography>
                <Typography fontWeight={400} color="#666D80">
                  {value || "N/A"}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Stack>
            <Typography
              id="user-details-title"
              variant="h6"
              fontWeight={700}
              sx={{ textTransform: "capitalize", marginBottom: "4px" }}
            >
              {userData.name}
            </Typography>
            <Typography
              id="user-details-activity"
              variant="body2"
              fontWeight={400}
              color="#666D80"
              fontSize={14}
            >
              Last Activity on {userData.least_active}
            </Typography>
          </Stack>
        </Stack>

        {/* Sidebar Menu */}
        <Stack direction="row" spacing={2}>
          <Stack
            sx={{
              minWidth: "200px",
              borderRight: "1px solid #ddd",
            }}
          >
            {/* {menuItems.map((item) => (
              
              <Typography
                key={item}
                component="h2"
                variant="subtitle2"
                onClick={() => setActiveMenu(item)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  fontWeight: activeMenu === item ? "bold" : "normal",
                  bgcolor: activeMenu === item ? "#e0e0e0" : "transparent",
                  borderRadius: "10px",
                }}
              >
                {item}
              </Typography>
            ))} */}
            {menuItems.map((item) => {
  // Skip the Orders tab if the user is not from Wismo
  if (item === "Orders" && userData.source !== "Wismo") {
    return null;
  }

  return (
    <Typography
      key={item}
      component="h2"
      variant="subtitle2"
      onClick={() => setActiveMenu(item)}
      sx={{
        p: 2,
        cursor: "pointer",
        fontWeight: activeMenu === item ? "bold" : "normal",
        bgcolor: activeMenu === item ? "#e0e0e0" : "transparent",
        borderRadius: "10px",
      }}
    >
      {item}
    </Typography>
  );
})}

          </Stack>

          <Box
            flex={1}
            border={"1px solid #C1C7D0"}
            p={2}
            borderRadius={2}
            overflow={"hidden"}
          >
            {menuConfig[activeMenu]?.component}
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UserDetailsModal;
