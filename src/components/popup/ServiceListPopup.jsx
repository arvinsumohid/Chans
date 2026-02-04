import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, TextField, debounce, Checkbox } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { useAlert } from '../../hooks/useAlert';
import { getServices } from '../../providers/list';

const ServiceListPopup = ({ loadList, setLoadList, id, setActions }) => {
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

            return <Checkbox key={params.row.id + search} onChange={(value) => handleCheckboxChange(params, value)} defaultChecked={matches} />
        }},
    ];

    const handleCheckboxChange = (params, value) => {
        const isChecked = value.target.checked
        if (isChecked) {
            setActions((v) => {
                const newSelected = [...new Set([...v.selected, params.row.id])];
                const newUnselected = v.unselected.filter(id => id !== params.row.id);
                return {...v, selected: newSelected, unselected: newUnselected}
            })
        } else {
            setActions((v) => {
                const newUnselected = [...new Set([...v.unselected, params.row.id])];
                const newSelected = v.selected.filter(id => id !== params.row.id);
                return {...v, selected: newSelected, unselected: newUnselected}
            })
        }
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                setServices([]);
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

    useEffect(() => {
        setActions({
            selected: [],
            unselected: [],
        });
    }, [paginationModel.page, search]);

    const handleSearch = debounce((e) => {
        setSearch(e.target.value);
    }, 500);

    return (
        <>
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