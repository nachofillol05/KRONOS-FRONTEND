import { React, useState } from 'react';
import { FloatButton, Drawer, Button } from 'antd';
import { DownOutlined, UpOutlined, DownloadOutlined, FileAddOutlined, CloseOutlined, AppstoreOutlined, UserSwitchOutlined } from '@ant-design/icons';
/*Drawers*/
import Historial from './historial.jsx';
import Horas from './horas.jsx';

export default function Horario({ handleOpenDrawer, handleCloseDrawer }) {
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [value, setValue] = useState('');


    const showDrawer = (content, title) => {
        setDrawerTitle(title);
        setDrawerContent(content);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setDrawerContent(null);
    };

    return (
        <>
            <div>
                <h1>Horario</h1>
            </div>

            <FloatButton.Group
                visibilityHeight={1500}
                trigger="click"
                type="primary"
                closeIcon={<DownOutlined />}
                icon={<UpOutlined />}
            >
                <FloatButton icon={<DownloadOutlined />} tooltip="Descargar tabla" />
                <FloatButton icon={<FileAddOutlined />} type='primary' tooltip="Agregar una materia"
                    onClick={() => showDrawer(
                        <UserSwitchOutlined />
                        , 'Historial de cambios'
                    )}
                />
                <FloatButton icon={<FileAddOutlined />} type='primary' tooltip="Agregar una materia"
                    onClick={() => showDrawer(
                        <Historial />
                        , 'Historial de cambios'
                    )}
                />
                <FloatButton icon={<AppstoreOutlined />} type='primary' tooltip="Horas catedra"
                    onClick={() => showDrawer(
                        <Horas showDrawer={showDrawer}  />
                        , 'Horas catedra'
                    )}
                />
            </FloatButton.Group>
            <Drawer

                destroyOnClose={false}
                width={600}
                title={drawerTitle}
                onClose={onClose}
                open={open}
                closeIcon={false}
                extra={
                    <Button onClick={onClose} size='large' type='tertiary' icon={<CloseOutlined />} />
                }
            >
                <div style={{ width: '100%', height: '100%' }}>
                    {drawerContent}
                </div>
            </Drawer>
        </>
    );
}