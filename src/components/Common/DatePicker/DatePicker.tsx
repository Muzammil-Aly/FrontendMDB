"use client";
import React from "react";
import {
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs, { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  label: string;
  value: Dayjs | null;
  setValue: (val: Dayjs | null) => void;
  setFilter: (val: string | undefined) => void;
  setPage: (val: number) => void;
  width?: number | string;
  placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  setValue,
  setFilter,
  setPage,
  width = 220,
  placeholder = "Select Date",
}) => {
  return (
    <FormControl size="small" sx={{ width }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          enableAccessibleFieldDOMStructure={false} // ✅ important to avoid error
          label={label}
          value={value}
          onChange={(newValue) => {
            if (!newValue) {
              setValue(null);
              setFilter(undefined);
            } else {
              setValue(newValue);
              setFilter(dayjs(newValue).format("YYYY-MM-DD"));
            }
            setPage(1);
          }}
          slots={{
            textField: (textFieldProps) => {
              // strip props MUI adds for accessible DOM
              const { sectionListRef, areAllSectionsEmpty, ...rest } =
                textFieldProps;

              return (
                <TextField
                  {...rest}
                  size="small"
                  placeholder={placeholder}
                  sx={{
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
                  InputProps={{
                    ...rest.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: value ? (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setValue(null);
                          setFilter(undefined);
                          setPage(1);
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      rest.InputProps?.endAdornment
                    ),
                  }}
                />
              );
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default CustomDatePicker;
