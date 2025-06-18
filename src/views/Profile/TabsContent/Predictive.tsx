import React from "react";
import { Box, Typography, Stack } from "@mui/material";

interface PredictiveProps {
  data: Record<string, any>;
}

const Predictive: React.FC<PredictiveProps> = ({ data }) => {
  return (
    <Box>
      <Typography fontWeight={600} mb={4} variant="h4">
        Predictive Analytics
      </Typography>
      <Stack spacing={1}>
        {Object.entries(data).map(([key, value], idx) => (
          <Typography key={idx} variant="body2">
            <strong>{key.replace(/_/g, " ")}:</strong> &nbsp;
            {value !== null ? value.toString() : "N/A"}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};

export default Predictive;
