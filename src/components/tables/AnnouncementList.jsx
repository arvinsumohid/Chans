import { useContext, useEffect, useMemo, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { getEventList } from '../../providers/list'
import { useAlert } from '../../hooks/useAlert'
import { LoadListContext } from '../../contexts/LoadListContext';

const AnnouncementList = ({ userType = 'admin' }) => {
    const { showAlert } = useAlert();
    const {loadList, setLoadList} = useContext(LoadListContext);
    const [totalItem, setTotalItem] = useState(0);
    const [activityLogs, setActivityLogs] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const columnsByUserType = useMemo(() => {
        const columns = [
            { flex: 1, field: 'name', headerName: 'Title', renderCell: (params) => {
                return <span className="capitalize" title={params.row.announcement_description}>{params.row.announcement_name}</span>;
            }},
            { flex: 1, field: 'event_date', headerName: 'Event Date', renderCell: (params) => {
                const date = new Date(params.row.event_date);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return <span className="capitalize">{year}-{month}-{day}</span>;
            } },
        ];

        if (userType === 'admin') {
            return columns;
        }
        
        return columns.filter((col) => col.field !== 'user');
    }, [userType]);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEventList({ 
                    page: paginationModel.page + 1,
                    size: paginationModel.pageSize,
                    type: 'event'
                });
                setActivityLogs(response.data.data.items || []);
                setTotalItem(response.data.data.total_item || 0);
            } catch (err) {
                showAlert(err.message, 'error');
            } finally {
                setLoadList(false);
            }
        };

        fetchEvents();       
    }, [paginationModel.page, paginationModel.pageSize, loadList]);

  return (
    <DataGrid
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
  )
}

export default AnnouncementList