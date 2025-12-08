import { Box } from '@mui/material'
import { lazy } from 'react'

const AnnouncementList = lazy(() => import('../../components/tables/AnnouncementList'));

const AnnouncementLog = () => {
  return (
    <Box sx={{ p: 2 }}>
      <AnnouncementList userType="admin" />
    </Box>
  )
}

export default AnnouncementLog