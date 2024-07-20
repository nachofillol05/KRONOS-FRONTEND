import React, { useState } from 'react';
import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
    ContactsOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
    getItem('Horarios', '1', <TableOutlined  />),
    getItem('Personal', '2', <TeamOutlined />),
    getItem('Materias', '3', <ScheduleOutlined />),
    getItem('Eventos', '4', <ContactsOutlined />,)
];


const App = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
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
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Content >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;