import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DoctorForm from '../forms/DoctorForm'
import DoctorListPopup from '../popup/DoctorListPopup'
import { Button } from '@mui/material'
import { PrimaryColor } from '../../utils/constant';

const DoctorsPopup = ({ open, handleClose, id }) => {
    const [loadList, setLoadList] = useState(false);
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
    >  
        <DialogTitle>Medical personnel</DialogTitle>
        <DialogContent >
            <DoctorListPopup loadList={loadList} setLoadList={setLoadList} id={id}/>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' sx={{ borderColor: PrimaryColor, color: PrimaryColor }} onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DoctorsPopup