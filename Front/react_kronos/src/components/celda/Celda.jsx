import React, { useState, useCallback, useMemo } from 'react';
import { Col, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import { UserOutlined, FilterOutlined } from '@ant-design/icons';
import '../calendario/Calendario.scss'; // Asegúrate de tener el estilo correspondiente

const subjects = [
    { value: 'MAT', label: 'Matemática', color: '#FF0000', avatar: <Avatar size="small" icon={<UserOutlined />} /> },
    { value: 'LEN', label: 'Lengua', color: '#0000FF', avatar: <Avatar size="small" icon={<UserOutlined />} /> },
    { value: 'BIO', label: 'Biología', color: '#FFFF00', avatar: <Avatar size="small" icon={<UserOutlined />} /> },
    { value: 'QIM', label: 'Química', color: '#00FF00', avatar: <Avatar size="small" icon={<UserOutlined />} /> },
    { value: 'MUS', label: 'Música', color: '#FF00FF', avatar: <Avatar size="small" icon={<UserOutlined />} /> },
    { value: 'FIS', label: 'Fisica', color: '#808080', avatar: <Avatar size="small" icon={<UserOutlined />} /> }
];

const Celda = React.memo(({ subject: propSubject, day, hour, course, cellKey, isEditable, onClick, isActive }) => {
    const [selectedItems, setSelectedItems] = useState({});
    const selectedSubjectValue = selectedItems[cellKey];
    const selectedSubject = useMemo(() => subjects.find(sub => sub.value === selectedSubjectValue), [selectedSubjectValue]);

    const handleMenuClick = useCallback((e) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [cellKey]: e.key
        }));
    }, [cellKey]);

    const menu = useMemo(() => (
        <Menu onClick={handleMenuClick}>
            {subjects.map((subject) => (
                <Menu.Item key={subject.value}>
                    {subject.label}
                </Menu.Item>
            ))}
        </Menu>
    ), [handleMenuClick]);

    const makeColorTransparent = useCallback((color, alpha) => {
        alpha = Math.max(0, Math.min(1, alpha));
        const hexToRgba = (hex) => {
            let r = 0, g = 0, b = 0;
            if (hex.length === 4) {
                r = parseInt(hex[1] + hex[1], 16);
                g = parseInt(hex[2] + hex[2], 16);
                b = parseInt(hex[3] + hex[3], 16);
            } else if (hex.length === 7) {
                r = parseInt(hex[1] + hex[2], 16);
                g = parseInt(hex[3] + hex[4], 16);
                b = parseInt(hex[5] + hex[6], 16);
            }
            return `rgba(${r},${g},${b},${alpha})`;
        };

        if (/^#[0-9A-Fa-f]{3,6}$/.test(color)) {
            return hexToRgba(color);
        } else {
            return color;
        }
    }, []);

    const renderContent = useMemo(() => {
        const displaySubject = selectedSubject || propSubject || {};
        const avatar = displaySubject.avatar || null;
        const label = displaySubject.value || '';
        const color = displaySubject.color || 'blue';
        const backgroundColor = makeColorTransparent(displaySubject.color || null, 0.1);

        return (
            <a className='espacio' style={{ color: color, backgroundColor: backgroundColor, display: 'flex', alignItems: 'center', gap: 5 }}>
                {avatar}
                {label}
            </a>
        );
    }, [selectedSubject, propSubject, makeColorTransparent]);

    return (
        <Col onClick={onClick}>
            {isEditable ? (
                <Dropdown overlay={menu} trigger={['click']}>
                    {renderContent}
                </Dropdown>
            ) : (
                <Tooltip
                    arrow={false}
                    trigger={'click'}
                    title={propSubject ? (
                        <div style={{ color: '#8e96a3' }}>
                            <b style={{ color: '#444' }}>{propSubject.label}</b>
                            <p>{`Insertar profesor: ${day} ${hour} módulo, ${course}`}</p>
                            <a style={{ color: '#227cae', textDecoration: 'none' }}>
                                <FilterOutlined /> Filtrar por este profesor
                            </a>
                        </div>
                    ) : ""}
                    color='#ffffff'
                    overlayClassName='calendar-tooltip'
                >
                    {renderContent}
                </Tooltip>
            )}
        </Col>
    );
});

export default Celda;
