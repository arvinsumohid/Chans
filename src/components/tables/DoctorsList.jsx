import React, { useEffect } from 'react'
import { Box, List, ListItem, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { getDoctors } from '../../providers/list';
import { useAlert } from '../../hooks/useAlert';
import ActionButtons from '../../pages/doctor/ActionButtons';

const DoctorsList = ({ loadList, setLoadList }) => {
    const { showAlert } = useAlert();
    const [loading, setLoading] = React.useState(false);
    const [doctors, setDoctors] = React.useState([]);
    const [totalItem, setTotalItem] = React.useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    const columns = [
        { flex: 1, field: 'fullname', headerName: 'Full name', renderCell: (params) => {
            return <Typography className="capitalize" variant="body2">{params.row.lastname}, {params.row.firstname}</Typography>;
        }},
        { flex: 1, field: 'description', headerName: 'Description' },
        {
            flex: 1,
            field: 'doctor_services',
            headerName: 'Services',
            sortable: false,
            renderCell: (params) => {
                const services = params.row.doctor_services || [];

                if (!services.length) return <span className="text-red-500 capitalize">No services</span>;
                return (
                    <List sx={{ padding: 0 }}>
                        {services.map((service) => (
                            <ListItem key={service.service.id} sx={{ padding: '4px 0' }}>
                                <span className="capitalize">— {service.service?.name}</span>
                            </ListItem>
                        ))}
                    </List>
                );
            },
        },
        { flex: 1, field: 'is_active', headerName: 'Status', renderCell: (params) => params.row.is_active ? 'Yes' : 'No' },
        { flex: 1, field: 'actions', headerName: 'Actions', renderCell: (params) => (
            <ActionButtons id={params.row.id} setLoadList={setLoadList} />
        )},
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const response = await getDoctors({ 
                    page: paginationModel.page + 1, // API might be 1-indexed
                    size: paginationModel.pageSize 
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
    }, [paginationModel.page, paginationModel.pageSize, loadList]);

    return (
        <>
            <Box>
                <Typography variant="h6">
                    Doctors
                </Typography>
            </Box>
            <Paper sx={{ width: '100%' }}>
                <DataGrid
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

export default DoctorsList