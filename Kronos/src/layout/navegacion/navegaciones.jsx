import React, { useState, useEffect, createContext } from 'react';
import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
    ContactsOutlined,
    UserOutlined,
    LogoutOutlined,
    UserSwitchOutlined,
    BankOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Drawer, Spin, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './navegaciones.scss';

const { Content, Sider } = Layout;

function getItem(label, key, icon, children, onClick) {
    return {
        key,
        icon,
        children,
        label,
        onClick,
    };
}

export const Contexto = createContext();

const App = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);
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
    const [isMobile, setIsMobile] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize(); // Check on initial load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                navigate('/login');
            }
        };
        if (token && school) {
            fetchRolesAndSchools();
        } else {
            navigate('/login');
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
    if (!localStorage.getItem('token')) {
        navigate('/login');
        return null;
    }

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
                return '7';
        }
    };

    const changeRol = (value) => {
        sessionStorage.setItem('rol', value);
        setRol(value);
        setDrawerVisible(false);
        window.location.reload();
    };

    const cerrarSesion = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
    };

    const renderOptions = () => {
        return roles
            .filter(role => role !== sessionStorage.getItem('rol'))
            .map(role => (
                getItem(<a onClick={() => { changeRol(role) }}>{role}</a>)
            ));
    };

    const renderSchool = () => {
        return dropdownItems
            .filter(item => item.key !== sessionStorage.getItem('actual_school'))
            .map(item => (
                getItem(
                    <a
                        onClick={async () => {
                            sessionStorage.setItem('actual_school', item.key);
                            setSchool(item.key);
                            sessionStorage.setItem('rol', '');
                            await new Promise(resolve => {
                                setTimeout(() => {
                                    setDrawerVisible(false);
                                    window.location.reload();
                                    resolve();
                                }, 100);
                            });
                            
                        }}
                    >
                        {item.label}
                    </a>
                )
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
        getItem(<Link to="/horarios">Horarios</Link>, '3', <TableOutlined />, null, () => setDrawerVisible(false)),
        ...(rol === 'Directivo' || rol === 'Preceptor' ? [
            getItem(<Link to="/personal">Personal</Link>, '4', <TeamOutlined />, null, () => setDrawerVisible(false)),
            getItem(<Link to="/materias">Materias</Link>, '5', <ScheduleOutlined />, null, () => setDrawerVisible(false)),
        ] : []),
        getItem(<Link to="/eventos">Eventos</Link>, '6', <ContactsOutlined />, null, () => setDrawerVisible(false)),
        getItem(<Link to="/perfil">Perfil</Link>, '7', <UserOutlined />, null, () => setDrawerVisible(false)),
        getItem(<a onClick={() => { cerrarSesion(); setDrawerVisible(false); }}>Cerrar sesión</a>, '8', <LogoutOutlined />),
    ].filter(Boolean);

    const menu = (
        <Menu
            theme='light'
            mode='vertical'
            defaultSelectedKeys={[getSelectedKey()]}
            items={items}
        />
    );

    return (
        <Contexto.Provider value={{ setLoading, loading }}>
            <Layout style={{ minHeight: '100vh' }}>
                {!isMobile ? (
                    <Sider
                        theme='light'
                        collapsible
                        collapsed={collapsed}
                        onCollapse={value => setCollapsed(value)}
                        width={175}
                        collapsedWidth={50}
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
                        <div className={`logo-img ${collapsed && 'logo-img-collapsed'}`}>
                            <img
                                src={currentSchool.logo || 'https://via.placeholder.com/150'}
                                alt="logo"
                                style={{ width: '100%' }}
                            />
                        </div>
                        {menu}
                    </Sider>
                ) : (
                    <>
                        <Button
                            icon={<MenuOutlined />}
                            onClick={() => setDrawerVisible(true)}
                            style={{ position: 'fixed', top: 16, right: 16, zIndex: 2 }}
                        />
                        <Drawer
                            title="Menú"
                            placement="left"
                            closable
                            onClose={() => setDrawerVisible(false)}
                            visible={drawerVisible}
                            width={250} // Limita el ancho del Drawer a 250px
                            >
                            {menu}
                            </Drawer>
                    </>
                )}

                <Layout
                className="site-layout"
                style={{
                    marginLeft: isMobile ? 0 : 20, // Ajuste de espacio dependiendo del estado
                    transition: 'margin-left 0.3s',
                }}
                >
                    <Content
                        style={{
                            padding: '0 5%',
                            overflow: 'initial',
                            minHeight: '100vh',
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Contexto.Provider>
    );
};

export default App;
