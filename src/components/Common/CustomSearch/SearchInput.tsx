import React, { Dispatch, SetStateAction } from "react";
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

  placeholder?: string;
  width?: number;
  loading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  value,
  setValue,
  setFilter,
  debouncedFunction,
  placeholder,
  width = 140,
  loading = true,
}) => {
  const [isTyping, setIsTyping] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    if (val.trim() === "") {
      setFilter(undefined);
      debouncedFunction.cancel();
    } else {
      debouncedFunction(val);
      setIsTyping(true);
    }
  };

  const handleClear = () => {
    setValue("");
    setFilter(undefined);
    debouncedFunction.cancel();
    setIsTyping(false);
  };

  return (
    <FormControl size="small" sx={{ width }}>
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={handleChange}
        size="small"
        placeholder={placeholder || label}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
            transition: "0.2s",
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            },
          },
        }}
        InputProps={{
          endAdornment:
            value.trim() !== "" ? (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress size={18} />
                ) : (
                  <IconButton
                    size="small"
                    sx={{
                      color: "#888",
                      "&:hover": {
                        color: "#d32f2f",
                        bgcolor: "transparent",
                      },
                    }}
                    onClick={handleClear}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            ) : null,
        }}
      />
    </FormControl>
  );
};

export default SearchInput;
