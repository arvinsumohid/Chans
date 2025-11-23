import { Card, Typography, Autocomplete, TextField, Button, Box } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { getServices } from "../../providers/list";
import { useAlert } from "../../hooks/useAlert";
import { getDoctorServicesByServiceId } from "../../providers/detail";
import { getCookie } from "../../utils/cookieHelper";
import { createAppointment } from "../../providers/create";
import CustomCalendar from "../CustomCalendar";
import dayjs from 'dayjs';

const AppointmentForm = ({ onClose, setLoadList, isPopup = false }) => {
    const { showAlert } = useAlert();
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [appointmentData, setAppointmentData] = useState({
        doctor: null,
        service: null,
        appointment_date: null,
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices({ 
                    page: 1, // API might be 1-indexed
                    size: 999 
                });
                setServices(response.data.data.items || []);
            } catch (err) {
                showAlert(err.message, 'error');
            }
        };

        fetchServices();       
    }, []);

  const doctorsList = useMemo(() => {
    return doctors.map((doctor) => ({
      label: doctor.doctor.lastname + ", " + doctor.doctor.firstname,
      id: doctor.doctor.id,
    }));
  }, [doctors]);

  const servicesList = useMemo(() => {
    if (!services) return [];

    const sList = services.map((service) => {
        if (!service) return null;
      return {
        label: service.name,
        id: service.id,
      };
    });

    return sList.filter((service) => service !== null);
  }, [services]);

  const handleServiceChange = async (event, newValue) => {
    const doctors = await getDoctorServicesByServiceId(newValue.id);
    setAppointmentData((prev) => ({ ...prev, service: newValue, doctor: null }));
    setDoctors(doctors.data.data || []);
  };

  const handleDoctorChange = async (event, newValue) => {
    setAppointmentData((prev) => ({ ...prev, doctor: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentData.doctor || !appointmentData.service) {
      showAlert("Please select both doctor and service", 'error');
      return;
    }
    if (!appointmentData.appointment_date) {
      showAlert("Please select a date", 'error');
      return;
    }

    if (appointmentData.appointment_date.isBefore(dayjs())) {
      showAlert("Please select a date in the future", 'error');
      return;
    }

    try {
        const data = {
            user_id: getCookie( 'user_id'),
            doctor_id: appointmentData.doctor.id,
            service_id: appointmentData.service.id,
            appointment_date: appointmentData.appointment_date,
        }
      await createAppointment(data);
      !isPopup && onClose();
      setLoadList(true);
      setAppointmentData({
        doctor: null,
        service: null,
        appointment_date: null,
      });
      onClose();
      showAlert("Appointment added successfully", 'success');
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
        Add Appointment
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
        <Autocomplete
          fullWidth
          options={servicesList}
          value={appointmentData.service}
          onChange={handleServiceChange}
          renderInput={(params) => <TextField {...params} label="Service" />}
        />
        <Autocomplete
          fullWidth
          options={doctorsList}
          value={appointmentData.doctor}
          onChange={handleDoctorChange}
          renderInput={(params) => <TextField {...params} label="Doctor" />}
        />
        <CustomCalendar
          value={appointmentData.appointment_date}
          onChange={(newValue) => setAppointmentData((prev) => ({ ...prev, appointment_date: newValue }))}
          label="Date"
          name="appointment_date"
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

export default AppointmentForm;
