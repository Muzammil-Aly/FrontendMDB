"use client";

import { usePathname, useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import React, { useState, useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  // const isAuthPage = pathname === "/sign-in" || pathname === "/forgot-password";

  const publicPaths = ["/sign-in", "/forgot-password"];
  const isAuthPage = publicPaths.includes(pathname);
  useEffect(() => {
    const auth = localStorage.getItem("loggedIn") === "true";
    setIsAuthenticated(auth);

    if (!auth && !isAuthPage) {
      router.replace("/sign-in");
    }
  }, [isAuthPage, router]);

  if (isAuthenticated === null && !isAuthPage) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
