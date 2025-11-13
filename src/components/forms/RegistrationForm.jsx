import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  MenuItem, 
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { register } from '../../providers/create';
import { useAlert } from '../../hooks/useAlert';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    birthDate: null,
    gender: '',
    phoneNumber: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Format the data to match the API expected format
      const userData = {
        username: formData.username,
        password: formData.password,
        firstname: formData.firstName,
        middlename: formData.middleName || '',
        lastname: formData.lastName,
        email_address: formData.email,
        birthdate: formData.birthDate ? formData.birthDate.toISOString().split('T')[0] : '',
        gender: formData.gender,
        phone_number: formData.phoneNumber,
        description: formData.description || '',
      };

      const response = await register(userData);
      
      showAlert('Successfully registered!', 'success');
      navigate('/login');
    } catch (error) {
      showAlert(error.message || 'Registration failed. Please try again.', 'error');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 720, mx: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Create an Account
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />
          <TextField
            fullWidth
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            required
          />
        </Box>

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          error={!!errors.username}
          helperText={errors.username}
          required
        />

        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            required
          />
        </Box>

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
          required
        />

        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Birth Date"
              value={formData.birthDate}
              onChange={(date) => 
                setFormData({ ...formData, birthDate: date })
              }
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  error={!!errors.birthDate}
                  helperText={errors.birthDate}
                  required
                />
              )}
            />
          </LocalizationProvider>
          
          <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            error={!!errors.gender}
            helperText={errors.gender}
            required
          >
            {GENDER_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          margin="normal"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          required
        />

        <TextField
          fullWidth
          label="Description (Optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default RegistrationForm;