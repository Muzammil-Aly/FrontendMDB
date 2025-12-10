// "use client";
// import React, { useEffect, useState } from "react";
// import { Box, Modal, Typography, Stack } from "@mui/material";

// import OrderHistory from "../OrderHistory";
// import CustomerSegmentCard from "../../CustomerSegmentCard";
// import SupportTickets from "../../SupportTickets";
// import MarketingEvents from "../../MarketingEvents";
// import Orders from "../../Orders";

// interface UserDetailsModalProps {
//   open: boolean;
//   onClose: () => void;
//   userData: any;
// }

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "#fff",
//   borderRadius: 2,
//   p: 2.5,
//   width: "95%",
//   maxWidth: 1080,
//   maxHeight: "90vh",
//   overflow: "hidden",
//   boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
// };

// const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
//   open,
//   onClose,
//   userData,
// }) => {
//   const [activeMenu, setActiveMenu] = useState("Customer Segments");

//   const menuItems = [
//     "Customer Segments",
//     "Orders",
//     "Support Tickets",
//     "Marketing Events",
//   ];

//   useEffect(() => {
//     if (open) setActiveMenu("Customer Segments");
//   }, [open]);

//   if (!userData) return null;

//   const userDetails = [
//     { label: "Customer ID", value: userData.customer_id },
//     { label: "Email", value: userData.email },
//     { label: "Phone", value: userData.phone },
//     { label: "Full Name", value: userData.full_name },
//     { label: "Source", value: userData.source },
//     { label: "Join Type", value: userData.join_type },
//     { label: "Key", value: userData.key },
//   ];

//   const menuConfig: Record<string, { component: React.ReactNode }> = {
//     "Customer Segments": {
//       component: <CustomerSegmentCard custId={userData.customer_id} />,
//     },
//     Orders: {
//       // component: <OrderHistory customerId={userData.customer_id} />,
//       component: <Orders customerId={userData.customer_id} />,
//     },
//     "Support Tickets": {
//       component: <SupportTickets customerId={userData.customer_id} />,
//     },
//     "Marketing Events": {
//       component: <MarketingEvents customerId={userData.customer_id} />,
//     },
//   };

//   return (
//     <Modal open={open} onClose={onClose} aria-labelledby="user-details-title">
//       <Box sx={style}>
//         {/* Header */}
//         <Stack mb={3}>
//           <Typography fontWeight={700} fontSize={18} mb={1}>
//             Profile Information
//           </Typography>
//           <Box
//             display="grid"
//             gridTemplateColumns={{
//               xs: "1fr",
//               sm: "1fr 1fr",
//               md: "repeat(3, 1fr)",
//             }}
//             gap={1.5}
//           >
//             {userDetails.map(({ label, value }) => (
//               <Stack
//                 key={label}
//                 direction="row"
//                 justifyContent="space-between"
//                 borderBottom="1px solid #E0E0E0"
//                 pb={0.5}
//               >
//                 <Typography fontWeight={600} fontSize={15}>
//                   {label}:
//                 </Typography>
//                 <Typography fontWeight={400} fontSize={15} color="#666D80">
//                   {value || "N/A"}
//                 </Typography>
//               </Stack>
//             ))}
//           </Box>
//         </Stack>

//         {/* User Name */}
//         <Stack direction="row" justifyContent="space-between" mb={2}>
//           <Stack>
//             <Typography
//               id="user-details-title"
//               variant="subtitle1"
//               fontWeight={700}
//             >
//               {userData.name}
//             </Typography>
//             <Typography
//               variant="body2"
//               fontWeight={400}
//               color="#666D80"
//               fontSize={12}
//             >
//               Last Activity: {userData.least_active}
//             </Typography>
//           </Stack>
//         </Stack>

//         {/* Sidebar + Content */}
//         <Stack direction="row" spacing={2} height="calc(70vh - 200px)">
//           {/* Sidebar */}
//           <Box
//             sx={{
//               minWidth: "180px",
//               borderRight: "1px solid #E0E0E0",
//               display: "flex",
//               flexDirection: "column",
//               gap: 0.5,
//             }}
//           >
//             {menuItems.map((item) => {
//               // if (item === "Orders" && userData.source !== "Wismo") return null;

//               const isActive = activeMenu === item;
//               return (
//                 <Typography
//                   key={item}
//                   variant="body2"
//                   onClick={() => setActiveMenu(item)}
//                   sx={{
//                     p: 1,
//                     borderRadius: 1,
//                     cursor: "pointer",
//                     fontWeight: isActive ? 600 : 400,
//                     bgcolor: isActive ? "#e0e0e0" : "transparent",
//                     "&:hover": { bgcolor: "#F3F4F6" },
//                     fontSize: 15,
//                   }}
//                 >
//                   {item}
//                 </Typography>
//               );
//             })}
//           </Box>

//           {/* Content */}
//           <Box
//             flex={1}
//             borderRadius={1.5}
//             // p={1.5}
//             bgcolor="#FAFAFA"
//             overflow="auto"
//           >
//             {menuConfig[activeMenu]?.component}
//           </Box>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// };

