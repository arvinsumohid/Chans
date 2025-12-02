import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { getEventList } from '../../providers/list'
import { useAlert } from '../../hooks/useAlert'

const ActivityLog = ({ eventType = 'appointment' }) => {
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [activityLogs, setActivityLogs] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const columns = [
        { flex: 1, field: 'doctor', headerName: 'Doctor', renderCell: (params) => {
            const { doctor_service } = params.row;
            return <span className="capitalize">Dr. {doctor_service.doctor.lastname}, {doctor_service.doctor.firstname}</span>;
        }},
        { flex: 1, field: 'service', headerName: 'Service', renderCell: (params) => {
            const { doctor_service } = params.row;
            return <span className="capitalize">{doctor_service.service.name}</span>;
        } },
        { flex: 1, field: 'user', headerName: 'User', renderCell: (params) => {
            const { user } = params.row;
            return <span className="capitalize">{user.gender === "male" ? "Mr." : "Ms."} {user.lastname}, {user.firstname}</span>;
        } },
        { flex: 1, field: 'event_date', headerName: 'Appointment Date', renderCell: (params) => {
            const { event_date } = params.row;
            return <span className="capitalize">{event_date}</span>;
        } },
    ];


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const response = await getEventList({ 
                    page: paginationModel.page + 1,
                    size: paginationModel.pageSize,
                    type: eventType
                });
                setActivityLogs(response.data.data.items || []);
                setTotalItem(response.data.data.total_item || 0);
            } catch (err) {
                showAlert(err.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();       
    }, [paginationModel.page, paginationModel.pageSize, eventType]);

  return (
    <DataGrid
        rows={activityLogs}
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
  )
}

export default ActivityLog