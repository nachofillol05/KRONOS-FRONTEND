import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Input, Checkbox, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const FilterDropdownPersonalizado = ({ tempSelectedKeys,setTempSelectedKeys,options, placeholder, value = [], onChange }) => {
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMenuClick = (option) => {
        const optionValue = option.value;
        if (tempSelectedKeys?.includes(optionValue)) {
            setTempSelectedKeys(tempSelectedKeys.filter((key) => key !== optionValue));
        } else {
            setTempSelectedKeys(tempSelectedKeys?[...tempSelectedKeys, optionValue]:[optionValue]);
        }
    };

    const handleVisibleChange = (flag) => {
        if (!flag) {
            onChange(tempSelectedKeys);
        }
        setVisible(flag);
    };

    const menuHeight = filteredOptions.length > 6 ? 240 : filteredOptions.length * 40; // Adjust height dynamically

    const menu = (
        <div style={{ width: 300, backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }} >
            <Input
                size='large'
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: 8 }}
            />

            <Menu size="large" style={{ height: menuHeight, overflowY: filteredOptions.length > 6 ? 'scroll' : 'auto' }}>
                {filteredOptions.map((option) => (
                    <Menu.Item size="large" key={option.value} onClick={() => handleMenuClick(option)}>
                        <Checkbox size='large' checked={tempSelectedKeys?.includes(option.value)} style={{ fontSize: 16 }}>
                            {option.label}
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
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
                <Button size="large">
                    {placeholder} ({tempSelectedKeys? tempSelectedKeys.length:0}) <DownOutlined />
                </Button>
        </Dropdown>
    );
};

export default FilterDropdownPersonalizado;