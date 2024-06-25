import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './tables.scss';

export default function Table(props){

    const rows = props.data ? props.data : [
        {id:1, col1: 'Hello', col2: 'World' },
        {id:2, col1: 'DataGridPro', col2: 'is Awesome' },
        {id:3, col1: 'MUI', col2: 'is Amazing' },
    ];
    
    const columns = props.columns ? props.columns : [
        { field: 'col1', headerName: 'Column 1', width: 300 },
        { field: 'col2', headerName: 'Column 2', width: 300 },
    ];

    return (
        <div className="contenedor-tabla">
            <DataGrid rows={rows} columns={columns} hideFooter/>
        </div>
    );
};

