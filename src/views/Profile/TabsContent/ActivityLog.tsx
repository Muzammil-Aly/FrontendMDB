"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { useGetProfileEventsQuery } from "@/redux/services/profileApi";
import { dummyActivityLog } from "../data";

interface ActivityLogProps {
  profileId: string;
}

const SkeletonAccordion = () => (
  <Box mb={1}>
    <Skeleton variant="rectangular" height={48} />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="60%" />
  </Box>
);

const ActivityLog: React.FC<ActivityLogProps> = ({ profileId }) => {
  const { data, isLoading, isError } = useGetProfileEventsQuery(profileId);

  const events = data?.data?.results || dummyActivityLog;
  console.log("events----", events);
  return (
    <Box>
      <Typography fontWeight={700} mb={2.5} fontSize={20}>
        Activity Log
      </Typography>

      <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
        {isLoading ? (
          <>
            <SkeletonAccordion />
            <SkeletonAccordion />
            <SkeletonAccordion />
          </>
        ) : isError && dummyActivityLog.length === 0 ? (
          <Typography color="error">Failed to load activity logs.</Typography>
        ) : events.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No activity logs found.
          </Typography>
        ) : (
          events.map((event: any, idx: number) => {
            const metricName = event.metric?.attributes?.name ?? "Unknown";
            const props = event.event.attributes.event_properties;
            const displayedProps = Object.entries(props)
              .filter(([k]) =>
                [
                  "Recipient Email Address",
                  "Recipient Email",
                  "Campaign Name",
                  "Subject",
                  "Inbox Provider",
                  "machine_open",
                  "email_address",
                  "Source Name",
                  "ShippingRate",
                  "FulfillmentStatus",
                  "FulfillmentHours",
                  "Collections",
                  "browser",
                  "os",
                  "method_detail",
                  "method",
                  "subject",
                  "from",
                  "Name",
                  "Price",
                  "Categories",
                  "CollectionName",
                  "CollectionID",
                ].includes(k)
              )
              .slice(0, 5);

            return (
              <Accordion key={idx}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ mb: "10px" }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircleIcon sx={{ color: "#28a745", fontSize: 20 }} />
                    <Typography fontWeight={500}>{metricName}</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1} pl={2}>
                    {displayedProps.map(([key, value], i) => (
                      <Typography key={i} variant="body2">
                        <strong>{key.replace(/_/g, " ")}:</strong>
                        {"\u00A0\u00A0"}
                        {Array.isArray(value)
                          ? value.length > 0
                            ? value.join(", ")
                            : "None"
                          : value?.toString() ?? "N/A"}
                      </Typography>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default ActivityLog;
