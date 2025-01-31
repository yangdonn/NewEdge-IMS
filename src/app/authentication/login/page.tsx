"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Box, Card, Stack, Typography, Alert } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";

const Login2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // For error messages
  const [isClient, setIsClient] = useState(false); // To ensure client-side rendering
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensure the component only renders on the client
  }, []);

  const imageSrc = "/images/logos/Logo.png";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting:", { username, password }); // Debugging

    try {
      // Call the login API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }), // Assuming `username` is the email
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const data = await response.json();
      console.log("Response Data:", data); // Log API response

      if (!response.ok) throw new Error(data.message || "Login failed");

      // Handle successful login
      setError(null); // Clear any previous errors
      router.push("http://localhost:3000/"); // Redirect to the dashboard or home page
    } catch (err: any) {
      console.error("Error:", err.message);
      setError(err.message); // Display error message
    }
  };

  if (!isClient) return null; // Render nothing during SSR to avoid hydration mismatch

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: "100vh" }}>
          <Grid item xs={12} sm={12} lg={4} xl={3} display="flex" justifyContent="center" alignItems="center">
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {/* <Box mb={1}>
                  <img
                    src={imageSrc}
                    alt="Sidebar Logo"
                    style={{
                      width: "185px",
                      height: "60px",
                      justifyContent: "center",
                    }}
                  />
                </Box> */}
              </div>

              {/* Display error messages */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <AuthLogin
                  username={username}
                  password={password}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  handleSubmit={handleSubmit}
                  subtitle={
                    <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                      <Typography color="textSecondary" variant="h6" fontWeight="500">
                        Create New account?
                      </Typography>
                      <Typography
                        component="a"
                        href="/authentication/register"
                        fontWeight="500"
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                        }}
                      >
                        Create an account
                      </Typography>
                    </Stack>
                  }
                />
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
