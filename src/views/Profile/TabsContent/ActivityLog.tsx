"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useState } from "react";
import { useLazyGetProfileEventsQuery } from "@/redux/services/profileApi";
import CustomButton from "@/components/Common/CustomButton";

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
  const [pageSize, setPageSize] = useState(10);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  const [trigger, { data, isLoading, isFetching }] =
    useLazyGetProfileEventsQuery();

  useEffect(() => {
    trigger({ profileId, page: 1, page_size: pageSize });
  }, [profileId, pageSize]);

  useEffect(() => {
    if (data?.data) {
      setAllEvents(data.data);
      setTotalRecords(data.total_records);
    }
  }, [data]);
  const handleLoadMore = () => {
    if (pageSize < totalRecords) {
      setPageSize((prev) => prev + 10);
    }
  };
  useEffect(() => {
    setPageSize(10);
    setAllEvents([]);
  }, [profileId]);

  return (
    <Box>
      <Typography fontWeight={600} mb={2.5} variant="h4">
        Activity Log
      </Typography>

      <Box sx={{ maxHeight: 400, overflowY: "auto", pr: 1 }}>
        {isLoading && pageSize === 1 ? (
          <>
            <SkeletonAccordion />
            <SkeletonAccordion />
            <SkeletonAccordion />
          </>
        ) : allEvents.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={200}
          >
            <CircularProgress size={32} />
          </Box>
        ) : (
          allEvents.map((event: any, idx: number) => {
            const metricName =
              event?.relationships?.metric?.data?.name ?? "Unknown";
            const { $value } = event?.attributes?.event_properties || {};

            const props = event.attributes?.event_properties ?? {};
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
                  "browser",
                  "os",
                  "method_detail",
                  "method",
                  "subject",
                  "from",
                  "Name",
                  "Price",
                  "CollectionName",
                  "CollectionID",
                  "Variant Name",
                  "Vendor",
                  "Items",
                ].includes(k)
              )
              .slice(0, 5);

            return (
              <Accordion key={idx}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircleIcon sx={{ color: "#28a745", fontSize: 20 }} />
                    <Box display="flex" gap={1} alignItems="center">
                      <Typography fontWeight={500}>{metricName}</Typography>

                      <Typography
                        variant="caption"
                        color="#666D80"
                        fontWeight={400}
                      >
                        {new Date(
                          event.attributes.datetime
                        ).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1} pl={2}>
                    {$value && (
                      <Typography variant="body2">
                        <strong>Value:</strong> {String($value)}
                      </Typography>
                    )}

                    {displayedProps.map(([key, value], i) => (
                      <Typography key={i} variant="body2">
                        <strong>{key.replace(/_/g, " ")}:</strong>{" "}
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

      {pageSize < totalRecords && (
        <Box mt={2} textAlign="center">
          <CustomButton
            variant="contained"
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </CustomButton>
        </Box>
      )}
    </Box>
  );
};

export default ActivityLog;
