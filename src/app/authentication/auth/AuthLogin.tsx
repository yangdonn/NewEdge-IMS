import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface AuthLoginProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errorMessage?: string;
  subtitle?: React.ReactNode;
  isLoading?: boolean; // Add loading state
}

const AuthLogin: React.FC<AuthLoginProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  errorMessage,
  subtitle,
  isLoading = false, // Default to false
}) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {errorMessage && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {errorMessage}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        autoComplete="email"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        autoComplete="current-password"
      />
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        sx={{ mt: 2 }}
        disabled={isLoading} // Disable when loading
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
      {subtitle}
    </Box>
  );
};

export default AuthLogin;
