import { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import EventCalendar from '../../components/EventCalendar'
import ProtectedRoute from '../../routes/ProtectedRoute'
import AppointmentPopup from '../../components/popup/AppointmentPopup'
import { useAlert } from '../../hooks/useAlert';
import { getAppointmentByCalendar } from '../../providers/list'
import { getCookie } from '../../utils/cookieHelper'

const AppointmentPage = () => {
    const { showAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [loadList, setLoadList] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getMonthRange = () => {
      const from = new Date();
      from.setDate(1);

      const to = new Date();
      to.setMonth(to.getMonth() + 1);
      to.setDate(0);

      return { from, to };
    };
    const [dateFilter, setDateFilter] = useState(getMonthRange());

    useEffect(() => {
      const fetchAppointment = async () => {
        try {
          const response = await getAppointmentByCalendar({ from: dateFilter.from, to: dateFilter.to });
          setLoadList(false);

          setAppointments(response.data.data);
        } catch (error) {
          showAlert(error.message, 'error');
          setLoadList(false);
        }
      }

      fetchAppointment();
    }, [dateFilter, showAlert, loadList]);

    const fetchEventsForMonth = (from, to) => {
      setDateFilter({from, to});
    }
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