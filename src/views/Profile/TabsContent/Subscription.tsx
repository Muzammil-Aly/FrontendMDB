import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { dummySubscriptions } from "../data";
interface SubscriptionProps {
  subscriptions: Record<string, any>;
  // subscriptions: dummySubscriptions;
}

const Subscription= () => {
  // if (!subscriptions)
  //   return <Typography>No subscription data available.</Typography>;
   if (!dummySubscriptions)
    return <Typography>No subscription data available.</Typography>;
  

  return (
    <Box>
      <Typography fontWeight={700} mb={2.5} fontSize={20}>
        Subscriptions
      </Typography>

      <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
        {Object.entries(dummySubscriptions).map(([type, content], idx) => (
          <Accordion key={idx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ mb: "10px" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon sx={{ color: "#28a745", fontSize: 20 }} />
                <Typography fontWeight={600}>{type.toUpperCase()}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              {Object.entries(dummySubscriptions).map(([subType, subDetails], i) => (
                <Box key={i} mb={2}>
                  <Typography fontWeight={700} fontSize={16} mb={1}>
                    {subType.charAt(0).toUpperCase() + subType.slice(1)}:
                  </Typography>
                  <Stack spacing={1} pl={2}>
                    {Object.entries(subDetails || {}).map(([key, value], j) => (
                      <Typography key={j} variant="body2">
                        <strong>{key.replace(/_/g, " ")}:</strong> &nbsp;&nbsp;
                        {Array.isArray(value)
                          ? value.length > 0
                            ? value.join(", ")
                            : "None"
                          : value?.toString() ?? "N/A"}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default Subscription;
