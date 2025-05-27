"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Stack } from "@mui/material";

import { tabItems } from "./data";

import CustomTabs from "@/components/Common/CustomTabs";
import ActivityLog from "./TabsContent/ActivityLog";
import Subscription from "./TabsContent/Subscription";
import OrderHistory from "./TabsContent/OrderHistory";
import Predictive from "./TabsContent/Predictive";
interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: 2,
  p: "24px 48px",
  maxWidth: 1060,
  width: "100%",
  maxHeight: "85vh",
  overflowY: "auto",
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  open,
  onClose,
  userData,
}) => {
  const [activeTab, setActiveTab] = useState("subscriptions");
  useEffect(() => {
    if (open) {
      setActiveTab("subscriptions");
    }
  }, [open]);
  if (!userData) return null;
  const userDetails = [
    { label: "Mobile", value: userData.phone_number },
    { label: "Email", value: userData.email },
    { label: "Organization", value: userData.organization },
    { label: "Address", value: userData.address },
    { label: "City", value: userData.city },
    { label: "Country", value: userData.country },
    { label: "Postal", value: userData.postal },
  ];
  const renderTabs = (tab: string) => {
    switch (tab.toLowerCase()) {
      case "subscriptions":
        return <Subscription subscriptions={userData.subscriptions} />;
      case "order history":
        return <OrderHistory />;
      case "activity log":
        return <ActivityLog profileId={userData.id} />;
      case "predictive analytics":
        return <Predictive data={userData.predictive_analytics} />;
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-details-title">
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Stack>
            <Typography
              id="user-details-title"
              variant="h6"
              fontWeight={700}
              sx={{ textTransform: "capitalize", marginBottom: "4px" }}
            >
              {userData.name}
            </Typography>
            <Typography
              id="user-details-activity"
              variant="body2"
              fontWeight={400}
              color="#666D80"
              fontSize={14}
            >
              Last Activity on {userData.least_active}
            </Typography>
          </Stack>
          <Box mt={4} display="flex" gap={2} justifyContent="flex-end">
            <CustomTabs
              tabs={tabItems}
              onTabChange={(label) => setActiveTab(label)}
            />
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Box flex={1}>
            <Typography fontWeight={700} mb={2.8} fontSize={20}>
              Profile Information
            </Typography>
            {userDetails.map(({ label, value }) => (
              <Stack
                key={label}
                direction="row"
                justifyContent="space-between"
                mb={2}
                borderBottom="1px solid rgba(193, 199, 208, 0.3)"
                paddingBottom={1}
              >
                <Typography fontWeight={600}>{label}:</Typography>
                <Typography fontWeight={400} color="#666D80">
                  {value || "N/A"}
                </Typography>
              </Stack>
            ))}
          </Box>
          <Box
            flex={1}
            border={"1px solid #C1C7D0"}
            p={2}
            borderRadius={2}
            overflow={"hidden"}
          >
            {renderTabs(activeTab)}
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UserDetailsModal;
