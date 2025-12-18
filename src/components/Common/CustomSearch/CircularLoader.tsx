"use client";
import React from "react";
import { Box } from "@mui/material";

interface CircularLoaderProps {
  size?: number;
  color?: string;
  thickness?: number;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 16,
  color = "#0E1B6B",
  thickness = 2,
}) => {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        width: size,
        height: size,
        border: `${thickness}px solid rgba(0,0,0,0.1)`,
        borderTop: `${thickness}px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.6s linear infinite",
        "@keyframes spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }}
    />
  );
};

export default CircularLoader;
