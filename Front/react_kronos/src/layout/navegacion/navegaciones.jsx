import React, { useState, useEffect } from 'react';
import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
    ContactsOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Dropdown } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './navegaciones.scss'; // Asegúrate de importar el archivo CSS

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(<Link to="/perfil">Perfil</Link>, '1', <UserOutlined />),
    getItem(<Link to="/horarios">Horarios</Link>, '2', <TableOutlined />),
    getItem(<Link to="/personal">Personal</Link>, '3', <TeamOutlined />),
    getItem(<Link to="/materias">Materias</Link>, '4', <ScheduleOutlined />),
    getItem(<Link to="/eventos">Eventos</Link>, '5', <ContactsOutlined />),
];

const App = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Recuperar datos del sessionStorage
        const savedData = sessionStorage.getItem('schools');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setDropdownItems(parsedData.map(school => ({
                key: school.pk.toString(),
                label: school.name,
            })));
        }
    }, []);

    const handleMenuItemClick = ({ key }) => {
        // Guardar la clave seleccionada en sessionStorage
        sessionStorage.setItem('actual_school', key);
        console.log(sessionStorage.getItem('actual_school'))
    };

    const getSelectedKey = () => {
        switch (location.pathname) {
            case '/perfil':
                return '1';
            case '/horarios':
                return '2';
            case '/personal':
                return '3';
            case '/materias':
                return '4';
            case '/eventos':
                return '5';
            default:
                return '1';
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={200}
                collapsedWidth={50}
            >
                <div className={`logo ${collapsed ? 'collapsed' : ''}`}>
                <Dropdown
                        overlay={
                            <Menu
                                onClick={handleMenuItemClick}
                                items={dropdownItems.map(item => ({
                                    key: item.key,
                                    label: item.label,
                                }))}
                            />
                        }
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <img
                                src="https://via.placeholder.com/150"
                                alt="logo"
                                className="logo-img"
                            />
                        </a>
                    </Dropdown>
                </div>
                <Menu theme="dark" defaultSelectedKeys={[getSelectedKey()]} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
