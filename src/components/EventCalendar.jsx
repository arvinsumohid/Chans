import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useMemo} from "react";
import { Box, Typography } from "@mui/material";
import { getCookie } from "../utils/cookieHelper";
import { TertiaryThemeColor, AnnouncementColor } from "../utils/constant";

const EventCalendar = ({ events, fetchEventsForMonth, eventType = 'appointment' }) => {
  const appointmentData = useMemo(() => {
    return events.map((appointment) => {
      if (!appointment) return null;
      
      let color = TertiaryThemeColor.backgroundColor;
      let title = `${appointment.service_name} Appointment – Dr. ${appointment.doctor_lastname}`;

      if (appointment.entity_type === 'event') {
        color = AnnouncementColor
        title = appointment.announcement_name
      }

      if (getCookie('user_role') === 'admin' && appointment.entity_type !== 'event') {
        title = `Dr. ${appointment.doctor_lastname} Appointment to ${appointment.user_gender === "male" ? "Mr." : "Ms."} ${appointment.user_lastname}`;
      }

      return {
        id: appointment.event_id,
        title,
        event_type: appointment.entity_type,
        start_date: appointment.event_date,
        color
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
        dayMaxEvents={3}
        events={appointmentData.map((evt) => ({
          title: evt.title,
          start: evt.start_date,
          backgroundColor: evt.color,
        }))}
        datesSet={(info) => {
          const from = info.start;
          const to = info.end;

          fetchEventsForMonth(from, to, eventType);
        }}
        eventContent={(arg) => {
          return (
            <Typography
              variant="body2"
              sx={{ backgroundColor: arg.event.backgroundColor }}
              className={`capitalize w-full overflow-hidden text-white`}
              title={arg.event.title}
            >{arg.event.title}</Typography>
          )
        }}
      />
    </Box>
  );
}

export default EventCalendar;