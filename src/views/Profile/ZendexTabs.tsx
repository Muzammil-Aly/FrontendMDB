"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Zendesk from "./Zendesk";

interface ExternalTabsProps {
  email?: string;
}

const ExternalTabs = ({ email }: ExternalTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("zendesk");

  return (
    <Box mt={5}>
      <Typography fontWeight={700} mb={4} variant="h1">
        External Insights
      </Typography>

      <Box display={"flex"} gap={2} alignItems="self-start">
        <Box width="180px">
          <Stack spacing={2}>
            <Button
              variant={activeTab === "zendesk" ? "contained" : "outlined"}
              onClick={() => setActiveTab("zendesk")}
            >
              Zendesk
            </Button>
            <Button
              variant={activeTab === "zigital" ? "contained" : "outlined"}
              onClick={() => setActiveTab("zigital")}
            >
              Zigital
            </Button>
          </Stack>
        </Box>

        <Box
          flex={1}
          width={"50%"}
          border={"1px solid #C1C7D0"}
          borderRadius={2}
          height={"45vh"}
          sx={{ overflowY: "auto", pr: 1 }}
        >
          {activeTab === "zendesk" && <Zendesk email={email} />}
          {activeTab === "zigital" && (
            <Typography variant="body2" p={2}>
             Zigital data will be here in the future....
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ExternalTabs;
