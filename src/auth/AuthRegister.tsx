import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface AuthRegisterProps {
  name: string;
  email: string;
  password: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  subtitle?: React.ReactNode;
}

const AuthRegister = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  handleSubmit,
  subtitle,
}: AuthRegisterProps) => {
  return (
    <Box>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
      {subtitle}
    </Box>
  );
};

export default AuthRegister; 