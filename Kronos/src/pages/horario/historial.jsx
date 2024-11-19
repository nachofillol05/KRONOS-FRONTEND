import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, DatePicker, Tooltip } from 'antd';

export default function Historial() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [historialData, setHistorialData] = useState([]);
    const searchInput = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/history_schedule/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setHistorialData(data);
            });
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
        confirm();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters, confirm)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Limpiar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => (searchedColumn === dataIndex ? <span>{text}</span> : text),
    });
    const columns = [
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            render: (action) => (
                <span style={{ color: action?.isEnabled ? 'green' : 'red' }}>
                    {action.name}
                </span>
            ),
        },
        {
            title: 'Día',
            dataIndex: ['module', 'day'],
            key: 'day',
        },
        {
            title: 'Materia',
            dataIndex: ['tssId', 'coursesubjects'],
            key: 'coursesubjects',
        },
        {
            title: 'Profesor',
            dataIndex: ['tssId', 'teacher'],
            key: 'teacher',
        },
        {
            title: 'Hora',
            dataIndex: ['module', 'startTime'],
            key: 'time',
            render: (text, record) => `${record.module.startTime} - ${record.module.endTime}`,
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleString(),
        },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 25 }}>
            <Table
                bordered
                columns={columns}
                dataSource={historialData}
                rowKey="id"
                pagination={false}
                scroll={{ x: 1000, y: 450 }}
                locale={{ emptyText: 'No hay datos disponibles' }}
            />
            <Tooltip title="Seleccionar fecha">
                <Button type='primary' size='large' icon={<ArrowRightOutlined />} style={{ width: "100px" }} />
            </Tooltip>
        </div>
    );
}
