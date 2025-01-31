import React from "react";
import { Box, Button, TextField } from "@mui/material";

interface AuthLoginProps {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  subtitle?: React.ReactNode;
}

const AuthLogin = ({
  username,
  password,
  setUsername,
  setPassword,
  handleSubmit,
  subtitle,
}: AuthLoginProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Sign In
      </Button>
      {subtitle}
    </Box>
  );
};

export default AuthLogin;
