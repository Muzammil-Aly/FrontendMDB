"use client";

import React, { useState } from "react";
import { Box, TextField, IconButton, Popover, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs, { Dayjs } from "dayjs";

interface CustomDateRangePickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: (val: Dayjs | null) => void;
  setEndDate: (val: Dayjs | null) => void;
  setFilter: (val: string | undefined) => void;
  setPage: (val: number) => void;
  width?: number | string;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setFilter,
  setPage,
  width = 250,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [error, setError] = useState<string>("");

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setError("");
  };

  const handleClose = () => setAnchorEl(null);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setFilter(undefined);
    setPage(1);
    setError("");
  };

  const handleDateChange = (newStart: Dayjs | null, newEnd: Dayjs | null) => {
    if (newStart && newEnd && newStart.isAfter(newEnd)) {
      setError("Start date cannot be after end date");
      return;
    }

    setStartDate(newStart);
    setEndDate(newEnd);

    if (newStart && newEnd) {
      setFilter(
        `${newStart.format("YYYY-MM-DD")},${newEnd.format("YYYY-MM-DD")}`
      );
      setPage(1);
      setError("");
      handleClose();
    } else {
      setFilter(undefined);
      setPage(1);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={0.5}>
        <TextField
          size="small"
          onClick={handleOpen}
          value={
            startDate && endDate
              ? `${startDate.format("YYYY-MM-DD")} - ${endDate.format(
                  "YYYY-MM-DD"
                )}`
              : ""
          }
          placeholder="Select Date Range"
          error={!!error}
          sx={{
            width,
            backgroundColor: "#fff",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              height: 38,
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              fontSize: "13px",
              "&:hover": { boxShadow: "0 3px 10px rgba(0,0,0,0.1)" },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
                borderWidth: "2px",
              },
            },
            "& .MuiInputBase-input": { padding: "6px 10px" },
          }}
          InputProps={{
            startAdornment: (
              <CalendarMonthIcon
                fontSize="small"
                color="action"
                sx={{ mr: 1 }}
              />
            ),
            endAdornment:
              startDate || endDate ? (
                <IconButton size="small" onClick={handleClear}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : undefined,
          }}
        />

        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          PaperProps={{
            sx: {
              p: 2,
              minWidth: 460,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              borderRadius: 2,
            },
          }}
        >
          {/* Two calendars side by side */}
          <Box display="flex" gap={2}>
            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ display: "block", mb: 1 }}
              >
                Start Date
              </Typography>
              <DateCalendar
                value={startDate}
                onChange={(val) => handleDateChange(val, endDate)}
              />
            </Box>

            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ display: "block", mb: 1 }}
              >
                End Date
              </Typography>
              <DateCalendar
                value={endDate}
                onChange={(val) => handleDateChange(startDate, val)}
              />
            </Box>
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
