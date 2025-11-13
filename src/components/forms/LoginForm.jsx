import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { useAlert } from '../../hooks/useAlert';
import { login } from '../../providers/auth';

const LoginForm = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState({
        username: false,
        password: false,
    });

    const validateForm = () => {
        let isValid = true;
        if (!loginData.username) {
            setError({ ...error, username: true });
            isValid = false;
        }
        if (!loginData.password) {
            setError({ ...error, password: true });
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            login(loginData.username, loginData.password).then((res) => {
                showAlert(res.message, 'success');
                navigate('/');
            }).catch((error) => {
                showAlert(error.message, 'error');
            });
        }
    };

  return (
    <Box component="form" onSubmit={handleSubmit}>
        <Box className="text-center">
            <Typography sx={{ fontSize: '2rem', fontWeight: '500' }} variant="h1">Log In</Typography>
            <Typography sx={{ fontSize: '1rem' }} variant="body1">Welcome back! Please enter your details</Typography>
        </Box>
        <Box>
            <TextField
                error={error.username}
                helperText={error.username ? 'Please enter a valid username' : ''}
                label="Username"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <TextField
                error={error.password}
                helperText={error.password ? 'Please enter a valid password' : ''}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
        </Box>
        {/* <Link sx={{ textDecoration: 'none' }} href="/register">forgot password?</Link> */}
        <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
        >
            Login
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body1">Don't have an account? <Link sx={{ textDecoration: 'none', fontWeight: 'bold' }} href="/register">Sign Up</Link></Typography>
        </Box>
    </Box>
  )
}

export default LoginForm