// export default UserDetailsModal;

"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import CustomerSegmentCard from "../../CustomerSegmentCard";
import SupportTickets from "../../SupportTickets";
import MarketingEvents from "../../MarketingEvents";
import Orders from "../../Orders";
import { Returns } from "@/constants/Grid-Table/ColDefs";
import Return from "../../Return";
import Refund from "../../Refund";

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
  p: 0,
  width: "95%",
  maxWidth: 1080,
  height: "85vh", // ✅ fixed height for consistent layout
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  display: "flex",
  flexDirection: "column",
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  open,
  onClose,
  userData,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const menuItems = [
    "Customer segments",
    "Support tickets",
    "Orders",
    "Marketing events",
    "Returns",
    "Refunds",
  ];

  useEffect(() => {
    if (open) setActiveTab(0);
  }, [open]);

  if (!userData) return null;

  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabComponents = [
    <CustomerSegmentCard custId={userData.customer_id} key="segment" />,
    <SupportTickets customerId={userData.customer_id} key="support" />,
    <Orders customerId={userData.customer_id} key="orders" />,
    <MarketingEvents customerId={userData.customer_id} key="marketing" />,
    <Return customer_id={userData.customer_id} key="returns" />,
    <Refund customer_id={userData.customer_id} key="refunds" />,
  ];

  const firstLetter = userData?.full_name?.charAt(0)?.toUpperCase() || "U";
  const fullName = userData?.full_name || "N/A";
  const email = userData?.email || "N/A";
  const userFields = [
    { label: "Customer ID", value: userData.customer_id },
    { label: "Join type", value: userData.join_type },
    { label: "Key", value: userData.key },
    { label: "Source", value: userData.source },
    { label: "Phone number", value: userData.phone },
  ];

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-details-title">
      <Box sx={style}>
        {/* HEADER */}
        <Box
          sx={{
            backgroundColor: "#1C2A5E",
            color: "#fff",
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2.5,
            flexShrink: 0,
          }}
        >
          <Avatar
            src={userData.profile_image || ""}
            sx={{
              width: 65,
              height: 65,
              border: "2px solid #fff",
              bgcolor: "#3B4A91",
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            {firstLetter}
          </Avatar>

          <Stack mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="#FFFFFF"
              sx={{ mt: 0.3, fontSize: 16 }}
            >
              {fullName}
            </Typography>
            <Typography
              variant="body2"
              color="#E0E3F0"
              sx={{ fontSize: 12, mt: 0.2 }}
            >
              {email}
            </Typography>
          </Stack>
        </Box>

        {/* DETAILS */}
        {/* <Box sx={{ p: 3, flexShrink: 0 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 1.5,
            }}
          >
            <Typography fontWeight={400} fontSize={16}>
              <strong style={{ color: "#00000080" }}>Full name:</strong>{" "}
              {userData.full_name || "N/A"}
            </Typography>
            <Typography fontWeight={400} fontSize={16}>
              <strong style={{ color: "#00000080" }}>Customer ID:</strong>{" "}
              {userData.customer_id || "N/A"}
            </Typography>
            <Typography fontWeight={400} fontSize={16}>
              <strong style={{ color: "#00000080" }}>Join type:</strong>{" "}
              {userData.join_type || "N/A"}
            </Typography>
            <Typography fontWeight={400} fontSize={16}>
              <strong style={{ color: "#00000080" }}>Email:</strong>{" "}
              {userData.email || "N/A"}
            </Typography>
            <Typography fontWeight={400} fontSize={16}>
              <strong style={{ color: "#00000080" }}>Key:</strong>{" "}
              {userData.key || "N/A"}
            </Typography>
            <Typography fontWeight={400} fontSize={16}>
              <strong style={{ color: "#00000080" }}>Source:</strong>{" "}
              {userData.source || "N/A"}
            </Typography>
            <Typography fontWeight={400} fontSize={16}>
              <strong style={{ color: "#00000080" }}>Phone number:</strong>{" "}
              {userData.phone || "N/A"}
            </Typography>
          </Box>
        </Box> */}
        <Box sx={{ p: 3, flexShrink: 0 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 1.5,
            }}
          >
            {userFields.map((field) => (
              <Typography key={field.label} fontWeight={400} fontSize={16}>
                <Typography
                  component="span"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {field.label}:
                </Typography>{" "}
                {field.value || "N/A"}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* TABS */}
        <Box sx={{ borderTop: "1px solid #E0E0E0", flexShrink: 0 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
              "& .Mui-selected": { color: "#1C2A5E" },
              px: 2,
            }}
          >
            {menuItems.map((item) => (
              <Tab key={item} label={item} />
            ))}
          </Tabs>
        </Box>

        {/* CONTENT (scrollable area) */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#F8FAFC",
            // p: 2,
          }}
        >
          {tabComponents[activeTab]}
        </Box>
      </Box>
    </Modal>
  );
};

export default UserDetailsModal;
