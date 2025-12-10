// import React, { Dispatch, SetStateAction } from "react";
// import {
//   FormControl,
//   TextField,
//   InputAdornment,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import ClearIcon from "@mui/icons-material/Clear";
// import { DebouncedFunc } from "lodash";

// interface SearchInputProps {
//   label: string;
//   value: string;
//   setValue: Dispatch<SetStateAction<string>>;
//   setFilter: Dispatch<SetStateAction<any | undefined>>;
//   debouncedFunction: DebouncedFunc<(value: string) => void>;

//   placeholder?: string;
//   width?: number;
//   loading?: boolean;
// }

// const SearchInput: React.FC<SearchInputProps> = ({
//   label,
//   value,
//   setValue,
//   setFilter,
//   debouncedFunction,
//   placeholder,
//   width = 140,
//   loading = true,
// }) => {
//   const [isTyping, setIsTyping] = React.useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     setValue(val);

//     if (val.trim() === "") {
//       setFilter(undefined);
//       debouncedFunction.cancel();
//     } else {
//       debouncedFunction(val);
//       setIsTyping(true);
//     }
//   };

//   const handleClear = () => {
//     setValue("");
//     setFilter(undefined);
//     debouncedFunction.cancel();
//     setIsTyping(false);
//   };

//   return (
//     <FormControl size="small" sx={{ width }}>
//       <TextField
//         label={label}
//         variant="outlined"
//         value={value}
//         onChange={handleChange}
//         size="small"
//         placeholder={placeholder || label}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//             boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
//             transition: "0.2s",
//             "&:hover": {
//               boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
//             },
//           },
//         }}
//         InputProps={{
//           endAdornment:
//             value.trim() !== "" ? (
//               <InputAdornment position="end">
//                 {loading ? (
//                   <CircularProgress size={18} />
//                 ) : (
//                   <IconButton
//                     size="small"
//                     sx={{
//                       color: "#888",
//                       "&:hover": {
//                         color: "#d32f2f",
//                         bgcolor: "transparent",
//                       },
//                     }}
//                     onClick={handleClear}
//                   >
//                     <ClearIcon fontSize="small" />
//                   </IconButton>
//                 )}
//               </InputAdornment>
//             ) : null,
//         }}
//       />
//     </FormControl>
//   );
// };

// export default SearchInput;

import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DebouncedFunc } from "lodash";

interface SearchInputProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<any | undefined>>;
  debouncedFunction: DebouncedFunc<(value: string) => void>;
  width?: number;
  loading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  value,
  setValue,
  setFilter,
  debouncedFunction,
  width = 180,
  loading = false,
}) => {
  const [isTyping, setIsTyping] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    if (val.trim() === "") {
      setFilter(undefined);
      debouncedFunction.cancel();
      setIsTyping(false);
    } else {
      setIsTyping(true);
      debouncedFunction(val);
    }
  };

  const handleClear = () => {
    setValue("");
    setFilter(undefined);
    debouncedFunction.cancel();
    setIsTyping(false);
  };

  // Reset typing state when loading becomes false (debounce completed)
  useEffect(() => {
    if (!loading && isTyping) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, isTyping]);

  // Show loader when typing/debouncing OR when loading prop is true
  const showLoader = isTyping || loading;

  return (
    <FormControl size="small" sx={{ width, position: "relative" }}>
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          background: "linear-gradient(135deg, #EDEDF0, #F5F5F8)",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#fff",
            fontSize: "15px",
            color: "#1C1C1E",
            height: 36,
            "& fieldset": {
              border: "1px solid #E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: "#C9C9D1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0E1B6B",
              boxShadow: "0 0 0 2px rgba(14, 27, 107, 0.15)",
            },
            transition: "all 0.3s ease",
          },
          "& .MuiInputLabel-root": {
            fontSize: "13px",
            color: "#7A7A7A",
            top: "50%", // ✅ center vertically
            transform: "translate(14px, -50%) scale(1)", // ✅ perfectly centered baseline
            transition: "all 0.25s ease",
            background: "#fff",
            padding: "0 4px",
            pointerEvents: "none", // prevent overlap issues
          },
          "& .MuiInputLabel-shrink": {
            color: "#0E1B6B",
            fontWeight: 500,
            transform: "translate(14px, -6px) scale(0.85)",
            top: "0", // ensures label moves smoothly up
          },
          "& .MuiInputBase-input": {
            padding: "10px 10px 8px 10px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value.trim() !== "" ? (
                showLoader ? (
                  <CircularProgress size={16} sx={{ color: "#0E1B6B" }} />
                ) : (
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    sx={{
                      color: "#666",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        color: "#fff",
                        bgcolor: "#0E1B6B",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )
              ) : null}
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default SearchInput;
