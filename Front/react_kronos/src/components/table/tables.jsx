import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './tables.scss';



const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'Hello', col2: 'World' },
    { id: 6, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 7, col1: 'MUI', col2: 'is Amazing' },
    { id: 8, col1: 'Hello', col2: 'World' },
    { id: 9, col1: 'Hello', col2: 'World' },
    { id: 10, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 11, col1: 'MUI', col2: 'is Amazing' },
    { id: 12, col1: 'Hello', col2: 'World' },
    { id: 13, col1: 'Hello', col2: 'World' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'Hello', col2: 'World' },
    { id: 6, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 7, col1: 'MUI', col2: 'is Amazing' },
    { id: 8, col1: 'Hello', col2: 'World' },
    { id: 9, col1: 'Hello', col2: 'World' },
    { id: 10, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 11, col1: 'MUI', col2: 'is Amazing' },
    { id: 12, col1: 'Hello', col2: 'World' },
    { id: 13, col1: 'Hello', col2: 'World' },
];

const columns = [
    { field: 'col1', headerName: 'Column 1', width: 550 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];

const Table = () => {
    return (
            <DataGrid rows={rows} columns={columns} hideFooter/>
    );
};

export default Table;
