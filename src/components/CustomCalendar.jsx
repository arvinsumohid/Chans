import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const CustomCalendar = ({ onChange, label, name, errors, value }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs}>
      <DatePicker
        format="DD/MM/YYYY"
        label={label}
        name={name}
        onChange={onChange}
        value={value ? dayjs(value) : null}
        minDate={dayjs()}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            error: !!errors?.[name],
            helperText: errors?.[name] || '',
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomCalendar;