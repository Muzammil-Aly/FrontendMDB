import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface PredictiveProps {
  data: {
    total_clv: number;
    historic_clv: number;
    predicted_clv: number;
    predicted_orders: number;
    historic_orders: number;
    average_order_value: number;
    churn_probability: number;
    average_days_between_orders: number;
    expected_date_of_next_order: string;
  };
}

const Predictive: React.FC<PredictiveProps> = ({ data }) => {
  const { historic_clv, predicted_clv, expected_date_of_next_order } = data;

  const [showHistoric, setShowHistoric] = useState(true);
  const [showPredicted, setShowPredicted] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Dynamically recalculate percentage based on checkbox states
  const total =
    (showHistoric ? historic_clv : 0) + (showPredicted ? predicted_clv : 0);
  const historicPercent = total
    ? ((showHistoric ? historic_clv : 0) / total) * 100
    : 0;
  const predictedPercent = total
    ? ((showPredicted ? predicted_clv : 0) / total) * 100
    : 0;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Typography fontWeight={600} mb={1} variant="h6" color="text.primary">
          Predictive analytics
        </Typography>
      </Box>

      <Box>
        <Typography fontWeight={600} mb={1} variant="h5" color="text.primary">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(historic_clv)}
        </Typography>

        <Typography
          fontWeight={400}
          mb={3}
          variant="subtitle1"
          color="text.primary"
        >
          Customer Lifetime Value (CLV)
        </Typography>
      </Box>

      <Box width="100%">
        <Box
          height={20}
          width="100%"
          display="flex"
          borderRadius={1}
          overflow="hidden"
          mb={2}
          bgcolor="#e0e0e0"
        >
          {showHistoric && (
            <Box
              width={`${historicPercent}%`}
              bgcolor="primary.main"
              sx={{ transition: "width 0.3s" }}
            />
          )}

          {showHistoric && showPredicted && (
            <Box width="2px" bgcolor="#fff" sx={{ transition: "width 0.3s" }} />
          )}

          {showPredicted && (
            <Box
              width={`${predictedPercent}%`}
              bgcolor="green"
              sx={{ transition: "width 0.3s" }}
            />
          )}
        </Box>

        <Stack direction={isMobile ? "column" : "row"} spacing={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showHistoric}
                onChange={(e) => setShowHistoric(e.target.checked)}
                sx={{
                  color: "primary.main",
                  "&.Mui-checked": { color: "primary.main" },
                }}
              />
            }
            label={
              <Typography
                fontWeight={400}
                variant="subtitle1"
                color="text.primary"
              >
                Historic CLV (${historic_clv})
              </Typography>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={showPredicted}
                onChange={(e) => setShowPredicted(e.target.checked)}
                sx={{
                  color: "green",
                  "&.Mui-checked": { color: "green" },
                }}
              />
            }
            label={
              <Typography
                fontWeight={400}
                variant="subtitle1"
                color="text.primary"
              >
                Predicted CLV (${predicted_clv} )
              </Typography>
            }
          />
        </Stack>
      </Box>

      {/* Key/Value Data Display */}
      <Stack spacing={1} mt={1}>
        {Object.entries(data)
          .filter(
            ([key]) =>
              !["historic_clv", "predicted_clv", "total_clv"].includes(key)
          )
          .map(([key, value], idx) => {
            const formattedKey = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            let displayValue = "N/A";

            if (value !== null) {
              const valueStr = value.toString();

              if (/\d{4}-\d{2}-\d{2}T/.test(valueStr)) {
                displayValue = new Date(valueStr).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
              } else if (key.toLowerCase().includes("churn_probability")) {
                displayValue = `${(Number(value) * 100).toFixed(2)} %`;
              } else if (typeof value === "number") {
                displayValue = value.toFixed(2);
              } else if (!isNaN(Number(value))) {
                displayValue = Number(value).toFixed(2);
              } else {
                displayValue = valueStr;
              }
            }

            return (
              <Typography key={idx} variant="body2">
                <Box
                  component="span"
                  fontWeight="bold"
                  fontSize="12px"
                  sx={{ display: "inline-block", minWidth: "300px" }}
                >
                  {formattedKey}:
                </Box>
                <Box
                  component="span"
                  fontSize="0.875rem"
                  color="text.secondary"
                >
                  {displayValue}
                </Box>
              </Typography>
            );
          })}
      </Stack>
    </Box>
  );
};

export default Predictive;
