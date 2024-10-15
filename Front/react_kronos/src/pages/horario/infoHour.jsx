import React, { useState,useEffect } from 'react';
import { Button, Table, Tooltip, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import FormCreateHour from './formCreateHour.jsx';

/*const data = [
    {
        key: '1',
        hora: '1',
        comienzo: '07:45',
        fin: '08:25',
        dia: 'Lunes',
    },
    {
        key: '2',
        hora: '2',
        comienzo: '08:25',
        fin: '09:05',
        dia: 'Lunes',
    },
    {
        key: '3',
        hora: '3',
        comienzo: '09:25',
        fin: '10:05',
        dia: 'Martes',
    },
    {
        key: '4',
        hora: '4',
        comienzo: '10:05',
        fin: '10:45',
        dia: 'Lunes',
    },
    {
        key: '5',
        hora: '5',
        comienzo: '10:55',
        fin: '11:35',
        dia: 'Lunes',
    },
    {
        key: '6',
        hora: '6',
        comienzo: '11:35',
        fin: '12:15',
        dia: 'Lunes',
    },
    {
        key: '7',
        hora: '7',
        comienzo: '12:55',
        fin: '13:25',
        dia: 'Lunes',
    },
    {
        key: '8',
        hora: '8',
        comienzo: '13:25',
        fin: '14:05',
        dia: 'Lunes',
    },
    {
        key: '9',
        hora: '9',
        comienzo: '14:05',
        fin: '14:45',
        dia: 'Lunes',
    }
];*/

const weekDaysOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function Horas({ showDrawer }) {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [modulesData, setModulesData] = useState([]);

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    useEffect(() => {
        fetch('http://localhost:8000/api/modules/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setModulesData(data);
            });
    }, []);


    const columns = [
        {
            title: 'Hora',
            dataIndex: 'moduleNumber',
            key: 'hora',
            ellipsis: true,
        },
        {
            title: 'Comienzo',
            dataIndex: 'startTime',
            key: 'comienzo',
            ellipsis: true,
        },
        {
            title: 'Fin',
            dataIndex: 'endTime',
            key: 'fin',
            ellipsis: true,
        },
        {
            title: 'Día',
            dataIndex: 'day',
            key: 'dia',
            ellipsis: true,
        }
    ];

    return (
        <Flex vertical gap={25} align='end'>
            <Table
                bordered
                pagination={false}
                showSorterTooltip={false}
                filterMode={'menu'}
                columns={columns}
                dataSource={modulesData}
                onChange={handleChange}
                scroll={{
                    y: 450,
                }} />
            <Tooltip title="Agregar hora">
                <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }}
                    onClick={() => showDrawer(
                        <FormCreateHour showDrawer={showDrawer} />,
                        'Agregar hora catedra'
                    )}
                />
            </Tooltip>
        </Flex>
    );
}
