// "use client";
// import { useState } from "react";
// import {
//   Box,
//   Chip,
//   Popover,
//   TextField,
//   CircularProgress,
//   InputAdornment,
// } from "@mui/material";
// import BadgeIcon from "@mui/icons-material/Badge"; // any icon you like

// export default function CustomerIdFilter() {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [customerIdInput, setCustomerIdInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setIsTyping(false);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <Box>
//       {/* Filter Chip with Icon */}
//       <Chip
//         icon={<BadgeIcon />}
//         label="Customer ID"
//         variant="outlined"
//         onClick={handleOpen}
//         sx={{
//           borderRadius: "8px",
//           fontWeight: 500,
//           cursor: "pointer",
//           "& .MuiChip-label": { px: 1 },
//         }}
//       />

//       {/* Popover that opens on click */}
//       <Popover
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//       >
//         <Box sx={{ p: 1, width: 140 }}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Customer ID"
//             placeholder="Customer ID"
//             value={customerIdInput.toUpperCase()}
//             onChange={(e) => {
//               const value = e.target.value;
//               setCustomerIdInput(value);

//               if (value.trim() !== "") {
//                 setIsTyping(true);
//                 setTimeout(() => setIsTyping(false), 1000);
//               } else {
//                 setIsTyping(false);
//               }
//             }}
//             sx={{
//               width: 120, // 👈 makes the popover small, you can adjust
//               "& .MuiInputBase-input": {
//                 fontSize: "14px", // 👈 input text size
//                 // p: "4px 6px", // 👈 compact padding
//               },
//               "& .MuiInputLabel-root": {
//                 fontSize: "14px", // 👈 label size
//               },
//             }}
//             InputProps={{
//               endAdornment:
//                 customerIdInput.trim() !== "" && isTyping ? (
//                   <InputAdornment position="end">
//                     <CircularProgress size={16} />
//                   </InputAdornment>
//                 ) : null,
//             }}
//           />
//         </Box>
//       </Popover>
//     </Box>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Popover,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

interface CustomerIdFilterProps {
  value: string;
  onChange: (val: string) => void;
}

export default function CustomerIdFilter({
  value,
  onChange,
}: CustomerIdFilterProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [localValue, setLocalValue] = useState(value || "");
  const [isTyping, setIsTyping] = useState(false);

  // keep localValue synced if parent resets value
  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsTyping(false);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Chip
        icon={<BadgeIcon />}
        label="Customer ID"
        variant="outlined"
        onClick={handleOpen}
        sx={{
          borderRadius: "8px",
          fontWeight: 500,
          cursor: "pointer",
          "& .MuiChip-label": { px: 1 },
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 1, width: 160 }}>
          <TextField
            fullWidth
            size="small"
            label="Customer ID"
            placeholder="Customer ID"
            value={localValue.toUpperCase()}
            onChange={(e) => {
              const newVal = e.target.value;
              setLocalValue(newVal);

              if (newVal.trim() !== "") {
                setIsTyping(true);
                // debounce can be added here
                setTimeout(() => {
                  setIsTyping(false);
                  onChange(newVal); // 🔹 update parent when typing stops
                }, 800);
              } else {
                setIsTyping(false);
                onChange(""); // 🔹 clear filter
              }
            }}
            InputProps={{
              endAdornment:
                localValue.trim() !== "" && isTyping ? (
                  <InputAdornment position="end">
                    <CircularProgress size={16} />
                  </InputAdornment>
                ) : null,
            }}
          />
        </Box>
      </Popover>
    </Box>
  );
}
