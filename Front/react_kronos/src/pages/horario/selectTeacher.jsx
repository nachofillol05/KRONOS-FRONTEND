import React, { useRef, useState } from 'react';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Flex, Tooltip } from 'antd';


const data = [
    { key: '1', first_name: 'John', last_name: 'Doe', document: '12345678', subject: 'Matemáticas' },
    { key: '2', first_name: 'Jane', last_name: 'Smith', document: '87654321', subject: 'Historia' },
    { key: '3', first_name: 'Alice', last_name: 'Johnson', document: '11223344', subject: 'Ciencias' },
    { key: '4', first_name: 'Bob', last_name: 'Brown', document: '44332211', subject: 'Geografía' },
    { key: '5', first_name: 'Michael', last_name: 'Davis', document: '22334455', subject: 'Matemáticas' },
    { key: '6', first_name: 'Mary', last_name: 'Wilson', document: '55667788', subject: 'Historia' },
    { key: '7', first_name: 'James', last_name: 'Taylor', document: '33445566', subject: 'Ciencias' },
    { key: '8', first_name: 'Patricia', last_name: 'Anderson', document: '99887766', subject: 'Geografía' },
    { key: '9', first_name: 'Robert', last_name: 'Thomas', document: '77665544', subject: 'Matemáticas' },
    { key: '10', first_name: 'Linda', last_name: 'Jackson', document: '11224433', subject: 'Historia' },
    { key: '11', first_name: 'William', last_name: 'White', document: '66554433', subject: 'Ciencias' },
    { key: '12', first_name: 'Barbara', last_name: 'Harris', document: '55443322', subject: 'Geografía' },
    { key: '13', first_name: 'Richard', last_name: 'Martin', document: '44332211', subject: 'Matemáticas' },
    { key: '14', first_name: 'Susan', last_name: 'Thompson', document: '33221100', subject: 'Historia' },
    { key: '15', first_name: 'Joseph', last_name: 'Garcia', document: '22110099', subject: 'Ciencias' },
    { key: '16', first_name: 'Jessica', last_name: 'Martinez', document: '11009988', subject: 'Geografía' },
    { key: '17', first_name: 'Charles', last_name: 'Robinson', document: '99008877', subject: 'Matemáticas' },
    { key: '18', first_name: 'Karen', last_name: 'Clark', document: '88007766', subject: 'Historia' },
    { key: '19', first_name: 'Thomas', last_name: 'Rodriguez', document: '77006655', subject: 'Ciencias' },
    { key: '20', first_name: 'Lisa', last_name: 'Lewis', document: '66005544', subject: 'Geografía' },
    { key: '21', first_name: 'Christopher', last_name: 'Lee', document: '55004433', subject: 'Matemáticas' },
    { key: '22', first_name: 'Nancy', last_name: 'Walker', document: '44003322', subject: 'Historia' },
    { key: '23', first_name: 'Daniel', last_name: 'Hall', document: '33002211', subject: 'Ciencias' },
    { key: '24', first_name: 'Betty', last_name: 'Allen', document: '22001100', subject: 'Geografía' },
    { key: '25', first_name: 'Matthew', last_name: 'Young', document: '11000099', subject: 'Matemáticas' },
    { key: '26', first_name: 'Margaret', last_name: 'Hernandez', document: '99009988', subject: 'Historia' },
    { key: '27', first_name: 'Anthony', last_name: 'King', document: '88008877', subject: 'Ciencias' },
    { key: '28', first_name: 'Sandra', last_name: 'Wright', document: '77007766', subject: 'Geografía' },
    { key: '29', first_name: 'Donald', last_name: 'Lopez', document: '66006655', subject: 'Matemáticas' },
    { key: '30', first_name: 'Ashley', last_name: 'Hill', document: '55005544', subject: 'Historia' },
    { key: '31', first_name: 'Paul', last_name: 'Scott', document: '44004433', subject: 'Ciencias' },
    { key: '32', first_name: 'Kimberly', last_name: 'Green', document: '33003322', subject: 'Geografía' },
    { key: '33', first_name: 'Steven', last_name: 'Adams', document: '22002211', subject: 'Matemáticas' },
    { key: '34', first_name: 'Emily', last_name: 'Baker', document: '11001100', subject: 'Historia' },
    { key: '35', first_name: 'Edward', last_name: 'Gonzalez', document: '99008877', subject: 'Ciencias' },
    { key: '36', first_name: 'Angela', last_name: 'Nelson', document: '88007766', subject: 'Geografía' },
    { key: '37', first_name: 'Mark', last_name: 'Carter', document: '77006655', subject: 'Matemáticas' },
    { key: '38', first_name: 'Dorothy', last_name: 'Mitchell', document: '66005544', subject: 'Historia' },
    { key: '39', first_name: 'Jason', last_name: 'Perez', document: '55004433', subject: 'Ciencias' },
    { key: '40', first_name: 'Carol', last_name: 'Roberts', document: '44003322', subject: 'Geografía' },
    { key: '41', first_name: 'Kevin', last_name: 'Turner', document: '33002211', subject: 'Matemáticas' },
    { key: '42', first_name: 'Michelle', last_name: 'Phillips', document: '22001100', subject: 'Historia' },
    { key: '43', first_name: 'Brian', last_name: 'Campbell', document: '11000099', subject: 'Ciencias' },
    { key: '44', first_name: 'Laura', last_name: 'Parker', document: '99009988', subject: 'Geografía' },
    { key: '45', first_name: 'Ronald', last_name: 'Evans', document: '88008877', subject: 'Matemáticas' },
    { key: '46', first_name: 'Sarah', last_name: 'Edwards', document: '77007766', subject: 'Historia' },
    { key: '47', first_name: 'Eric', last_name: 'Collins', document: '66006655', subject: 'Ciencias' },
    { key: '48', first_name: 'Karen', last_name: 'Stewart', document: '55005544', subject: 'Geografía' },
    { key: '49', first_name: 'Donald', last_name: 'Sanchez', document: '44004433', subject: 'Matemáticas' },
    { key: '50', first_name: 'Nancy', last_name: 'Morris', document: '33003322', subject: 'Historia' },
];

