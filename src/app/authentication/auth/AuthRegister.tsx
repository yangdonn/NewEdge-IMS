import React, { useState, ChangeEvent } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    // State to store user input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setSuccess(true);
            setError('');
            setName('');
            setEmail('');
            setPassword('');
        } catch (err: any) {
            setError(err.message);
            setSuccess(false);
        }
    };

    return (
        <>
            {title ? <Typography fontWeight="700" variant="h2" mb={1}>{title}</Typography> : null}
            {subtext}

            <Box component="form" onSubmit={handleSubmit}>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">Name</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth value={name} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={email} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">Password</Typography>
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth value={password} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </Stack>

                {error && <Typography color="error" mb={2}>{error}</Typography>}
                {success && <Typography color="green" mb={2}>Registration successful! Redirecting...</Typography>}

                <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                    Sign Up
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
