import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, List, ListItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { useAlert } from '../../hooks/useAlert';
import { getServices } from '../../providers/list';
import ActionButtons from '../../pages/service/ActionButtons';

const ServiceList = ({ loadList, setLoadList }) => {
    const { showAlert } = useAlert();   
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
        {
            flex: 1,
            field: 'doctor_services',
            headerName: 'Doctors',
            sortable: false,
            renderCell: (params) => {
                const services = params.row.doctor_services || [];

                if (!services.length) return <span className="text-red-500 capitalize">No doctors</span>;
                return (
                    <List sx={{ padding: 0 }}>
                        {services.map((service) => (
                            <ListItem key={service.doctor.id} sx={{ padding: '4px 0' }}>
                                <span className="capitalize">— {service.doctor?.lastname}, {service.doctor?.firstname}</span>
                            </ListItem>
                        ))}
                    </List>
                );
            },
        },
        { flex: 1, field: 'is_active', headerName: 'Status', renderCell: (params) => params.row.is_active ? 'Yes' : 'No' },
        { flex: 1, field: 'actions', headerName: 'Actions', renderCell: (params) => (
            <ActionButtons id={params.row.id}  setLoadList={setLoadList}/>
        )},
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const response = await getServices({ 
                    page: paginationModel.page + 1,
                    size: paginationModel.pageSize 
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

        fetchDoctors();       
    }, [paginationModel.page, paginationModel.pageSize, loadList]);

    return (
        <>
            <Box>
                <Typography variant="h6">
                    Services
                </Typography>
            </Box>
            <Paper sx={{ width: '100%' }}>
                <DataGrid
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

export default ServiceList