export default function SelectTeacher() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm, dataIndex) => {
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
                        onClick={() => {
                            clearFilters();
                            handleReset(clearFilters, confirm, dataIndex);
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

    const handleRowClick = (record) => {
        const newSelectedRowKeys = selectedRowKeys.includes(record.key)
            ? selectedRowKeys.filter(key => key !== record.key)
            : [...selectedRowKeys, record.key];
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        }
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'first_name',
            key: 'Nombre',
            sorter: (a, b) => a.first_name.localeCompare(b.first_name),
            ...getColumnSearchProps('first_name')
        },
        {
            title: 'Apellido',
            dataIndex: 'last_name',
            key: 'Apellido',
            sorter: (a, b) => a.last_name.localeCompare(b.last_name),
            ...getColumnSearchProps('last_name')
        },
        { title: 'Documento', dataIndex: 'document', key: 'Documento' },
        {
            title: 'Materia',
            dataIndex: 'subject',
            key: 'Subject',
            filters: [
                { text: 'Matemáticas', value: 'Matemáticas' },
                { text: 'Historia', value: 'Historia' },
                { text: 'Ciencias', value: 'Ciencias' },
                { text: 'Geografía', value: 'Geografía' },
            ],
            onFilter: (value, record) => record.subject.includes(value)
        }
    ];

    return (
        <Flex vertical gap={25} align='end'>
            <Table
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
                showSorterTooltip={false}
                scroll={{ y: 450 }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <Tooltip title="Seleccionar profesor">
                <Button type='primary' size='large' icon={<ArrowRightOutlined />} style={{ width: "100px" }} />
            </Tooltip>
        </Flex>
    );
}