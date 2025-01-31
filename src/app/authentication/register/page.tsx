"use client";

import { useState } from "react";
import { Grid, Box, Card, Stack, Typography, Alert } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthRegister from "@/auth/AuthRegister";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // For error messages
  const [success, setSuccess] = useState<boolean>(false); // For success messages

  const imageSrc = "/images/logos/Logo.png"; // You can change this logo if needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting:", { name, email, password }); // Debugging

    try {
      // Update the API route to match Next.js 13+ App Router convention
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text}`);
    }

      const data = await response.json();
      console.log("Response:", data); // Log API response

      if (!response.ok) throw new Error(data.message);

      setSuccess(true);
      setError('');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error("Error:", err.message);
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <PageContainer title="Register" description="this is Register page">
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
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Horizontally center the items
                  justifyContent: "center", // Vertically center the items
                  height: "100%", // Ensure the container takes the full height of the parent
                }}
              >
                {/* <Box mb={1}>
                  <img
                    src={imageSrc}
                    alt="Sidebar Logo"
                    style={{
                      width: "185px", // Adjust width as needed
                      height: "60px", // Adjust height as needed
                      justifyContent: "center",
                    }}
                  />
                </Box> */}
              </div>

              {/* Display success or error messages */}
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Registration successful! You can now sign in.
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <AuthRegister
                  name={name}
                  email={email}
                  password={password}
                  setName={setName}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleSubmit={handleSubmit}
                  subtitle={
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      mt={3}
                    >
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="500"
                      >
                        Already have an account?
                      </Typography>
                      <Typography
                        component="a"
                        href="/authentication/login"
                        fontWeight="500"
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                        }}
                      >
                        Sign In
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

export default RegisterPage;
