import { useState } from 'react'
import { Box, Button } from '@mui/material'
import ProtectedRoute from '../../routes/ProtectedRoute'
import ServiceList from '../../components/tables/ServiceList'
import ServiceForm from '../../components/forms/ServiceForm'

const ServicePage = () => {
  const [isAddService, setIsAddService] = useState(false);
  const [loadList, setLoadList] = useState(false);
  return (
    <Box className="flex flex-col gap-4">
      <ServiceList loadList={loadList} setLoadList={setLoadList} />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => setIsAddService(true)}>Add Service</Button>
      </Box>
      {isAddService && <ServiceForm setLoadList={setLoadList} onClose={() => setIsAddService(false)} />}
    </Box>
  )
}

const ProtectedServicePage = ProtectedRoute(ServicePage);
export default ProtectedServicePage