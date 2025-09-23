"use client";
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface CustomSelectProps<T extends string | number> {
  label: string;
  value: T;
  options: T[];
  onChange: (val: T) => void;
  width?: number | string;
}

function CustomSelect<T extends string | number>({
  label,
  value,
  options,
  onChange,
  width = 120,
}: CustomSelectProps<T>) {
  return (
    <FormControl
      size="small"
      sx={{
        width,
        backgroundColor: "#fff",
        borderRadius: "12px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          "&:hover": {
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
            borderWidth: "2px",
          },
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as T)} // ✅ generic-safe
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
