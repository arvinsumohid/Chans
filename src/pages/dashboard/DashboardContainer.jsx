import React, { useState, lazy } from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import { useEventCalendar } from '../../hooks/useEventCalendar';
import { getEventByCalendar } from '../../providers/list'
import EventCalendar from '../../components/EventCalendar'
import AppointmentPopup from '../../components/popup/AppointmentPopup'
import { getCookie } from '../../utils/cookieHelper'

const AdminActivityLog = lazy(() => import('./AdminActivityLog'));
const UserActivityLog = lazy(() => import('./UserActivityLog'));

const DashboardContainer = () => {
  const { loadList, setLoadList, appointments, fetchEventsForMonth} = useEventCalendar(getEventByCalendar, 'event');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const role = getCookie('user_role');

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box className="gap-4" sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2 }}>
              <Typography variant="h1" sx={{ fontSize: '28px' }}>Upcoming Events</Typography>
              {role === 'admin' && <Button variant="contained" color="primary" onClick={handleOpen}>Add Event</Button>}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Box className="flex flex-col gap-4">
              <EventCalendar eventType="event" loadList={loadList} events={appointments} fetchEventsForMonth={fetchEventsForMonth}/>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Box className="flex flex-col gap-4">
            {role === 'admin' ? <AdminActivityLog /> : <UserActivityLog />}
          </Box>
        </Grid>
      </Grid>
      <AppointmentPopup title="Event" open={open} setLoadList={setLoadList} handleClose={handleClose} />
    </>
  )
}

export default DashboardContainer