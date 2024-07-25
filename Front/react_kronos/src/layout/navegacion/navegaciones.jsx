import React, { useState } from 'react';
import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
    ContactsOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocation } from 'react-router-dom';
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
    getItem(<a href="http://localhost:3000/perfil">Perfil</a>, '1', <UserOutlined />),
    getItem(<a href="/">Horarios</a>, '2', <TableOutlined  />),
    getItem(<a href="http://localhost:3000/personal">Personal</a>, '3', <TeamOutlined />),
    getItem(<a href="http://localhost:3000/materias">Materias</a>, '4', <ScheduleOutlined />),
    getItem(<a href="">Eventos</a>, '5', <ContactsOutlined />)
];

const App = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const getSelectedKey = () => {
        switch (location.pathname) {
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
                    <img src="https://via.placeholder.com/150" alt="logo" className="logo-img" />
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

 