// "use client";
// import React, { useState } from "react";
// import { Box, InputAdornment, TextField, Typography } from "@mui/material";
// import { TextFieldProps } from "@mui/material";
// import { ChangeEvent, MouseEventHandler, ReactNode } from "react";

// type CustomTextFieldProps = TextFieldProps & {
//   helperText?: any;
//   placeholder?: string;
//   startIcon?: ReactNode;
//   endIcon?: ReactNode;
//   onStartIconClick?: MouseEventHandler<HTMLSpanElement>;
//   onEndIconClick?: MouseEventHandler<HTMLSpanElement>;
//   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
//   width?: string | number;
//   height?: string;
//   background?: string;
//   fixedEndText?: string;
//   min?: string | number;
//   type?: string;
//   acceptedFileFormats?: string;
//   readOnly?: boolean;
//   setSearchQuery?: (val: string) => void;
// };

// const CustomSearchField: React.FC<CustomTextFieldProps> = ({
//   label,
//   variant = "outlined",
//   helperText = "",
//   required = false,
//   placeholder = "Search... ",
//   startIcon = null,
//   endIcon = null,
//   onStartIconClick,
//   onEndIconClick,
//   width = "230px",
//   setSearchQuery,
//   height,
//   ...rest
// }) => {
//   const [, setError] = useState(false);
//   const [, setHelperText] = useState<string | undefined>("");

//   const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     if (required && !value) {
//       setError(true);
//       setHelperText("This field is required");
//     } else {
//       setError(false);
//       setHelperText(undefined);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery?.(e.target.value);
//     rest.onChange?.(e);
//   };

//   return (
//     <Box>
//       {label && (
//         <Typography
//           variant="subtitle2"
//           sx={{ marginBottom: "6px", fontWeight: 600, color: "#344054" }}
//         >
//           {label}
//         </Typography>
//       )}
//       <TextField
//         variant={variant}
//         required={required}
//         helperText={helperText}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         InputProps={{
//           startAdornment: startIcon ? (
//             <InputAdornment position="start">
//               <span
//                 onClick={onStartIconClick}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 {startIcon}
//               </span>
//             </InputAdornment>
//           ) : null,
//           endAdornment: endIcon ? (
//             <InputAdornment position="end">
//               <span
//                 onClick={onEndIconClick}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 {endIcon}
//               </span>
//             </InputAdornment>
//           ) : null,
//         }}
//         inputProps={{
//           sx: {
//             "&::placeholder": {
//               fontSize: "14px",
//               fontWeight: 400,
//               color: "#98A2B3",
//             },
//           },
//         }}
//         sx={{
//           borderRadius: "12px",
//           width,
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//             backgroundColor: "#fff",
//             fontSize: "14px",
//             fontWeight: 400,
//             color: "#344054",
//             fontFamily: "Mulish, sans-serif",
//             padding: "0 12px",
//             height: height || "44px",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
//             transition: "all 0.2s ease-in-out",
//             "& fieldset": {
//               borderColor: "#D0D5DD",
//             },
//             "&:hover": {
//               boxShadow: "0 3px 6px rgba(0,0,0,0.12)",
//             },
//             "&:hover fieldset": {
//               borderColor: "rgba(0, 193, 212, 0.7)",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "rgba(0, 193, 212, 1)",
//               borderWidth: "2px",
//             },
//           },
//         }}
//         placeholder={placeholder}
//         {...rest}
//       />
//     </Box>
//   );
// };

// export default CustomSearchField;

"use client";
import React, {
  useState,
  ChangeEvent,
  MouseEventHandler,
  ReactNode,
} from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // MUI search icon
import { TextFieldProps } from "@mui/material";

type CustomTextFieldProps = TextFieldProps & {
  helperText?: any;
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onStartIconClick?: MouseEventHandler<HTMLSpanElement>;
  onEndIconClick?: MouseEventHandler<HTMLSpanElement>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  width?: string | number;
  height?: string;
  background?: string;
  fixedEndText?: string;
  min?: string | number;
  type?: string;
  acceptedFileFormats?: string;
  readOnly?: boolean;
  setSearchQuery?: (val: string) => void;
};

const CustomSearchField: React.FC<CustomTextFieldProps> = ({
  label,
  variant = "outlined",
  helperText = "",
  required = false,
  placeholder = "Search...",
  startIcon = null,
  onStartIconClick,
  onEndIconClick,
  width = "250px",
  height,
  setSearchQuery,
  background = "#fff",
  ...rest
}) => {
  const [, setError] = useState(false);
  const [, setHelperText] = useState<string | undefined>("");

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (required && !value) {
      setError(true);
      setHelperText("This field is required");
    } else {
      setError(false);
      setHelperText(undefined);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery?.(e.target.value);
    rest.onChange?.(e);
  };

  return (
    <Box>
      {label && (
        <Typography
          variant="subtitle2"
          sx={{ mb: 1, fontWeight: 600, color: "#344054", fontSize: "14px" }}
        >
          {label}
        </Typography>
      )}
      <TextField
        variant={variant}
        required={required}
        helperText={helperText}
        onChange={handleChange}
        onBlur={handleBlur}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">
              <span
                onClick={onStartIconClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {startIcon}
              </span>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <span
                onClick={onEndIconClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  color: "#3B82F6",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <SearchIcon />
              </span>
            </InputAdornment>
          ),
        }}
        inputProps={{
          sx: {
            "&::placeholder": {
              fontSize: "13px",
              fontWeight: 400,
              color: "#A1A1AA",
            },
          },
        }}
        sx={{
          width,
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            backgroundColor: background,
            fontSize: "14px",
            fontWeight: 400,
            color: "#111827",
            fontFamily: "Mulish, sans-serif",
            height: height || "44px",
            transition: "all 0.25s ease-in-out",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            "& fieldset": {
              borderColor: "#E5E7EB",
              transition: "all 0.25s ease-in-out",
            },
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
              "& fieldset": { borderColor: "#3B82F6" },
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              "& fieldset": { borderColor: "#3B82F6", borderWidth: "2px" },
            },
          },
        }}
        placeholder={placeholder}
        {...rest}
      />
    </Box>
  );
};

export default CustomSearchField;
