import React from "react";
import { Box, Typography, Stack } from "@mui/material";

interface PredictiveProps {
  data: Record<string, any>;
}

const Predictive: React.FC<PredictiveProps> = ({ data }) => {
  return (
    <Box>
      <Typography fontWeight={700} mb={2} fontSize={20}>
        Predictive Insights
      </Typography>
      <Stack spacing={1}>
        {Object.entries(data).map(([key, value], idx) => (
          <Typography key={idx} variant="body2">
            <strong>{key.replace(/_/g, " ")}:</strong>{" "}
            {value !== null ? value.toString() : "N/A"}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};

export default Predictive;
