// import { Box, CircularProgress } from "@mui/material";
// import React from "react";

// const Loader = () => {
//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height={200}
//     >
//       <CircularProgress size={32} />
//     </Box>
//   );
// };

// export default Loader;
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface LoaderProps {
  title?: string;
}

const Loader: React.FC<LoaderProps> = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // take parent height
        minHeight: 200, // fallback minimum
      }}
    >
      {/* Dynamic text */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          mb: 2,
          color: "primary.main",
          animation: "pulse 1.5s infinite",
        }}
      >
        {title || "Loading..."}
      </Typography>

      <CircularProgress size={36} thickness={4} />

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
        `}
      </style>
    </Box>
  );
};

export default Loader;
