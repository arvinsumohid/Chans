import React, { useEffect, useState, Activity } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { PrimaryThemeColor } from '../utils/constant';
import useDebounce from '../hooks/useDebounce';
import DateRangePicker from './DateRange';

const ToolbarFilter = ({ dropDownOptions, onSearch, showDateRange = true }) => {
    const [filter, setFilter] = useState({
        search: '',
        field: 'all',
        from: '',
        to: '',
    })
    const debouncedQuery = useDebounce(filter.search, 500); 

    const handleSearch = () => {
        onSearch(filter.search, filter.field, filter.from, filter.to);
    }

    const handleDateRange = (from, to) => {
        setFilter((v) => ({...v, from, to}));
        onSearch(filter.search, filter.field, from, to);
    }

    useEffect(() => {
        handleSearch();
    }, [debouncedQuery, filter.field]);

    // const handleChangeField = (event) => {
    //     setFilter((v) => ({...v, field: event.target.value}));
    // };

    const handleChangeSearch = (event) => {
        setFilter((v) => ({...v, search: event.target.value}));
    };

  return (
    <>
        <Box className="flex flex-col lg:flex-row gap-2 justify-between lg:items-center">
            <Box className="flex gap-2 items-center">
                <TextField
                    className="w-1/2 md:w-1/2"
                    label="Search"
                    variant="outlined"
                    margin="normal"
                    value={filter.search}
                    sx={{
                        marginY: 0
                    }}
                    onChange={handleChangeSearch}
                />
                {/* <FormControl className="w-1/2 md:w-1/4 max-w-[150px]">
                    <InputLabel id="demo-simple-select-label">Field</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter.field}
                        label="Field*"
                        onChange={handleChangeField}
                    >
                        <MenuItem key="all" value="all">
                            All
                        </MenuItem>
                        {dropDownOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
            </Box>
            
            <Activity mode={showDateRange ? 'visible' : 'hidden'}>
                <DateRangePicker onSearch={handleDateRange} />
            </Activity>
        </Box>
    </>
  )
}

export default ToolbarFilter