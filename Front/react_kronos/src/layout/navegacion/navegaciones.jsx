import React, { useState, useEffect, createContext } from 'react';
import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
    ContactsOutlined,
    UserOutlined,
    LogoutOutlined,
    UserSwitchOutlined,
    BankOutlined
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Spin } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './navegaciones.scss';

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

export const Contexto = createContext();

const App = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const location = useLocation();
    const [escuelaCompleta, setEscuelaCompleta] = useState(null);
    const [rol, setRol] = useState(sessionStorage.getItem('rol') || '');
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [school, setSchool] = useState(sessionStorage.getItem('actual_school') || '');
    const [data, setData] = useState(null);
    const [selectHabilitado, setSelectHabilitado] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRolesAndSchools = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/school/myroles/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + token,
                        'School-ID': school,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
                localStorage.setItem('roles', JSON.stringify(data.roles));
                setRoles(data.roles);
                setSelectHabilitado(data.roles.length > 1);
                
                const savedRole = sessionStorage.getItem('rol');
                if (!savedRole || !data.roles.includes(savedRole)) {
                    const defaultRole = data.roles[0];
                    sessionStorage.setItem('rol', defaultRole);
                    setRol(defaultRole);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
                navigate('/landing');
            }
        };

        if (token && school) {
            fetchRolesAndSchools();
        } else {
            navigate('/landing');
        }
    }, [token, school, navigate]);

    useEffect(() => {
        try {
            const savedData = localStorage.getItem('schools');
            if (savedData) {
                const schools = JSON.parse(savedData);
                const actualSchoolPk = parseInt(sessionStorage.getItem('actual_school'), 10);
                const selectedSchool = schools.find(school => school.pk === actualSchoolPk);
                setDropdownItems(schools.map(school => ({
                    key: school.pk.toString(),
                    label: school.name,
                })));
                setEscuelaCompleta(selectedSchool);
            }
        } catch (error) {
            console.error('Error parsing school data:', error);
        }
    }, []);

    const handleMenuItemClick = ({ key }) => {
        sessionStorage.setItem('actual_school', key);
        setSchool(key);
        sessionStorage.setItem('rol', '');
        window.location.reload();
    };

    const getSelectedKey = () => {
        switch (location.pathname) {
            case '/horarios':
                return '3';
            case '/personal':
                return '4';
            case '/materias':
                return '5';
            case '/eventos':
                return '6';
            case '/perfil':
                return '7';
            default:
                return '3';
        }
    };

    const changeRol = (value) => {
        sessionStorage.setItem('rol', value);
        setRol(value);
        window.location.reload();
    };

    const cerrarSesion = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/landing');
    };

    const renderOptions = () => {
        return roles
            .filter(role => role !== sessionStorage.getItem('rol'))
            .map(role => (
                getItem(<a onClick={() => changeRol(role)}>{role}</a>)
            ));
    };

    const renderSchool = () => {
        return dropdownItems
            .filter(item => item.key !== sessionStorage.getItem('actual_school'))
            .map(item => (
                getItem(<a onClick={() => handleMenuItemClick(item.key)}>{item.label}</a>)
            ));
    };

    const defaultRol = rol || (roles.length > 0 ? roles[0] : undefined);

    let currentSchool = JSON.parse(localStorage.getItem('schools') || '[]').find(school => school.pk === Number(sessionStorage.getItem('actual_school')));
    if (!currentSchool) {
        const firstSchool = JSON.parse(localStorage.getItem('schools'))[0];
        sessionStorage.setItem('actual_school', firstSchool.pk);
        currentSchool = firstSchool;
    }

    const items = [
        dropdownItems.length >= 2
            ? getItem(currentSchool.name, '1', <BankOutlined />, renderSchool())
            : null,
        roles.length >= 2
            ? getItem(defaultRol, '2', <UserSwitchOutlined />, renderOptions())
            : null,
        getItem(<Link to="/horarios">Horarios</Link>, '3', <TableOutlined />),
        ...(rol === 'Directivo' || rol === 'Preceptor' ? [
            getItem(<Link to="/personal">Personal</Link>, '4', <TeamOutlined />),
            getItem(<Link to="/materias">Materias</Link>, '5', <ScheduleOutlined />)
        ] : []),
        getItem(<Link to="/eventos">Eventos</Link>, '6', <ContactsOutlined />),
        getItem(<Link to="/perfil">Perfil</Link>, '7', <UserOutlined />),
        getItem(<a onClick={cerrarSesion}>Cerrar sesión</a>, '8', <LogoutOutlined />),
    ].filter(Boolean); // Remove null items

    return (
        <Contexto.Provider value={{ setLoading, loading }}>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={value => setCollapsed(value)}
                    width={175}
                    collapsedWidth={50}
                    breakpoint="lg"
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 1,
                    }}
                >
                    <div className={`logo ${collapsed ? 'collapsed' : ''}`}>
                        <Dropdown
                            overlay={
                                <Menu
                                    onClick={handleMenuItemClick}
                                    items={dropdownItems.filter(role => role.key !== sessionStorage.getItem('actual_school')).map(item => ({
                                        key: item.key,
                                        label: item.label,
                                    }))}
                                    
                                />
                                
                            }
                            trigger={['click']}
                        >
                            <div onClick={e => e.preventDefault()} className="logo-img">
                                <img
                                    src={currentSchool.logo || 'https://via.placeholder.com/150'}
                                    alt="logo"
                                    style={{ width: '75%' }}
                                />
                            </div>
                        </Dropdown>
                    </div>
                    
                    <Menu theme="dark" mode='vertical' defaultSelectedKeys={[getSelectedKey()]}  items={items} />
                </Sider>
                <Layout style={{ marginLeft: collapsed ? 50 : 200 }}>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {loading ? (
                            <div className="spinner-container">
                                <Spin size="large" />
                            </div>
                        ) : (
                            children
                        )}
                    </Content>
                </Layout>

            </Layout>
        </Contexto.Provider>
    );
};

export default App;
