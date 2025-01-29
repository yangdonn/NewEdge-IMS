"use client";

import { useState } from "react";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthRegister from "../auth/AuthRegister";

const Register2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const imageSrc = "/images/logos/Logo.png";  // You can change this logo if needed

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
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
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
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Horizontally center the items
                  justifyContent: "center", // Vertically center the items
                  height: "100%", // Ensure the container takes the full height of the parent
                }}
              >
                <Box mb={1}>
                  <img
                    src={imageSrc}
                    alt="Sidebar Logo"
                    style={{
                      width: "185px", // Adjust width as needed
                      height: "50px", // Adjust height as needed
                      justifyContent: "center",
                    }}
                  />
                </Box>
              </div>
              <form>
                <AuthRegister
                  username={username}
                  password={password}
                  confirmPassword={confirmPassword}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  setConfirmPassword={setConfirmPassword}
                  handleSubmit={() => {}}
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

export default Register2;
