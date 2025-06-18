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
import CancelIcon from "@mui/icons-material/Cancel";

interface SubscriptionProps {
  subscriptions: Record<string, any>;
}

const Subscription = ({ subscriptions }: SubscriptionProps) => {
  if (!subscriptions)
    return <Typography>No subscription data available.</Typography>;

  return (
    <Box>
      <Typography fontWeight={600} mb={2.5} variant="h4">
        Subscriptions
      </Typography>

      <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
        {Object.entries(subscriptions).map(([type, content], idx) => {
          const marketing = content?.marketing || {};
          const isSubscribed = marketing.consent === "SUBSCRIBED";

          const fieldsToShow = isSubscribed
            ? ["consent", "last_updated", "method"]
            : ["consent"];

          return (
            <Accordion key={idx}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {isSubscribed ? (
                    <CheckCircleIcon sx={{ color: "#28a745", fontSize: 20 }} />
                  ) : (
                    <CancelIcon sx={{ color: "#dc3545", fontSize: 20 }} />
                  )}
                  <Typography fontWeight={600}>
                    {type.replace("_", " ").toUpperCase()}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1}>
                  {fieldsToShow.map((key) => (
                    <Typography key={key} variant="body2">
                      <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                      {marketing[key]?.toString() ?? "N/A"}
                    </Typography>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
};

export default Subscription;
