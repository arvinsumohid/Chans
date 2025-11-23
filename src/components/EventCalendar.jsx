import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useMemo} from "react";
import { Box } from "@mui/material";

const EventCalendar = ({ events, fetchEventsForMonth }) => {
  const appointmentData = useMemo(() => {

    return events.map((appointment) => {
      if (!appointment) return null;

      if (appointment.user) {
        return {
          id: appointment.id,
          title: `Dr. ${appointment.doctor_service.doctor.lastname} – ${appointment.user.gender === "male" ? "Mr." : "Ms."} ${appointment.user.lastname} Appointment`,
          event_type: "appointment",
          start_date: appointment.appointment_date,
          color: "green"
        }
      }

      return {
        id: appointment.id,
        title: `${appointment.doctor_service.service.name} Appointment – Dr. ${appointment.doctor_service.doctor.lastname}`,
        event_type: "appointment",
        start_date: appointment.appointment_date,
        color: "green"
      }
    })
  },[events])

  // const [filterType, setFilterType] = useState("all");
  // const [filterBarangay, setFilterBarangay] = useState("all");

  // // Filter events based on type and barangay
  // const filtered = events.filter((evt) => {
  //   return (
  //     (filterType === "all" || evt.event_type === filterType) &&
  //     (filterBarangay === "all" || evt.barangay === filterBarangay)
  //   );
  // });

  return (
    <Box sx={{ p: 2 }}>
      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={appointmentData.map((evt) => ({
          title: evt.title,
          date: evt.start_date,
          color: evt.color,
        }))}
        // events={filtered.map((evt) => ({
        //   title: evt.title,
        //   date: evt.start_date,
        //   color: evt.color,
        // }))}
        datesSet={(info) => {
          const from = info.start;
          const to = info.end;

          fetchEventsForMonth(from, to);
        }}
        eventContent={(arg) => {
          return (
            <span
              className='capitalize'
              title={arg.event.title}
            >{arg.event.title}</span>
          )
        }}
      />
    </Box>
  );
}

export default EventCalendar;