"use client";
import React, { useState } from "react";
import {
  Button,
  Typography,
  Link,
  Box,
  Container,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/components/Common/CustomTextField";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("info");
  const [loading, setLoading] = useState(false);

  const dummyUser = {
    email: "drivera@mdbmail.com",
    password: "drivera123",
  };
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      if (email === dummyUser.email && password === dummyUser.password) {
        setSeverity("success");
        setMessage("Signed in successfully!");
        localStorage.setItem("loggedIn", "true");

        setTimeout(() => {
          router.push("/customer-profile");
        }, 500);
      } else {
        setSeverity("error");
        setMessage("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        paddingBlock: 12,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          padding: 4,
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Sign in
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 3, color: "gray" }}
        >
          Stay updated on your professional world
        </Typography>

        <Stack gap={2}>
          <CustomTextField
            label="Email or Phone"
            fullWidth
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Email address "
          />

          <CustomTextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder=" password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5, mt: 2, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign in"
            )}
          </Button>
        </Stack>

        {message && (
          <Alert severity={severity} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}

        {/* <Typography variant="body2" align="center" mt={4}>
          <Link href="forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Typography> */}
      </Box>
    </Container>
  );
}
