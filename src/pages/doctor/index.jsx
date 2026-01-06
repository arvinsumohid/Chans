import { useState } from 'react'
import { Box, Button } from '@mui/material'
import ProtectedRoute from '../../routes/ProtectedRoute'
import DoctorsList from '../../components/tables/DoctorsList'
import DoctorForm from '../../components/forms/DoctorForm'
import { PrimaryThemeColor } from '../../utils/constant'
import { LoadListProvider } from '../../contexts/LoadListContext';

const DoctorPage = () => {
  const [isAddDoctor, setIsAddDoctor] = useState(false);
  const [loadList, setLoadList] = useState(false);
  return (
    <LoadListProvider>
      <Box className="flex flex-col gap-4">
        <DoctorsList loadList={loadList} setLoadList={setLoadList} />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ textTransform: 'none', ...PrimaryThemeColor }} onClick={() => setIsAddDoctor(true)}>Add medical personnel</Button>
        </Box>
        {isAddDoctor && <DoctorForm setLoadList={setLoadList} onClose={() => setIsAddDoctor(false)} />}
      </Box>
    </LoadListProvider>
  )
}

const ProtectedDoctorPage = ProtectedRoute(DoctorPage);
export default ProtectedDoctorPage