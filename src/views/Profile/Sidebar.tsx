"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface SidebarItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  menuItems: SidebarItem[];
  activeMenu: string;
  setActiveMenu: (key: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  activeMenu,
  setActiveMenu,
  onLogout,
}) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("userEmail");
      setUserName(storedName);
      setUserEmail(storedEmail);
    };

    loadUser();

    // Also re-check after a short delay (helps after fast route changes)
    const timer = setTimeout(loadUser, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        width: 200,
        height: "100vh",
        borderRight: "1px solid #ddd",
        bgcolor: "#131C55",
        transition: "width 0.3s ease",
        overflow: "hidden",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              width: 256,
              height: 64,
              padding: 1.25, // 10px
              backgroundColor: " #0E1B6B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 900,
                fontStyle: "normal",
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: 0,
                color: "#ffff",
              }}
            >
              CXi
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <Box
          key={item.key}
          onClick={() => setActiveMenu(item.key)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: activeMenu === item.key ? "bold" : "normal",
            color: activeMenu === item.key ? "#FFFFFF" : "#8E92AD", // <-- add this line

            borderRadius: "10px",
            justifyContent: "flex-start",
            "&:hover": { color: "#F3F4F6" },
          }}
        >
          {item.icon}
          {item.label}
        </Box>
      ))}

      <Box
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: 60,
        }}
      >
        <Box
          sx={{
            // backgroundColor: "#3f51b5",
            padding: "10px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            maxWidth: 300,
          }}
        >
          <Avatar
            alt="Tim Cook"
            src="https://www.example.com/tim-cook.jpg"
            sx={{
              marginRight: "10px",
              width: 40,
              height: 40,
            }}
          />
          <Box sx={{ color: "#fff" }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: "16px", color: "#fff" }}
            >
              {userName || "Guest User"}
            </Typography>
            <Typography sx={{ fontSize: "10px", color: "#fff", mt: "-9px" }}>
              {userEmail || "No email found"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
