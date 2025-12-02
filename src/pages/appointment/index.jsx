import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import EventCalendar from '../../components/EventCalendar'
import ProtectedRoute from '../../routes/ProtectedRoute'
import AppointmentPopup from '../../components/popup/AppointmentPopup'
import { getEventByCalendar } from '../../providers/list'
import { getCookie } from '../../utils/cookieHelper'
import { useEventCalendar } from '../../hooks/useEventCalendar';

const AppointmentPage = () => {
  const { loadList, setLoadList, appointments, fetchEventsForMonth } = useEventCalendar(getEventByCalendar);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="flex flex-col gap-4">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2 }}>
            <Typography variant="h6">My Appointments</Typography>
            {getCookie('user_role') === 'user' && (
              <Button variant="contained" color="primary" onClick={handleOpen}>Add Appointment</Button>
            )}
        </Box>
        <EventCalendar loadList={loadList} events={appointments} fetchEventsForMonth={fetchEventsForMonth}/>
        <AppointmentPopup open={open} setLoadList={setLoadList} handleClose={handleClose} />
    </Box>
  )
}

const ProtectedAppointmentPage = ProtectedRoute(AppointmentPage);
export default ProtectedAppointmentPage