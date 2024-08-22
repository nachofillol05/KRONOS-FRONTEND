// /src/components/FilterDropdownWithFooter.js

import React, { useState } from 'react';
import { Button, Dropdown, Menu, Input, Checkbox, Divider, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const FilterDropdownWithFooter = ({placeholder}) => {
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [tempSelectedKeys, setTempSelectedKeys] = useState([]);

    const options = [
        "Juan Pérez",
        "María Gómez",
        "Carlos Rodríguez",
        "Ana Fernández",
        "Pedro Martínez",
        "Laura Sánchez",
        "Jorge Ramírez",
        "Elena Morales",
        "Luis Torres",
        "Carmen Díaz",
        "Andrés Gutiérrez",
        "Sofía Herrera",
        "Miguel Vargas",
        "Lucía Rivas",
        "Ricardo Castillo",
        "Paula Navarro",
        "Roberto Ortega",
        "Valeria Flores",
        "Fernando Mendoza",
        "Gabriela Romero"
    ];
    

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMenuClick = (option) => {
        if (tempSelectedKeys.includes(option)) {
            setTempSelectedKeys(tempSelectedKeys.filter((key) => key !== option));
        } else {
            setTempSelectedKeys([...tempSelectedKeys, option]);
        }
    };

    const handleAdd = () => {
        setSelectedKeys(tempSelectedKeys);
        setVisible(false);
    };

    const handleCancel = () => {
        setTempSelectedKeys(selectedKeys);
        setVisible(false);
    };

    const menu = (
        <div style={{ width: 300, backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }} >
            <Input
            size='large'
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: 8 }}
            />

            <Menu size="large" style={{height: 400, overflow: 'auto'}}>
                {filteredOptions.map((option) => (
                    <Menu.Item size="large" key={option} onClick={() => handleMenuClick(option)}>
                        <Checkbox size='large' checked={tempSelectedKeys.includes(option)} style={{ fontSize: 16 }}>
                            {option}
                        </Checkbox>
                    </Menu.Item>
                ))}
            </Menu>

        </div>
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={['click']}
            onVisibleChange={(flag) => {
                setVisible(flag);
                setTempSelectedKeys(selectedKeys); // Sync tempSelectedKeys when dropdown opens
            }}
            visible={visible}
        >
            <Button style={{ fontSize: 16, padding: '5px 12px', minHeight: 40 }}>
                {placeholder}{selectedKeys.length} <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default FilterDropdownWithFooter;
