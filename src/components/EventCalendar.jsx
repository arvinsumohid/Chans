import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";

export default function EventCalendar() {
  // Temporary sample events
  const sampleEvents = [
    {
      id: 1,
      title: "Vaccination Drive",
      event_type: "vaccination",
      barangay: "Poblacion",
      start_date: "2025-11-25",
      color: "green",
    },
    {
      id: 2,
      title: "Medical Mission",
      event_type: "medical_mission",
      barangay: "Balintawak",
      start_date: "2025-11-27",
      color: "blue",
    },
    {
      id: 3,
      title: "Emergency Alert",
      event_type: "emergency",
      barangay: "San Vicente",
      start_date: "2025-11-23",
      color: "red",
    },
    {
      id: 4,
      title: "Free Check-Up",
      event_type: "checkup",
      barangay: "Poblacion",
      start_date: "2025-11-30",
      color: "yellow",
    },
    {
      id: 5,
      title: "Community Health Seminar",
      event_type: "medical_mission",
      barangay: "San Vicente",
      start_date: "2025-12-02",
      color: "blue",
    },
  ];

  const [events] = useState(sampleEvents);
  const [filterType, setFilterType] = useState("all");
  const [filterBarangay, setFilterBarangay] = useState("all");

  // Filter events based on type and barangay
  const filtered = events.filter((evt) => {
    return (
      (filterType === "all" || evt.event_type === filterType) &&
      (filterBarangay === "all" || evt.barangay === filterBarangay)
    );
  });

  return (
    <Box sx={{ p: 2 }}>
      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={filtered.map((evt) => ({
          title: evt.title,
          date: evt.start_date,
          color: evt.color,
        }))}
      />
    </Box>
  );
}