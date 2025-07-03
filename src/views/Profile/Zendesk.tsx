"use client";
import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetZendeskTicketsQuery } from "@/redux/services/profileApi";
import parse from "html-react-parser";
import Divider from "@mui/material/Divider";
interface ZendeskProps {
  email?: string;
}

const Zendesk = ({ email }: ZendeskProps) => {
  const { data, isFetching, isError, isSuccess } = useGetZendeskTicketsQuery(
    { email: email || "" },
    { skip: !email }
  );

  if (!email) return <Typography color="error">No email provided.</Typography>;
  if (isFetching)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress size={50} />
      </Box>
    );
  if (isError)
    return <Typography color="error">Failed to fetch ticket data.</Typography>;
  if (!data?.data?.length)
    return <Typography variant="h5" textAlign={"center"}>No Zendesk ticket data available.</Typography>;
  const cleanHtml = (raw: string) => {
    return raw
      .replace(/<([^>]+)?>(?!<\/a>|<\/b>|<\/strong>|<\/i>|<\/u>)/g, "")
      .replace(/(\[.*?\])\s*<.*?>/g, "")
      .replace(/\n/g, "<br />");
  };

  return (
    <Box>
      <Typography fontWeight={600} mb={2.5} variant="h4" p={2}>
        Zendesk Tickets
      </Typography>

      <Box>
        {data.data.map((ticket: any, idx: number) => (
          <Accordion key={idx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  fontWeight={700}
                  fontSize={18}
                  variant="h2"
                  color="#000"
                >
                  {ticket.subject}
                </Typography>
                <Typography variant="caption" color="#888">
                  ({ticket.ticket_updated_at})
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Ticket ID:</strong> {ticket.ticket_id}
                </Typography>
                <Typography variant="body2">
                  <strong>User Phone:</strong> {ticket.user_phone || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong> {ticket.status}
                </Typography>
                <Typography variant="body2">
                  <strong>Score:</strong>{" "}
                  {ticket.ticket_ratings[0]?.score || "N/A"}
                </Typography>
                <Divider sx={{ my: 1 }} />

                {ticket.description && (
                  <Box>
                    <Typography fontWeight={600} mb={1}>
                      <strong>Description</strong>
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#f9f9f9",
                        padding: 1,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    >
                      {parse(cleanHtml(ticket.description))}
                    </Box>
                  </Box>
                )}
                {ticket.ticket_comments?.length > 0 && (
                  <Box mt={2}>
                    <Typography fontWeight={600} mb={1}>
                      <strong>Comments</strong>
                    </Typography>
                    {ticket.ticket_comments.map(
                      (comment: any, index: number) => (
                        <Box key={index}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            mb={0.5}
                          >
                            {comment.created_at} — via {comment.via_channel}
                          </Typography>
                          <Box
                            sx={{
                              fontSize: "14px",
                              lineHeight: 1.6,
                            }}
                          >
                            {parse(cleanHtml(comment.body))}
                          </Box>
                        </Box>
                      )
                    )}
                  </Box>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default Zendesk;
