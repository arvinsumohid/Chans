import React from 'react'
import { Box } from '@mui/material'
import RegistrationForm from '../../components/forms/RegistrationForm'

const RegisterPage = () => {
  return (
    <Box sx={{ maxWidth: '720px', margin: '0 auto' }}>
        <Box sx={{ maxWidth: '720px', margin: '0 auto' }}>
            <RegistrationForm />
        </Box>
    </Box>
  )
}

export default RegisterPage