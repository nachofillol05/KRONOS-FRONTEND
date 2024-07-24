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
//<UserOutlined />
const items = [
    
    getItem(<a href="http://localhost:3000/perfil">Perfil</a>, '1', <img src="data:image/jpeg;base64,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" alt="logo" style={{ width: '14px', height: '14px' }}/>),
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


 