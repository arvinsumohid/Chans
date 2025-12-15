import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, TextField, debounce } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { useAlert } from '../../hooks/useAlert';
import { getDoctors } from '../../providers/list';
import { createDoctorService } from '../../providers/create';
import { deleteDoctorService } from '../../providers/delete';
import { PrimaryColor, PrimaryThemeColor } from '../../utils/constant';

const DoctorListPopup = ({ loadList, setLoadList, id }) => {
    const { showAlert } = useAlert();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const columns = [
        { flex: 1, field: 'fullname', headerName: 'Full name', renderCell: (params) => {
            return <span className="capitalize">{params.row.lastname}, {params.row.firstname}</span>;
        }},
        { flex: 1, field: 'description', headerName: 'Description' },
        { flex: 1, field: 'is_active', headerName: 'Status', renderCell: (params) => params.row.is_active ? 'Yes' : 'No' },
        { flex: 1, field: 'actions', headerName: 'Actions', renderCell: (params) => {
            const matches = params.row.doctor_services.some(
                (ds) => ds.service_id === id
            );

            if (matches) {
                return (
                    <Box>
                        <Button color="error" variant="contained" sx={{ textTransform: 'none' }} size="small" onClick={() => handleUnselectDoctor(params)}>Remove</Button>
                    </Box>
                )
            }
            return (
                <Box>
                    <Button color="success" variant="contained" sx={{ textTransform: 'none', ...PrimaryThemeColor }} size="small" onClick={() => handleSelectDoctor(params)}>Select</Button>
                </Box>
            )
        }},
    ];

    const handleSelectDoctor = async (params) => {
        const doctorServiceData = {
            service_ids: [id],
            doctor_id: params.row.id
        };
        await createDoctorService(doctorServiceData);
        setLoadList(true);
    }

    const handleUnselectDoctor = async (params) => {
        const doctorServiceData = {
            service_id: id,
            doctor_id: params.row.id
        };
        await deleteDoctorService(doctorServiceData);
        setLoadList(true);
    }

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const response = await getDoctors({ 
                    page: paginationModel.page + 1,
                    size: paginationModel.pageSize,
                    search
                });
                setDoctors(response.data.data.items || []);
                setTotalItem(response.data.data.total_item || 0);
                setLoadList(false);
            } catch (err) {
                showAlert(err.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();       
    }, [paginationModel.page, paginationModel.pageSize, loadList, search]);

    const handleSearch = debounce((e) => {
        setSearch(e.target.value);
    }, 500);

    return (
        <>
            <Box className="mb-2">
                <Typography variant="h6">
                    Medical professionals
                </Typography>
            </Box>
            <Box className="mb-2">
                <TextField label="Search" variant="outlined" onChange={handleSearch} size="small" />
            </Box>
            <Paper sx={{ width: '100%' }}>
                <DataGrid
                    disableColumnSorting
                    disableColumnMenu
                    rows={doctors}
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

export default DoctorListPopup;
