import { Card, Typography, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useAlert } from "../../hooks/useAlert";
import { getCookie } from "../../utils/cookieHelper";
import { createEvent } from "../../providers/create";
import CustomCalendar from "../CustomCalendar";
import dayjs from 'dayjs';

const AnnouncementForm = ({ onClose, setLoadList, isPopup = false, title = 'Announcement' }) => {
    const { showAlert } = useAlert();
    const [announcementData, setAnnouncementData] = useState({
        name: null,
        description: null,
        event_date: null,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!announcementData.name || !announcementData.description) {
      showAlert("Please enter both name and description", 'error');
      return;
    }
    if (!announcementData.event_date) {
      showAlert("Please select a date", 'error');
      return;
    }

    if (announcementData.event_date.isBefore(dayjs())) {
      showAlert("Please select a date in the future", 'error');
      return;
    }

    try {
        const data = {
            user_id: getCookie( 'user_id'),
            name: announcementData.name,
            description: announcementData.description,
            event_date: announcementData.event_date,
            type: 'event'
        }
      await createEvent(data);
      !isPopup && onClose();
      setLoadList(true);
      setAnnouncementData({
        name: null,
        description: null,
        event_date: null,
      });
      onClose();
      showAlert(`${title} added successfully`, 'success');
    } catch (err) {
      showAlert(err.message, 'error');
    }
  };

  return (
    <Card
      variant="outlined"
      className="max-w-[600px] p-4"
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" gutterBottom>
        Add {title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>

        <TextField
            fullWidth
            label="Title"
            name="name"
            type="text"
            value={announcementData.name}
            onChange={(e) => setAnnouncementData((prev) => ({ ...prev, name: e.target.value }))}
            margin="normal"
            required
        />
        <TextField
            fullWidth
            label="Description (Optional)"
            name="description"
            value={announcementData.description}
            onChange={(e) => setAnnouncementData((prev) => ({ ...prev, description: e.target.value }))}
            margin="normal"
            multiline
            required
            rows={3}
        />
        <CustomCalendar
          value={announcementData.event_date}
          onChange={(newValue) => setAnnouncementData((prev) => ({ ...prev, event_date: newValue }))}
          label="Date"
          name="event_date"
          errors={[]}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" type="submit">
          Save
        </Button>
        {!isPopup && <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>}
      </Box>
    </Card>
  );
};

export default AnnouncementForm;
