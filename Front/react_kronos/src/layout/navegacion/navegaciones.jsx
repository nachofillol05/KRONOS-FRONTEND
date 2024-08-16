import React, { useState, useEffect } from 'react';
import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
    ContactsOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Select } from 'antd';
import { Link, useLocation,useNavigate } from 'react-router-dom';

import './navegaciones.scss'; 

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}


const App = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const location = useLocation();
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [escuelaCompleta, setEscuelaCompleta] = useState(null);
    const [rol, setRol] = useState(sessionStorage.getItem('rol'));
    const [roles, setRoles] = useState(JSON.parse(localStorage.getItem('roles')));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [school, setSchool] = useState(sessionStorage.getItem('actual_school'));
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    //AGREGAR UNA COMPROBACION PARA VER SI EL USUARIO TIENE ESE ROL ENSERIO PORQUE SINO SE PODRIA CAMBIAR DESDE EL SESSION STORAGE
    // Y VER COSAS QUE NO DEBERIA . AUNQUE SEA EN LO IMPORTANTE COMO MOSTRARLE ESO O SOLO AL ENTRAR A LAS PAGINAS EN LA DIRECTIVEROUTE
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/school/myroles/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + token,
                'School-ID': school,
            },
        }).then(response => response.json())
        .then(data => {
            setData(data);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [rol]);
    const items = [
        getItem(<Link to="/perfil">Perfil</Link>, '1', <UserOutlined />),
        getItem(<Link to="/horarios">Horarios</Link>, '2', <TableOutlined />),
        ...(rol==='Directivo'&& JSON.stringify(data).includes("Directivo") === true ? [
            getItem(<Link to="/personal">Personal</Link>, '3', <TeamOutlined />),
            getItem(<Link to="/materias">Materias</Link>, '4', <ScheduleOutlined />)
        ] : []),
        getItem(<Link to="/eventos">Eventos</Link>, '5', <ContactsOutlined />),
        getItem(<a onClick={cerrarSesion}>Cerrar sesion</a>, '6',<LogoutOutlined/>),
    ];
    

    if (sessionStorage.getItem('actual_school') == null) {
        const school = JSON.parse(localStorage.getItem('schools'));
        console.log(school[0]);
        sessionStorage.setItem('actual_school',school[0].pk);
    }
    if (sessionStorage.getItem('rol') == null) {
        const roles = JSON.parse(localStorage.getItem('roles'));
        console.log(roles[0]);
        sessionStorage.setItem('rol',roles[0]);
    }
    
        //Esto es para el logo(?)
    useEffect(() => {
        const savedData = localStorage.getItem('schools');
        const schools = JSON.parse(localStorage.getItem('schools') || '[]');
        const actualSchoolPk = parseInt(sessionStorage.getItem('actual_school'), 10);
        console.log(savedData);
        console.log(actualSchoolPk);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setDropdownItems(parsedData.map(school => ({
                key: school.pk.toString(),
                label: school.name,
            })));
            const selectedSchool = schools.find(school => school.pk === actualSchoolPk);
            
            console.log(selectedSchool.logo);
            //setEscuelaCompleta(selectedSchool.logo);
        }
    }, []);

    const handleMenuItemClick = ({ key }) => {
        sessionStorage.setItem('actual_school', key);
        console.log(sessionStorage.getItem('actual_school'))
        window.location.reload();
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

    const changeRol = (value) => {
        sessionStorage.setItem('rol', value);
        window.location.reload();
    }
    function cerrarSesion() {
        localStorage.setItem('token', '');
        navigate('/login');
    }
    //cambiar el default value del select por sessionStorage.getItem('rol')
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={200}
                collapsedWidth={50}
                breakpoint="lg" // Ajuste del punto de ruptura
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
                                src={escuelaCompleta ? escuelaCompleta : 'data:image/jpeg;base64,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'}
                                alt="logo"
                                className="logo-img"
                            />
                        </a>
                    </Dropdown>
                    <Select
                        placeholder="Rol"
                        className="logo-img"
                        onChange={(value) => changeRol(value)}
                        defaultValue={rol} 
                    >
                    {roles.map((role) => (
                        <Option key={role} value={role}>
                        {role}
                        </Option>
                    ))}
                </Select>
                
                </div>
                <Menu theme="dark" defaultSelectedKeys={[getSelectedKey()]} mode="inline" items={items} />
                
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 50 : 200 }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    {children}
                </Content>
            </Layout>
            
        </Layout>
    );
};

export default App;

