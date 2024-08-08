import React, { useState } from 'react';
import { Table, Button, Flex, Tooltip } from 'antd';
import { ArrowRightOutlined,PlusOutlined } from '@ant-design/icons';
import FormCreateCourse from './formCreateCourse';

const data = [
    { key: '1', year: '1°', division: 'A' },
    { key: '2', year: '1°', division: 'B' },
    { key: '3', year: '1°', division: 'C' },
    { key: '4', year: '2°', division: 'A' },
    { key: '5', year: '2°', division: 'B' },
    { key: '6', year: '2°', division: 'C' },
    { key: '7', year: '3°', division: 'A' },
    { key: '8', year: '3°', division: 'B' },
    { key: '9', year: '3°', division: 'C' },
    { key: '10', year: '4°', division: 'A' },
    { key: '11', year: '4°', division: 'B' },
    { key: '12', year: '4°', division: 'C' },
    { key: '13', year: '5°', division: 'A' },
    { key: '14', year: '5°', division: 'B' },
    { key: '15', year: '5°', division: 'C' },
    { key: '16', year: '6°', division: 'A' },
    { key: '17', year: '6°', division: 'B' },
    { key: '18', year: '6°', division: 'C' },
    { key: '19', year: '7°', division: 'A' },
    { key: '20', year: '7°', division: 'B' },
    { key: '21', year: '7°', division: 'C' },
];


export default function SelectCourse({ showDrawer }) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
            title: 'Año',
            dataIndex: 'year',
            key: 'year',
            filters: [
                { text: '1°', value: '1°' },
                { text: '2°', value: '2°' },
                { text: '3°', value: '3°' },
                { text: '4°', value: '4°' },
                { text: '5°', value: '5°' },
                { text: '6°', value: '6°' },
                { text: '7°', value: '7°' },
                { text: '8°', value: '8°' },
                { text: '9°', value: '9°' },
                { text: '10°', value: '10°' },
            ],
            onFilter: (value, record) => record.year.includes(value),
        },
        {
            title: 'División',
            dataIndex: 'division',
            key: 'division',
            filters: [
                { text: 'A', value: 'A' },
                { text: 'B', value: 'B' },
                { text: 'C', value: 'C' },
                { text: 'D', value: 'D' },
                { text: 'E', value: 'E' },
                { text: 'F', value: 'F' },
                { text: 'G', value: 'G' },
                { text: 'H', value: 'H' },
                { text: 'I', value: 'I' },
                { text: 'J', value: 'J' },
            ],
            onFilter: (value, record) => record.division.includes(value),
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
                scroll={{ y: 450 }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <Flex gap={10}>
            <Tooltip title="Agregar hora">
                <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }}
                    onClick={() => showDrawer(
                        <FormCreateCourse showDrawer={showDrawer} />,
                        'Agregar curso'
                    )}
                />
            </Tooltip>
            <Tooltip title="Seleccionar curso">
                <Button type='primary' size='large' icon={<ArrowRightOutlined />} style={{ width: "100px" }} />
            </Tooltip>
            </Flex>
        </Flex>
    );
}
