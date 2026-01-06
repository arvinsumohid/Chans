import { useState } from 'react'
import { Box, Button } from '@mui/material'
import ProtectedRoute from '../../routes/ProtectedRoute'
import ServiceList from '../../components/tables/ServiceList'
import ServiceForm from '../../components/forms/ServiceForm'
import { LoadListProvider } from '../../contexts/LoadListContext';
import { PrimaryThemeColor } from '../../utils/constant'

const ServicePage = () => {
  const [isAddService, setIsAddService] = useState(false);
  const [loadList, setLoadList] = useState(false);
  return (
    <LoadListProvider>
      <Box className="flex flex-col gap-4">
        <ServiceList loadList={loadList} setLoadList={setLoadList} />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ textTransform: 'none', ...PrimaryThemeColor }} onClick={() => setIsAddService(true)}>Add Service</Button>
        </Box>
        {isAddService && <ServiceForm setLoadList={setLoadList} onClose={() => setIsAddService(false)} />}
      </Box>
    </LoadListProvider>
  )
}

const ProtectedServicePage = ProtectedRoute(ServicePage);
export default ProtectedServicePage