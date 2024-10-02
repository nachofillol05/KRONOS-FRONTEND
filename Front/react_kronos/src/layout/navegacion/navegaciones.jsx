import React, { useState, useEffect, createContext } from 'react';
import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
    ContactsOutlined,
    UserOutlined,
    LogoutOutlined,
    UserSwitchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Select, Spin } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './navegaciones.scss';

const { Content, Sider } = Layout;
const { Option } = Select;

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
                if (sessionStorage.getItem('rol') === '') {
                    sessionStorage.setItem('rol', data.roles[0]);
                    setRol(data.roles[0]);
                }
                if (!data.roles.includes(sessionStorage.getItem('rol'))) {
                    sessionStorage.setItem('rol', data.roles[0]);
                    setRol(data.roles[0]);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
                navigate('/landing');
            }
        };

        fetchRolesAndSchools();
    }, [token, school, navigate]);

    useEffect(() => {
        const savedData = localStorage.getItem('schools');
        const schools = JSON.parse(savedData || '[]');
        const actualSchoolPk = parseInt(sessionStorage.getItem('actual_school'), 10);
        const selectedSchool = schools.find(school => school.pk === actualSchoolPk);
        const parsedData = JSON.parse(savedData);
        setDropdownItems(parsedData.map(school => ({
            key: school.pk.toString(),
            label: school.name,
        })));
        setEscuelaCompleta(selectedSchool);

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
                return '1';
            case '/personal':
                return '2';
            case '/materias':
                return '3';
            case '/eventos':
                return '4';
            case '/perfil':
                return '5';
            default:
                return '1';
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

    const defaultRol = rol || (roles.length > 0 ? roles[0] : undefined);

    let currentSchool = JSON.parse(localStorage.getItem('schools')).find(school => school.pk === Number(sessionStorage.getItem('actual_school')));
    if (!currentSchool) {
        console.log(JSON.parse(localStorage.getItem('schools'))[0].pk);
        sessionStorage.setItem('actual_school', JSON.parse(localStorage.getItem('schools'))[0].pk);
        currentSchool = JSON.parse(localStorage.getItem('schools')).find(school => school.pk === Number(sessionStorage.getItem('actual_school')));;
    }

    const items = [
        getItem(
            defaultRol, 
            '0', 
            <UserSwitchOutlined />, 
            roles.length >= 2 ? renderOptions() : null
        ),
        getItem(<Link to="/horarios">Horarios</Link>, '1', <TableOutlined />),
        ...((rol === 'Directivo' || rol === 'Preceptor') ? [
            getItem(<Link to="/personal">Personal</Link>, '2', <TeamOutlined />),
            getItem(<Link to="/materias">Materias</Link>, '3', <ScheduleOutlined />)
        ] : []),
        getItem(<Link to="/eventos">Eventos</Link>, '4', <ContactsOutlined />),
        getItem(<Link to="/perfil">Perfil</Link>, '5', <UserOutlined />),
        getItem(<a onClick={cerrarSesion}>Cerrar sesión</a>, '6', <LogoutOutlined />),
    ];

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
                                    title={currentSchool.name}
                                    style={{ width: '75%' }}
                                />
                            </div>
                        </Dropdown>
                        {/*
                        <Select
                            placeholder="Rol"
                            className={`logo-select ${selectHabilitado ? '' : 'custom-disabled-select'}`}
                            onChange={changeRol}
                            value={defaultRol}
                            style={{
                                width: '75%',
                                pointerEvents: selectHabilitado ? 'auto' : 'none',
                            }}
                        >
                            {renderOptions()}
                        </Select>*/}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={[getSelectedKey()]} mode="inline" items={items} />
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
