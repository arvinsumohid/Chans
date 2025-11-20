import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ServiceForm from '../forms/ServiceForm'
import ServiceListPopup from '../tables/ServiceListPopup'
import { Button } from '@mui/material'

const ServicesPopup = ({ open, handleClose, id }) => {
    const [loadList, setLoadList] = useState(false);
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
    >  
        <DialogTitle>Services</DialogTitle>
        <DialogContent >
            <ServiceForm setLoadList={setLoadList} isPopup={true}/>
            <ServiceListPopup loadList={loadList} setLoadList={setLoadList} id={id}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ServicesPopup