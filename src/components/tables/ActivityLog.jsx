import { Activity, useContext, useEffect, useMemo, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { getEventList } from '../../providers/list'
import { useAlert } from '../../hooks/useAlert'
import { LoadListContext } from '../../contexts/LoadListContext';
import { getDate, getDateStatus } from '../../utils/util.helper';
import { AnnouncementColor, PrimaryColor, ViewColor } from '../../utils/constant';
import { Typography, Box, Button, Tooltip } from '@mui/material';
import ToolbarFilter from '../ToolbarFilter';
import EditAppointmentPopup from '../popup/EditAppointmentPopup';
import ViewAppointmentPopup from '../popup/ViewAppointmentPopup';
import { deleteAnnouncement } from '../../providers/delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ActivityLog = ({ eventType = 'appointment', userType = 'admin' }) => {
    const { showAlert } = useAlert();
    const {loadList, setLoadList} = useContext(LoadListContext);
    const [search, setSearch] = useState('');
    const [dateRange, setDateRange] = useState({})
    const [totalItem, setTotalItem] = useState(0);
    const [activityLogs, setActivityLogs] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    
    const [isEditAppointment, setIsEditAppointment] = useState(false);
    const [isViewAppointment, setIsViewAppointment] = useState(false);
    const [idSelected, setIdSelected] = useState(null);

    const columnsByUserType = useMemo(() => {
        const columns = [
            { flex: 1, field: 'doctor', headerName: 'Medical personnel', renderCell: (params) => {
                return <span className="capitalize">{params.row.doctor_lastname}, {params.row.doctor_firstname}</span>;
            }},
            { flex: 1, field: 'service', headerName: 'Service', renderCell: (params) => {
                return <span className="capitalize">{params.row.service_name}</span>;
            } },
            { flex: 1, field: 'user', headerName: 'User', renderCell: (params) => {
                return <span className="capitalize">{params.row.user_gender === "male" ? "Mr." : "Ms."} {params.row.user_lastname}, {params.row.user_firstname}</span>;
            } },
            { flex: 1, field: 'event_date', headerName: 'Appointment Date', renderCell: (params) => {
                const date = getDate(params.row.event_date);
                return <span className="capitalize">{date}</span>;
            } },
            { flex: 1, field: 'status', headerName: 'Status', renderCell: (params) => {
                const status = getDateStatus(params.row);
                const sx = {
                    textTransform: 'uppercase',
                };

                if (status === 'DONE' || status === 'CANCELED') {
                    sx.color = AnnouncementColor;
                } else {
                    sx.color = PrimaryColor;
                }

                return <Typography variant="body2" sx={sx} className="capitalize">{status}</Typography>;
            } },
            { flex: 1, field: 'action', headerName: 'Action', renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Tooltip title="View" arrow disableInteractive>
                            <Button color="primary" variant="outlined" sx={{ textTransform: 'none', borderColor: ViewColor, color: ViewColor }} size="small" onClick={() => onViewAppointment(params.row.event_id)}><VisibilityIcon /></Button>
                        </Tooltip>
                        {!params.row.event_deleted_at && (
                            <>
                                {userType !== 'admin' && (
                                    <Tooltip title="Edit" arrow disableInteractive>
                                        <Button color="success" variant="outlined" sx={{ textTransform: 'none', borderColor: PrimaryColor, color: PrimaryColor }} size="small" onClick={() => onEditAppointment(params.row.event_id)}><EditIcon /></Button>
                                    </Tooltip>
                                )}
                                <Activity mode={new Date(params.row.event_date) > new Date() ? 'visible' : 'hidden'}>
                                    <Tooltip title="Cancel" arrow disableInteractive>
                                        <Button color="error" variant="contained" sx={{ textTransform: 'none' }} size="small" onClick={() => onDeleteAppointment(params.row.event_id)}><DoDisturbIcon /></Button>
                                    </Tooltip>
                                </Activity>
                            </>
                        )}
                    </Box>
                )
            }}
        ];

        // if (userType === 'admin') {
        //     return columns.filter((col) => col.field !== 'action');
        // }
        
        return columns.filter((col) => col.field !== 'user');
    }, [userType]);

    const dropDownOptions = [
        { label: 'Medical personnel', value: 'doctor' },
        { label: 'Service', value: 'service_name' },
        { label: 'User', value: 'user' },
    ]


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getEventList({ 
                    page: paginationModel.page + 1,
                    size: paginationModel.pageSize,
                    type: eventType,
                    search,
                    from: dateRange.from,
                    to: dateRange.to
                });
                setActivityLogs(response.data.data.items || []);
                setTotalItem(response.data.data.total_item || 0);
            } catch (err) {
                showAlert(err.message, 'error');
            } finally {
                setLoadList(false);
            }
        };

        fetchDoctors();       
    }, [paginationModel.page, paginationModel.pageSize, eventType, loadList, search, dateRange]);

    const handleSearch = (query, field, from, to) => {
        if (query && field) {
            setSearch(`${field}::${query}`)
        } else {
            setSearch('');
        }

        if (from && to) {
            setDateRange({ from, to });
        } else {
            setDateRange({});
        }
    }

    const onViewAppointment = (id) => {
        setIdSelected(id);
        setIsViewAppointment(true);
    }

    const handleViewAppointmentClose = () => {
        setIsViewAppointment(false);
        setLoadList(true);
    }

    const onEditAppointment = (id) => {
        setIdSelected(id);
        setIsEditAppointment(true);
    }

    const handleEditAppointmentClose = () => {
        setIsEditAppointment(false);
        setLoadList(true);
    }

    const onDeleteAppointment = async (id) => {
        try {
            const res = await deleteAnnouncement(id);
            if (res.status === 200) {
                showAlert('Appointment deleted successfully', 'success');
                setLoadList(true);
            }
        } catch (error) {
            showAlert(error.message, 'error');
        }
    }

  return (
    <>
        <ToolbarFilter onSearch={handleSearch} dropDownOptions={dropDownOptions} />
        <DataGrid
            disableColumnSorting
            disableColumnMenu
            rows={activityLogs}
            columns={columnsByUserType}
            getRowId={(row) => row.event_id}
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
            loading={loadList}
            paginationMode="server"
            rowCount={totalItem}
            disableRowSelectionOnClick
        />
        <Activity mode={isEditAppointment ? "visible" : "hidden"}>
            <EditAppointmentPopup open={isEditAppointment} handleClose={handleEditAppointmentClose} id={idSelected} />
        </Activity>
        <Activity mode={isViewAppointment ? "visible" : "hidden"}>
            <ViewAppointmentPopup open={isViewAppointment} handleClose={handleViewAppointmentClose} id={idSelected} />
        </Activity>
    </>
  )
}

export default ActivityLog