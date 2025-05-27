"use client";

import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/sign-in" || pathname === "/forgot-password";

  const content = (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Box component="main" sx={{ flexGrow: 1, overflowY: "auto" }}>
        {children}
      </Box>
    </Box>
  );

  return <Provider store={store}>{isAuthPage ? children : content}</Provider>;
}
