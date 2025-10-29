"use client";
import React, { Dispatch, SetStateAction, useRef } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DebouncedFunc } from "lodash";

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
  const handleSelect = (selected: string | null) => {
    const chosen = selected || "";
    setValue(chosen);
    setFilter(chosen || undefined);

    if (chosen) {
      setLoading?.(true);
      debouncedFunction(chosen);
    } else {
      setLoading?.(false);
    }
  };

  const handleClear = () => {
    setValue("");
    setFilter(undefined);
    debouncedFunction.cancel();
    setLoading?.(false);
  };

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
        onInputChange={(_, newValue, reason) => {
          if (reason === "input") setValue(newValue);
          else if (reason === "clear") handleClear();
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
                    loading ? (
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
        )}
      />
    </Box>
  );
};

export default DropdownSearchInput;
