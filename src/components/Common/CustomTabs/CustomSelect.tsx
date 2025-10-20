// "use client";
// import React from "react";
// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// interface CustomSelectProps<T extends string | number> {
//   label: string;
//   value: T;
//   options: T[];
//   onChange: (val: T) => void;
//   width?: number | string;
// }

// function CustomSelect<T extends string | number>({
//   label,
//   value,
//   options,
//   onChange,
//   width = 120,
// }: CustomSelectProps<T>) {
//   return (
//     <FormControl
//       size="small"
//       sx={{
//         width,
//         backgroundColor: "#fff",
//         borderRadius: "12px",
//         "& .MuiOutlinedInput-root": {
//           borderRadius: "12px",
//           height: "36px",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
//           "&:hover": {
//             boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
//           },
//           "&.Mui-focused fieldset": {
//             borderColor: "#1976d2",
//             borderWidth: "2px",
//           },
//         },
//       }}
//     >
//       <InputLabel>{label}</InputLabel>
//       <Select
//         value={value}
//         label={label}
//         onChange={(e) => onChange(e.target.value as T)} // ✅ generic-safe
//       >
//         {options.map((opt) => (
//           <MenuItem key={opt} value={opt}>
//             {opt}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

// export default CustomSelect;
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
  width = 80,
}: CustomSelectProps<T>) {
  return (
    <FormControl
      size="small"
      sx={{
        width,
        backgroundColor: "#fff",
        borderRadius: "10px",
        "& .MuiOutlinedInput-root": {
          height: 36,
          fontSize: "15px",
          borderRadius: "10px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0E1B6B",
            borderWidth: "1.5px",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "13px",
          color: "#666",
        },
        "& .MuiInputLabel-shrink": {
          fontSize: "14px",
          color: "#0E1B6B",
        },
        "& .MuiSelect-select": {
          padding: "6px 10px",
        },
        "& .MuiMenuItem-root": {
          fontSize: "13px",
          color: "#1C1C1E",
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as T)}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            },
          },
        }}
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
