import { useState } from 'react'
import { Box, Button } from '@mui/material'
import ProtectedRoute from '../../routes/ProtectedRoute'
import DoctorsList from '../../components/tables/DoctorsList'
import DoctorForm from '../../components/forms/DoctorForm'

const DoctorPage = () => {
  const [isAddDoctor, setIsAddDoctor] = useState(false);
  const [loadList, setLoadList] = useState(false);
  return (
    <Box className="flex flex-col gap-4">
      <DoctorsList loadList={loadList} setLoadList={setLoadList} />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => setIsAddDoctor(true)}>Add Doctor</Button>
      </Box>
      {isAddDoctor && <DoctorForm setLoadList={setLoadList} onClose={() => setIsAddDoctor(false)} />}
    </Box>
  )
}

const ProtectedDoctorPage = ProtectedRoute(DoctorPage);
export default ProtectedDoctorPage