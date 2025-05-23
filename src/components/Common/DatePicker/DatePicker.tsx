"use client";
import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface SelectDatePickerProps {
  onDateChange: (date: string | null) => void;
  label?: string;
  defaultValue?: string;
}

const SelectDatePicker: React.FC<SelectDatePickerProps> = ({
  onDateChange,
  label = "Select Date",
  defaultValue,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    defaultValue ? dayjs(defaultValue) : null
  );

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    onDateChange(newValue ? newValue.format("YYYY-MM-DD") : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <DatePicker
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              sx: {
                backgroundColor: "#fff",
                borderRadius: "6px",
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SelectDatePicker;
