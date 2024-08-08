import { React, useState } from 'react';
import { FloatButton, Drawer, Button } from 'antd';
import { InsertRowAboveOutlined,DownOutlined, UpOutlined, DownloadOutlined, HistoryOutlined, CloseOutlined, AppstoreOutlined, UserSwitchOutlined } from '@ant-design/icons';
/*Drawers*/
import SelectTeacher from './selectTeacher.jsx';
import Historial from './historial.jsx';
import Horas from './infoHour.jsx';
import SelectCourse from './selectCourses.jsx';

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
                <FloatButton icon={<UserSwitchOutlined />} type='primary' tooltip="Seleccionar profesores"
                    onClick={() => showDrawer(
                        <SelectTeacher />
                        , 'Seleccione un profesor'
                    )}
                />
                <FloatButton icon={<HistoryOutlined />} type='primary' tooltip="Historial de cambios"
                    onClick={() => showDrawer(
                        <Historial />
                        , 'Historial de cambios'
                    )}
                />
                <FloatButton icon={< InsertRowAboveOutlined/>} type='primary' tooltip="Horas catedra"
                    onClick={() => showDrawer(
                        <Horas showDrawer={showDrawer}  />
                        , 'Horas catedra'
                    )}
                />
                                <FloatButton icon={<AppstoreOutlined />} type='primary' tooltip='Cursos'
                    onClick={() => showDrawer(
                        <SelectCourse showDrawer={showDrawer}  />
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