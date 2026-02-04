import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DoctorListPopup from '../popup/DoctorListPopup'
import { Button } from '@mui/material'
import { PrimaryColor, PrimaryThemeColor } from '../../utils/constant';
import { createDoctorServiceByServiceId } from '../../providers/create'

const DoctorsPopup = ({ open, handleClose, id }) => {
    const [loadList, setLoadList] = useState(false);
    const [actions, setActions] = useState({
        selected: [],
        unselected: [],
    })

    const handleSave = async () => {
        await createDoctorServiceByServiceId({
            service_id: id,
            selected_doctor_ids: actions.selected,
            unselected_doctor_ids: actions.unselected
        });
        setActions({
            selected: [],
            unselected: [],
        });
        setLoadList(true)
    };
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
    >  
        <DialogTitle>Medical personnel</DialogTitle>
        <DialogContent >
            <DoctorListPopup loadList={loadList} setLoadList={setLoadList} id={id} setActions={setActions}/>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" sx={{ textTransform: 'none', ...PrimaryThemeColor }} onClick={handleSave}>Save</Button>
            <Button variant='outlined' sx={{ borderColor: PrimaryColor, color: PrimaryColor }} onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DoctorsPopup