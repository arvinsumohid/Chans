import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, TextField, debounce } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { useAlert } from '../../hooks/useAlert';
import { getServices } from '../../providers/list';
import { createDoctorService } from '../../providers/create';
import { deleteDoctorService } from '../../providers/delete';
import { PrimaryThemeColor } from '../../utils/constant';

const ServiceListPopup = ({ loadList, setLoadList, id }) => {
    const { showAlert } = useAlert();   
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const columns = [
        { flex: 1, field: 'name', headerName: 'Name' },
        { flex: 1, field: 'description', headerName: 'Description' },
        { flex: 1, field: 'is_active', headerName: 'Status', renderCell: (params) => params.row.is_active ? 'Yes' : 'No' },
        { flex: 1, field: 'actions', headerName: 'Actions', renderCell: (params) => {
            const matches = params.row.doctor_services.some(
                (ds) => ds.doctor_id === id
            );

            if (matches) {
                return (
                    <Box>
                        <Button color="error" variant="contained" sx={{ textTransform: 'none' }} size="small" onClick={() => handleUnselectService(params)}>Selected</Button>
                    </Box>
                )
            }

            return (
                <Box>
                    <Button color="success" variant="contained" sx={{ textTransform: 'none', ...PrimaryThemeColor }} size="small" onClick={() => handleSelectService(params)}>Select</Button>
                </Box>
            )
        }},
    ];

    const handleSelectService = async (params) => {
        const doctorServiceData = {
            doctor_id: id,
            service_ids: [params.row.id]
        };
        await createDoctorService(doctorServiceData);
        setLoadList(true);
    }

    const handleUnselectService = async (params) => {
        const doctorServiceData = {
            doctor_id: id,
            service_id: params.row.id
        };
        await deleteDoctorService(doctorServiceData);
        setLoadList(true);
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await getServices({ 
                    page: paginationModel.page + 1,
                    size: paginationModel.pageSize,
                    search
                });
                setServices(response.data.data.items || []);
                setTotalItem(response.data.data.total_item || 0);
                setLoadList(false);
            } catch (err) {
                showAlert(err.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();       
    }, [paginationModel.page, paginationModel.pageSize, loadList, search]);
    

    const handleSearch = debounce((e) => {
        setSearch(e.target.value);
    }, 500);

    return (
        <>
            <Box className="mb-2">
                <Typography variant="h6">
                    Services
                </Typography>
            </Box>
            <Box className="mb-2">
                <TextField label="Search" variant="outlined" onChange={handleSearch} size="small" />
            </Box>
            <Paper sx={{ width: '100%' }}>
                <DataGrid
                    disableColumnSorting
                    disableColumnMenu
                    rows={services}
                    columns={columns}
                    getRowHeight={() => 'auto'}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                    sx={{ 
                        border: 0,
                        '& .MuiDataGrid-cell': {
                            padding: '8px 16px',
                            whiteSpace: 'normal',
                            lineHeight: '1.5'
                        }
                    }}
                    loading={loading}
                    paginationMode="server"
                    rowCount={totalItem}
                    disableRowSelectionOnClick
                />
            </Paper>
        </>
    )
}

export default ServiceListPopup