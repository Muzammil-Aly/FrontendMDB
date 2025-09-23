"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      sx={{
        position: "fixed",
        width: isSidebarOpen ? 200 : 70,
        height: "100vh",
        borderRight: "1px solid #ddd",
        bgcolor: "#f9f9f9",
        p: 2,
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
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {isSidebarOpen ? (
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              // background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              borderRadius: "16px",
              // boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: "2.5rem",
                background: "linear-gradient(90deg, black)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.5px",
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "60%",
                  height: "4px",
                  left: "20%",
                  bottom: -8,
                  // background: "linear-gradient(90deg, #004080)",
                  borderRadius: "4px",
                },
              }}
            >
              UCP
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            {"UCP".split("").map((char, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  // p: 3,
                  // background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                  borderRadius: "16px",
                  // boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    background: "linear-gradient(90deg, black)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.5px",
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "60%",
                      height: "4px",
                      left: "20%",
                      bottom: -8,
                      // background: "linear-gradient(90deg, #004080)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {char}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <Box
          key={item.key}
          onClick={() => setActiveMenu(item.key)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isSidebarOpen ? 1.5 : 0,
            p: 1.5,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: activeMenu === item.key ? "bold" : "normal",
            bgcolor: activeMenu === item.key ? "#e0e0e0" : "transparent",
            borderRadius: "10px",
            justifyContent: isSidebarOpen ? "flex-start" : "center",
            "&:hover": { bgcolor: "#F3F4F6" },
            transition: "all 0.2s ease",
          }}
        >
          {item.icon}
          {isSidebarOpen && item.label}
        </Box>
      ))}

      <Box
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 60,
        }}
      >
        <Button
          sx={{
            display: "flex",
            backgroundColor: "#4C4C4C",
            color: "#fff",
            padding: "8px",
            width: 150, // 👈 fixed width so size never jumps
            borderRadius: "10px",
            fontSize: "16px",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.3s ease",
          }}
          startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
          onClick={onLogout}
          variant="outlined"
        >
          {isSidebarOpen ? "Logout" : null}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
