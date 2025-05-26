import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { usersData } from "../data";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const ActivityLog = () => {
  return (
    <Box>
      <Typography fontWeight={700} mb={2.5} fontSize={20}>
        Last Activity
      </Typography>

      <Box
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          pr: 1,
        }}
      >
        {usersData.lastActivity.map((activity, idx) => (
          <Accordion key={idx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ marginBottom: "10px" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon sx={{ color: "#28a745", fontSize: 20 }} />
                <Typography fontWeight={500}>{activity.type}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1} mt={-2}>
                {activity.details.map((detail, i) => (
                  <Typography variant="body2" key={i}>
                    {detail}
                  </Typography>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default ActivityLog;
