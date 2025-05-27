import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={200}
    >
      <CircularProgress size={32} />
    </Box>
  );
};

export default Loader;
