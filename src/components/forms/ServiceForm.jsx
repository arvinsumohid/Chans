import React, { useState } from 'react'
import { createService } from '../../providers/create';
import { useAlert } from '../../hooks/useAlert';
import { Card, TextField, Button, Box, Typography } from '@mui/material'

const ServiceForm = ({ onClose, setLoadList, isPopup = false }) => {
    const { showAlert } = useAlert();
    const [errors, setErrors] = useState({});
    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
        is_active: true,
    });

    const handleChange = (e) => {
        setServiceData({
            ...serviceData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        await createService(serviceData);
        !isPopup && onClose();
        setLoadList(true);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!serviceData.name.trim()) newErrors.name = 'Name is required';
        if (!serviceData.description.trim()) newErrors.description = 'Description is required';
        
        setErrors(newErrors);
        showAlert(Object.keys(newErrors).length === 0 ? 'Service added successfully' : 'Please fill all required fields', Object.keys(newErrors).length === 0 ? 'success' : 'error');
        return Object.keys(newErrors).length === 0;
    };
  return (
    <Card variant="outlined" className="max-w-[600px] p-4" component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
            Add Service
        </Typography>
        <Box className="flex flex-col gap-4">
            <TextField
                fullWidth
                label="Name"
                name="name"
                value={serviceData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
            />
            <TextField
                multiline
                rows={3}
                fullWidth
                label="Description"
                name="description"
                value={serviceData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                required
            />
            </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" type="submit">Save</Button>
            {!isPopup && <Button variant="outlined" onClick={onClose}>Cancel</Button>}
        </Box>
    </Card>
  )
}

export default ServiceForm