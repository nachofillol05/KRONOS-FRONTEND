import React, { useState } from 'react';
import { Button, Dropdown, Menu, Input, Checkbox, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const FilterDropdownTable = ({ options, placeholder, value = [], onChange }) => {
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKeys, setSelectedKeys] = useState(value);
    const [tempSelectedKeys, setTempSelectedKeys] = useState(value);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMenuClick = (option) => {
        const optionValue = option.value;
        if (tempSelectedKeys.includes(optionValue)) {
            setTempSelectedKeys(tempSelectedKeys.filter((key) => key !== optionValue));
        } else {
            setTempSelectedKeys([...tempSelectedKeys, optionValue]);
        }
    };

    const handleVisibleChange = (flag) => {
        if (!flag) {
            setSelectedKeys(tempSelectedKeys);
            if (onChange) {
                onChange(tempSelectedKeys);
            }
        }
        setVisible(flag);
    };

    const menuHeight = filteredOptions.length > 6 ? 240 : filteredOptions.length * 40; // Ajusta la altura dinámicamente

    const menu = (
        <div 
            className='close-shadow'
            style={{
                width: 300, backgroundColor: '#fff', borderRadius: 8, padding: 20,
            }} 
        >
            <Input
                className='close-shadow'
                size='large'
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    marginBottom: 16,
                    boxShadow: '0px 1px 2px -2px rgba(0, 0, 0, 0.16)' // Se corrigió el valor de boxShadow
                }}
            />

            <Menu 
                size="large" 
                className='close-shadow' 
                style={{ height: menuHeight, overflowY: filteredOptions.length > 6 ? 'scroll' : 'auto', boxShadow: '0px 1px 2px -2px rgba(0, 0, 0, 0.16)' }} // Corregido el estilo boxShadow
            >
                {filteredOptions.map((option) => (
                    <Menu.Item size="large" key={option.value} onClick={() => handleMenuClick(option)}>
                        <Checkbox 
                            size='large' 
                            checked={tempSelectedKeys.includes(option.value)} 
                            style={{ fontSize: 16 }}
                        >
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
            open={visible} // Cambiado de `visible` a `open`
            onOpenChange={handleVisibleChange} // Cambiado de `onVisibleChange` a `onOpenChange`
        >
            <Badge count={selectedKeys.length}>
                <Button size="large">
                    {placeholder} : {tempSelectedKeys.length} <DownOutlined />
                </Button>
            </Badge>
        </Dropdown>
    );
};

export default FilterDropdownTable;
