import { Box, Typography } from '@mui/material'
import { lazy } from 'react'

const ActivityLog = lazy(() => import('../../components/tables/ActivityLog'));

const UserActivity = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2" sx={{ fontSize: '28px' }}>Activity History</Typography>
      <ActivityLog eventType="appointment" userType="user" />
    </Box>
  )
}

export default UserActivity