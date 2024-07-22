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
    getItem(<a href="/">Perfil</a>, '1', <UserOutlined />),
    getItem(<a href="">Horarios</a>, '2', <TableOutlined  />),
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
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            
            <Sider 
            collapsible 
            siderBg='red'
            collapsed={collapsed} 
            onCollapse={(value) => setCollapsed(value)} 
            width={200} 
            collapsedWidth={50}
            bodyBg='red'>
                <Menu theme="dark" defaultSelectedKeys={[getSelectedKey()]} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Content >  
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
/*{!collapsed && 
    <div style={{ padding: '16px', textAlign: 'center'}}>
    <h1 style={{ fontSize: '18px', margin: 0 }}>Colegio</h1>
        <img src="https://via.placeholder.com/150" alt="logo" style={{ width: '55px%', marginBottom: '10px' }} />
        
    </div>}*/

export default App;


 