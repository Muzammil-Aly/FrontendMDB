"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";
import debounce from "lodash/debounce";

interface MultiLocationInputProps {
  label?: string;
  value: string[];
  setValue: (val: string[]) => void;
  setFilter?: (val: string[]) => void;
  suggestions?: string[];
  loading?: boolean;
  fetchSuggestions?: (input: string) => Promise<string[]>;
  width?: number | string;
}

const MultiLocationInputWithSuggestions: React.FC<MultiLocationInputProps> = ({
  label = "Location Codes",
  value,
  setValue,
  setFilter,
  suggestions = [],
  loading = false,
  fetchSuggestions,
  width = 300,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [localSuggestions, setLocalSuggestions] = useState<string[]>(
    suggestions || []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalSuggestions(suggestions || []);
  }, [suggestions]);

  useEffect(() => {
    if (setFilter) setFilter(value);
  }, [value, setFilter]);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (input: string) => {
        if (!input.trim() || !fetchSuggestions) return;
        const normalizedInput = input.trim().toLowerCase();
        if (
          localSuggestions.some(
            (item) => item.toLowerCase() === normalizedInput
          )
        )
          return;

        const newData = await fetchSuggestions(input);
        setLocalSuggestions((prev) =>
          Array.from(new Set([...prev, ...newData]))
        );
      }, 400),
    [fetchSuggestions, localSuggestions]
  );

  useEffect(() => {
    if (inputValue.trim()) debouncedFetch(inputValue);
  }, [inputValue, debouncedFetch]);

  return (
    <Box sx={{ width }}>
      <Autocomplete
        multiple
        freeSolo
        filterSelectedOptions
        options={localSuggestions}
        value={value}
        inputValue={inputValue}
        onChange={(_, newValue, reason) => {
          setValue(newValue);
          if (reason === "selectOption" || reason === "createOption") {
            setInputValue(""); // clear input after selection
          }
        }}
        onInputChange={(_, newInput, reason) => {
          if (reason === "input") setInputValue(newInput);
        }}
        loading={loading}
        ListboxProps={{
          sx: {
            "& .MuiAutocomplete-option": {
              fontSize: "13px",
              padding: "4px 8px",
              minHeight: "28px",
            },
          },
        }}
        sx={{
          width,
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            "&:hover": { boxShadow: "0 3px 8px rgba(0,0,0,0.12)" },
            "&.Mui-focused fieldset": {
              borderColor: "#0E1B6B",
              boxShadow: "0 0 0 2px rgba(14,27,107,0.15)",
            },
            fontSize: "15px",
            color: "#1C1C1E",
            minHeight: 36,
            "& fieldset": { border: "1px solid #E0E0E0" },
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
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...rest } = getTagProps({ index });
            return (
              <Chip
                size="small"
                key={option}
                label={option}
                {...rest}
                sx={{
                  backgroundColor: "#EDEDF0",
                  color: "#000",
                  fontWeight: 500,
                  borderRadius: 1,
                  height: 28,
                  fontSize: "13px",
                  "& .MuiChip-deleteIcon": {
                    color: "#131C55",
                    "&:hover": { color: "white" },
                  },
                }}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={inputRef}
            label={label}
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && (
                    <CircularProgress
                      size={16}
                      sx={{ color: "#0E1B6B", mr: 1 }}
                    />
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        filterOptions={(options, params) => {
          const input = params.inputValue.toLowerCase();
          return options.filter(
            (option) =>
              option.toLowerCase().includes(input) && !value.includes(option)
          );
        }}
      />
    </Box>
  );
};

export default MultiLocationInputWithSuggestions;
