import { Box, Typography } from '@mui/material'
import { lazy } from 'react'

const ActivityLog = lazy(() => import('../../components/tables/ActivityLog'));

const AdminActivityLog = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2" sx={{ fontSize: '28px' }}>Appointments</Typography>
      <ActivityLog eventType="appointment" userType="admin" />
    </Box>
  )
}

export default AdminActivityLog