"use client";
import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DebouncedFunc } from "lodash";
import Loader from "../Loader";
import CircularLoader from "./CircularLoader";
interface DropdownSearchInputProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<string | undefined>>;
  debouncedFunction: DebouncedFunc<(value: string) => void>;
  suggestions: string[];
  width?: number;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const DropdownSearchInput: React.FC<DropdownSearchInputProps> = ({
  label,
  value,
  setValue,
  setFilter,
  debouncedFunction,
  suggestions,
  width = 180,
  loading = false,
  setLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // const handleSelect = (selected: string | null) => {
  //   const chosen = selected || "";
  //   setValue(chosen);
  //   setFilter(chosen || undefined);

  //   if (chosen) {
  //     setIsTyping(true);
  //     setLoading?.(true);
  //     debouncedFunction(chosen);
  //   } else {
  //     setIsTyping(false);
  //     setLoading?.(false);
  //   }
  // };

  const handleSelect = (selected: string | null) => {
    const chosen = selected || "";
    setValue(chosen);
    setFilter(chosen || undefined); // Filter applied immediately on selection
  };

  const handleClear = () => {
    setValue("");
    setFilter(undefined);
    debouncedFunction.cancel();
    setIsTyping(false);
    setLoading?.(false);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const match = suggestions.find(
        (s) => s.toLowerCase() === value.toLowerCase()
      );
      handleSelect(match || value);
      inputRef.current?.blur();
    }
  };

  return (
    <Box sx={{ width }}>
      <Autocomplete
        freeSolo
        disableClearable
        options={suggestions}
        value={value}
        onChange={(_, newValue) => handleSelect(newValue)}
        // onInputChange={(_, newValue, reason) => {
        //   if (reason === "input") {
        //     setValue(newValue);
        //     if (newValue.trim() !== "") {
        //       setIsTyping(true);
        //       debouncedFunction(newValue);
        //     } else {
        //       setIsTyping(false);
        //       setFilter(undefined);
        //       debouncedFunction.cancel();
        //     }
        //   } else if (reason === "clear") {
        //     handleClear();
        //   }
        // }}
        onInputChange={(_, newValue, reason) => {
          if (reason === "input") {
            setValue(newValue); // Only update input value, no API call
          } else if (reason === "clear") {
            setValue("");
            setFilter(undefined); // Clear filter
          }
        }}
        ListboxProps={{
          sx: {
            "& .MuiAutocomplete-option": {
              fontSize: "13px", // smaller text
              padding: "4px 8px", // less padding
              minHeight: "28px", // smaller option height
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={inputRef}
            label={label}
            size="small"
            onKeyDown={handleKeyDown}
            sx={{
              background: "linear-gradient(135deg, #EDEDF0, #F5F5F8)",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#fff",
                fontSize: "15px",
                color: "#1C1C1E",
                height: 36,
                "& fieldset": { border: "1px solid #E0E0E0" },
                "&:hover fieldset": { borderColor: "#C9C9D1" },
                "&.Mui-focused fieldset": {
                  borderColor: "#0E1B6B",
                  boxShadow: "0 0 0 2px rgba(14, 27, 107, 0.15)",
                },
                transition: "all 0.3s ease",
              },
              "& .MuiInputLabel-root": {
                fontSize: "13px",
                color: "#7A7A7A",
                top: "50%",
                transform: "translate(14px, -50%) scale(1)",
                transition: "all 0.25s ease",
                background: "#fff",
                padding: "0 4px",
                pointerEvents: "none",
              },
              "& .MuiInputLabel-shrink": {
                color: "#0E1B6B",
                fontWeight: 500,
                transform: "translate(14px, -6px) scale(0.85)",
                top: "0",
              },
              "& .MuiInputBase-input": {
                padding: "10px 10px 8px 10px",
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  {value.trim() !== "" ? (
                    showLoader ? (
                      <CircularLoader size={16} color="#0E1B6B" />
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
        )}
      />
    </Box>
  );
};

export default DropdownSearchInput;
