import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AppointmentForm from '../forms/AppointmentForm'
import { Button } from '@mui/material'

const AppointmentPopup = ({ open, setLoadList, handleClose }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >  
            <DialogTitle>Appointment</DialogTitle>
            <DialogContent >
                <AppointmentForm isPopup={true} onClose={handleClose} setLoadList={setLoadList}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AppointmentPopup