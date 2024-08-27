import { React, useState,useEffect } from 'react';
import { FloatButton, Drawer, Button, Tooltip, Segmented, DatePicker } from 'antd';
import {
    InsertRowAboveOutlined, DownOutlined, UpOutlined, DownloadOutlined, HistoryOutlined, CloseOutlined, AppstoreOutlined, UserSwitchOutlined
    , EyeOutlined, EditOutlined, FilterOutlined
} from '@ant-design/icons';
import SelectTeacher from './selectTeacher.jsx';
import Historial from './historial.jsx';
import Horas from './infoHour.jsx';
import SelectCourse from './selectCourses.jsx';
import './horarios.scss';
import FilterDropdownTable from '../../components/filterDropTable/FilterDropTable.jsx';
import Calendario from '../../components/calendario/CalendarioPrueba.jsx';

const format = 'DD/MM/YYYY';

export default function Horario({ handleOpenDrawer, handleCloseDrawer }) {
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);
    const [subjects, setSubjects] = useState([]); 

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/viewschedule/", {
          method: "GET",
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "School-ID": sessionStorage.getItem("actual_school"),
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("aaaaaaaaaaaaaaaaaaaaa",data);
            setSubjects(data);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, []);

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
            <div className="contenedor-filtros contenedor-filtros-horario">
                <Segmented
                size='large'
                    options={[
                        {

                            value: 'List',
                            icon: <> <EditOutlined /> Editar</>,
                        },
                        {
                            value: 'Kanban',
                            icon: <><EyeOutlined /> Visualizar</>
                        },
                    ]}
                />

                <FilterDropdownTable placeholder={'Dias: '} />
                <FilterDropdownTable placeholder={'Profesores: '} />
                <FilterDropdownTable placeholder={'Cursos: '} />
                <DatePicker size='large' format={format} />
                <Button icon={<FilterOutlined />} size='large' type='primary'>
                    Filtrar
                </Button>
            </div>
            <Calendario subjects={subjects} />

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
                <FloatButton icon={<InsertRowAboveOutlined />} type='primary' tooltip="Horas catedra"
                    onClick={() => showDrawer(
                        <Horas showDrawer={showDrawer} />
                        , 'Horas catedra'
                    )}
                />
                <FloatButton icon={<AppstoreOutlined />} type='primary' tooltip='Cursos'
                    onClick={() => showDrawer(
                        <SelectCourse showDrawer={showDrawer} />
                        , 'Cursos'
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
