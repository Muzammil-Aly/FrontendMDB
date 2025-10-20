// import { Box, Button, Typography } from "@mui/material";
// import React from "react";
// import NavButton from "./NavButton";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         margin: "12px",
//       }}
//     >
//       <Typography variant="body2" sx={{ fontSize: "14px", color: "#667185" }}>
//         {"page"} {currentPage} {"of"} {totalPages}
//       </Typography>

//       {/* <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
//         {[...Array(totalPages).keys()].map((page) => {
//           if (
//             page === 0 ||
//             page === totalPages - 1 ||
//             page === currentPage - 1 ||
//             page === currentPage ||
//             page === currentPage + 1
//           ) {
//             return (
//               <Button
//                 key={page}
//                 variant={page === currentPage ? "contained" : "text"}
//                 sx={{
//                   width: "14px",
//                   height: "24px",
//                   padding: "8px",
//                   fontSize: "14px",
//                   color: page === currentPage ? "#004FA7" : "#98A2B3",
//                   backgroundColor: page === currentPage ? "#F9FAFB" : "#fff",
//                   "&:hover": {
//                     backgroundColor:
//                       page === currentPage ? "#E5F0FF" : "#F0F0F0",
//                     color: "#004FA7",
//                     width: "14px",
//                   },
//                 }}
//                 onClick={() => onPageChange(page)}
//               >
//                 {page + 1}
//               </Button>
//             );
//           } else if (
//             (page === 1 && currentPage > 2) ||
//             (page === totalPages - 2 && currentPage < totalPages - 3)
//           ) {
//             return (
//               <Typography key={page} sx={{ fontSize: "14px" }}>
//                 {"skip"}
//               </Typography>
//             );
//           }
//           return null;
//         })}
//       </Box> */}

//       <Box sx={{ display: "flex", gap: "16px" }}>
//         <NavButton
//           text="Previous"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         />
//         <NavButton
//           text={"Next"}
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages || totalPages === 1}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Pagination;
"use client";
import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (end - start < maxVisible - 1) {
      if (currentPage < totalPages / 2) {
        end = Math.min(totalPages, start + maxVisible - 1);
      } else {
        start = Math.max(1, end - maxVisible + 1);
      }
    }

    if (start > 1) {
      pages.push(
        <Button key={1} onClick={() => onPageChange(1)} sx={buttonStyle(false)}>
          1
        </Button>
      );
      if (start > 2) {
        pages.push(
          <Typography key="start-ellipsis" sx={ellipsisStyle}>
            …
          </Typography>
        );
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          sx={buttonStyle(i === currentPage)}
        >
          {i}
        </Button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(
          <Typography key="end-ellipsis" sx={ellipsisStyle}>
            …
          </Typography>
        );
      }
      pages.push(
        <Button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          sx={buttonStyle(false)}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #E5E7EB",
        px: 2,
        py: 1.5,
        bgcolor: "#fff",
      }}
    >
      {/* Left side: total pages */}
      <Typography sx={{ fontSize: 14, color: "#667085" }}>
        {totalPages} Pages ({pageSize} per page)
      </Typography>

      {/* Right side: pagination controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={navButtonStyle}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
        </IconButton>

        {renderPageNumbers()}

        <IconButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={navButtonStyle}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

// ---- STYLES ----
const buttonStyle = (active: boolean) => ({
  minWidth: 36,
  height: 32,
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "20px",
  border: "1px solid #E5E7EB",
  borderRadius: "6px",
  color: active ? "#fff" : "#344054",
  bgcolor: active ? "#3B82F6" : "#fff",
  boxSizing: "border-box",
  textTransform: "none",
  transition: "background-color 0.2s ease, color 0.2s ease",
  padding: 0,
  "&:hover": {
    bgcolor: active ? "#2563EB" : "#344054",
    color: active ? "#fff" : "#fff",
    border: "1px solid #E5E7EB",
    boxSizing: "border-box",
  },
  "& .MuiTouchRipple-root": {
    display: "none", // ✅ removes ripple expanding effect
  },
});

const ellipsisStyle = {
  fontSize: 14,
  color: "#98A2B3",
  px: 0.5,
};

const navButtonStyle = {
  border: "1px solid #E5E7EB",
  borderRadius: "6px",
  width: 32,
  height: 32,
  color: "#344054",
  "&:disabled": { opacity: 0.4 },
};

export default PaginationBar;
