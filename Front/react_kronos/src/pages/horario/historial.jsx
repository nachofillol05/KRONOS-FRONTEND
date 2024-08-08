import React, { useRef, useState } from 'react';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, DatePicker, Radio, Flex, Tooltip } from 'antd';
import moment from 'moment';

const data = [
    { key: '1', date: '2024-08-01', teacher: 'John Doe', subject: 'Matemáticas', course: '101', day: 'Lunes', time: '10:00 AM', action: 'Edit' },
    { key: '2', date: '2024-08-02', teacher: 'Jane Smith', subject: 'Historia', course: '102', day: 'Martes', time: '11:00 AM', action: 'Edit' },
    { key: '3', date: '2024-08-03', teacher: 'Alice Johnson', subject: 'Ciencias', course: '103', day: 'Miércoles', time: '12:00 PM', action: 'Edit' },
    { key: '4', date: '2024-08-04', teacher: 'Bob Brown', subject: 'Geografía', course: '104', day: 'Jueves', time: '01:00 PM', action: 'Edit' },
    { key: '5', date: '2024-08-05', teacher: 'Michael Davis', subject: 'Matemáticas', course: '105', day: 'Viernes', time: '02:00 PM', action: 'Edit' },
    { key: '6', date: '2024-08-06', teacher: 'Mary Wilson', subject: 'Historia', course: '106', day: 'Sábado', time: '03:00 PM', action: 'Edit' },
    { key: '7', date: '2024-08-07', teacher: 'James Taylor', subject: 'Ciencias', course: '107', day: 'Domingo', time: '04:00 PM', action: 'Edit' },
    { key: '8', date: '2024-08-08', teacher: 'Patricia Anderson', subject: 'Geografía', course: '108', day: 'Lunes', time: '09:00 AM', action: 'Edit' },
    { key: '9', date: '2024-08-09', teacher: 'Robert Thomas', subject: 'Matemáticas', course: '109', day: 'Martes', time: '10:00 AM', action: 'Edit' },
    { key: '10', date: '2024-08-10', teacher: 'Linda Jackson', subject: 'Historia', course: '110', day: 'Miércoles', time: '11:00 AM', action: 'Edit' },
    { key: '11', date: '2024-08-11', teacher: 'William White', subject: 'Ciencias', course: '111', day: 'Jueves', time: '12:00 PM', action: 'Edit' },
    { key: '12', date: '2024-08-12', teacher: 'Barbara Harris', subject: 'Geografía', course: '112', day: 'Viernes', time: '01:00 PM', action: 'Edit' },
    { key: '13', date: '2024-08-13', teacher: 'Richard Martin', subject: 'Matemáticas', course: '113', day: 'Sábado', time: '02:00 PM', action: 'Edit' },
    { key: '14', date: '2024-08-14', teacher: 'Susan Thompson', subject: 'Historia', course: '114', day: 'Domingo', time: '03:00 PM', action: 'Edit' },
    { key: '15', date: '2024-08-15', teacher: 'Joseph Garcia', subject: 'Ciencias', course: '115', day: 'Lunes', time: '04:00 PM', action: 'Edit' },
    { key: '16', date: '2024-08-16', teacher: 'Jessica Martinez', subject: 'Geografía', course: '116', day: 'Martes', time: '05:00 PM', action: 'Edit' },
    { key: '17', date: '2024-08-17', teacher: 'Charles Robinson', subject: 'Matemáticas', course: '117', day: 'Miércoles', time: '06:00 PM', action: 'Edit' },
    { key: '18', date: '2024-08-18', teacher: 'Karen Clark', subject: 'Historia', course: '118', day: 'Jueves', time: '07:00 PM', action: 'Edit' },
    { key: '19', date: '2024-08-19', teacher: 'Thomas Rodriguez', subject: 'Ciencias', course: '119', day: 'Viernes', time: '08:00 PM', action: 'Edit' },
    { key: '20', date: '2024-08-20', teacher: 'Lisa Lewis', subject: 'Geografía', course: '120', day: 'Sábado', time: '09:00 AM', action: 'Edit' },
    // Puedes seguir agregando más datos si es necesario
];


export default function Historial() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const searchInput = useRef(null);

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

    const handleDateChange = (date, dateString, confirm) => {
        confirm();
        setSearchText(dateString);
        setSearchedColumn('date');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                {dataIndex === 'date' ? (
                    <DatePicker
                        ref={searchInput}
                        onChange={(date, dateString) => handleDateChange(date, dateString, confirm)}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                ) : (
                    <Input
                        ref={searchInput}
                        placeholder={`Buscar ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                )}
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
                        onClick={() => {
                            handleReset(clearFilters, confirm);
                        }}
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
        render: (text) =>
            searchedColumn === dataIndex ? (
                <span style={{ backgroundColor: '#ffc069', padding: 0 }}>
                    {text ? (
                        text.toString().toLowerCase().includes(searchText.toLowerCase()) ? (
                            <span>
                                {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) =>
                                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                                        <span key={i} className="highlight">
                                            {fragment}
                                        </span>
                                    ) : (
                                        fragment
                                    )
                                )}
                            </span>
                        ) : (
                            text
                        )
                    ) : (
                        text
                    )}
                </span>
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: '',
            dataIndex: 'radio',
            key: 'radio',
            width: 25,
            render: (_, record) => (
                <Radio
                    checked={selectedRow === record.key}
                    onChange={() => setSelectedRow(record.key)}
                />
            ),
            fixed: 'left',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            width: 60,
            sorter: (a, b) => a.date.localeCompare(b.date),
            ...getColumnSearchProps('date'),
            fixed: 'left',
        },
        {
            title: 'Profesor',
            dataIndex: 'teacher',
            key: 'teacher',
            width: 120,
            sorter: (a, b) => a.teacher.localeCompare(b.teacher),
            ...getColumnSearchProps('teacher')
        },
        {
            title: 'Materia',
            dataIndex: 'subject',
            key: 'subject',
            width: 90,
            filters: [
                { text: 'Matemáticas', value: 'Matemáticas' },
                { text: 'Historia', value: 'Historia' },
                { text: 'Ciencias', value: 'Ciencias' },
                { text: 'Geografía', value: 'Geografía' },
            ],
            onFilter: (value, record) => record.subject.includes(value)
        },
        {
            title: 'Curso',
            dataIndex: 'course',
            key: 'course',
            width: 60,
        },
        {
            title: 'Día',
            dataIndex: 'day',
            key: 'day',
            width: 60,
            filters: [
                { text: 'Lunes', value: 'Lunes' },
                { text: 'Martes', value: 'Martes' },
                { text: 'Miércoles', value: 'Miércoles' },
                { text: 'Jueves', value: 'Jueves' },
                { text: 'Viernes', value: 'Viernes' },
            ],
            onFilter: (value, record) => record.day.includes(value)
        },
        {
            title: 'Hora',
            dataIndex: 'time',
            key: 'time',
            width: 60,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            width: 50,
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => console.log(`Editing ${record.key}`)}>Edit</Button>
                </Space>
            )
        }
    ];

    return (
        <Flex vertical gap={25} align='end'>
            <Table
                bordered
                columns={columns}
                dataSource={data}
                pagination={false}
                showSorterTooltip={false}
                scroll={{ x: 1000, y: 450 }}
                onRow={(record) => ({
                    onClick: () => setSelectedRow(record.key),
                })}
            />
            <Tooltip title="Seleccionar fecha">
                <Button type='primary' size='large' icon={<ArrowRightOutlined />} style={{ width: "100px" }} />
            </Tooltip>
        </Flex>
    );
}
