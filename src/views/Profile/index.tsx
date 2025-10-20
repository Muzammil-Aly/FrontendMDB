"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EventIcon from "@mui/icons-material/Event";
import InventoryIcon from "@mui/icons-material/Inventory";
import Sidebar from "./Sidebar";
import Orders from "./Orders";
import SupportTickets from "./SupportTickets";
import MarketingEvents from "./MarketingEvents";
import DetailedInfo from "./TabsContent/profile-Information/ProfileInfo";
import Inventory from "./Inventory";
import { useRouter } from "next/navigation";
import CustomerProfile from "./TabsContent/customer-profile/CustomerProfile";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Typography,
  IconButton,
  Breadcrumbs,
  Link as MUILink,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Profile = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("Profile Information");

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/sign-in");
  };

  const menuItems = [
    {
      key: "Profile Information",
      label: "Profile Information",
      icon: <InfoIcon />,
    },
    {
      key: "Customer Profiles",
      label: "Customer Profiles",
      icon: <PeopleIcon />,
    },
    { key: "Orders", label: "Orders", icon: <ShoppingCartIcon /> },
    {
      key: "Support Tickets",
      label: "Support Tickets",
      icon: <SupportAgentIcon />,
    },
    { key: "Marketing Events", label: "Marketing Events", icon: <EventIcon /> },
    { key: "Inventory", label: "Inventory", icon: <InventoryIcon /> },
  ];

  const menuConfig: Record<string, { component?: React.ReactNode }> = {
    "Profile Information": { component: <DetailedInfo /> },
    "Customer Profiles": { component: <CustomerProfile /> },
    Orders: { component: <Orders /> },
    "Support Tickets": { component: <SupportTickets /> },
    "Marketing Events": { component: <MarketingEvents /> },
    Inventory: { component: <Inventory /> },
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/* Sidebar (fixed) */}
      <Box sx={{ width: 130, flexShrink: 0 }}>
        <Sidebar
          menuItems={menuItems}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          onLogout={handleLogout}
        />
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: 3,
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          // gap: 2,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            borderBottom: "1px solid #E0E0E0",
            bgcolor: "#fff",
            // pb: 1,
            pl: { xs: 0, sm: "90px" },
            minHeight: "70px",
          }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ color: "#555" }}
          >
            <MUILink
              underline="hover"
              color="inherit"
              sx={{ fontSize: 14, cursor: "pointer" }}
            >
              Dashboard
            </MUILink>
            <Typography
              sx={{ fontSize: 16, fontWeight: 600, color: "#4658AC" }}
            >
              {activeMenu}
            </Typography>
          </Breadcrumbs>

          {/* Notification Icon */}
          <IconButton
            sx={{
              color: "#131C55",
              bgcolor: "#F4F6FB",
              "&:hover": { bgcolor: "#E0E4F4" },
              marginRight: "10px",
            }}
          >
            <NotificationsNoneIcon />
          </IconButton>
        </Box>

        {/* Dynamic Page Content */}
        <Box sx={{ flexGrow: 1 }}>
          {menuConfig[activeMenu]?.component || (
            <Box sx={{ p: 2 }}>Select a menu item</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
