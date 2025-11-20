import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import EventCalendar from '../../components/EventCalendar'
import ProtectedRoute from '../../routes/ProtectedRoute'
import AppointmentPopup from '../../components/popup/AppointmentPopup'

const AppointmentPage = () => {
    const [open, setOpen] = useState(false);
    const [loadList, setLoadList] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <Box className="flex flex-col gap-4">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2 }}>
            <Typography variant="h6">My Appointments</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>Add Appointment</Button>
        </Box>
        <EventCalendar loadList={loadList}/>
        <AppointmentPopup open={open} setLoadList={setLoadList} handleClose={handleClose} />
    </Box>
  )
}

const ProtectedAppointmentPage = ProtectedRoute(AppointmentPage);
export default ProtectedAppointmentPage