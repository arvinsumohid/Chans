import React from 'react'
import { Box, Button } from '@mui/material'
import DoctorsPopup from '../../components/popup/DoctorsPopup'

const ActionButtons = ({ id, setLoadList }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLoadList(true);
    };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button color="success" variant="contained" sx={{ textTransform: 'none' }} size="small" onClick={() => handleOpen(id)}>Add Doctors</Button>
      </Box>
      <DoctorsPopup open={open} handleClose={handleClose} id={id} />
    </>
  )
}

export default ActionButtons