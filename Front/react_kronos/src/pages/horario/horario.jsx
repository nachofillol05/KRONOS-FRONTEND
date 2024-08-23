import { React, useState } from 'react';
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
    const [hoveredInfo, setHoveredInfo] = useState('');

    const handleMouseEnter = (info) => {
        setHoveredInfo(info);
    };

    const handleMouseLeave = () => {
        setHoveredInfo('');
    };

    const showDrawer = (content, title) => {
        setDrawerTitle(title);
        setDrawerContent(content);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setDrawerContent(null);
    };

    const hours = ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°', '10°', '11°'];
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const courses = [
        '1°A', '1°B', '1°C',
        '2°A', '2°B', '2°C',
        '3°A', '3°B', '3°C',
        '4°A', '4°B', '4°C',
        '5°A', '5°B', '5°C',
        '6°A', '6°B', '6°C',
        '7°A', '7°B', '7°C'
    ];

    // Inicializando scheduleList con varias materias
    const scheduleList = [
        { course: '1°A', day: 'Lunes', module: '1°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '1°A', day: 'Lunes', module: '2°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '1°A', day: 'Martes', module: '3°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '1°A', day: 'Martes', module: '4°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '1°A', day: 'Miércoles', module: '5°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '1°A', day: 'Miércoles', module: '6°', abbreviation: 'BIO', color: '#5733FF' },
        { course: '1°A', day: 'Jueves', module: '7°', abbreviation: 'ART', color: '#FF5733' },
        { course: '1°A', day: 'Jueves', module: '8°', abbreviation: 'MUS', color: '#33FFBD' },
        { course: '1°A', day: 'Viernes', module: '9°', abbreviation: 'PHY', color: '#FF5733' },
        { course: '1°A', day: 'Viernes', module: '10°', abbreviation: 'CHE', color: '#BD33FF' },

        { course: '1°B', day: 'Lunes', module: '1°', abbreviation: 'ENG', color: '#FF33A6' },
        { course: '1°B', day: 'Lunes', module: '2°', abbreviation: 'MAT', color: '#FFBD33' },
        { course: '1°B', day: 'Martes', module: '3°', abbreviation: 'HIS', color: '#FF5733' },
        { course: '1°B', day: 'Martes', module: '4°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '1°B', day: 'Miércoles', module: '5°', abbreviation: 'GEO', color: '#5733FF' },
        { course: '1°B', day: 'Miércoles', module: '6°', abbreviation: 'BIO', color: '#FF33A6' },
        { course: '1°B', day: 'Jueves', module: '7°', abbreviation: 'ART', color: '#BD33FF' },
        { course: '1°B', day: 'Jueves', module: '8°', abbreviation: 'PHY', color: '#FFBD33' },
        { course: '1°B', day: 'Viernes', module: '9°', abbreviation: 'CHE', color: '#33FFBD' },
        { course: '1°B', day: 'Viernes', module: '10°', abbreviation: 'MUS', color: '#FF5733' },

        { course: '1°C', day: 'Lunes', module: '1°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '1°C', day: 'Lunes', module: '2°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '1°C', day: 'Martes', module: '3°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '1°C', day: 'Martes', module: '4°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '1°C', day: 'Miércoles', module: '5°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '1°C', day: 'Miércoles', module: '6°', abbreviation: 'BIO', color: '#5733FF' },
        { course: '1°C', day: 'Jueves', module: '7°', abbreviation: 'ART', color: '#FF5733' },
        { course: '1°C', day: 'Jueves', module: '8°', abbreviation: 'PHY', color: '#BD33FF' },
        { course: '1°C', day: 'Viernes', module: '9°', abbreviation: 'CHE', color: '#FFBD33' },
        { course: '1°C', day: 'Viernes', module: '10°', abbreviation: 'MUS', color: '#33FFBD' },

        { course: '2°A', day: 'Lunes', module: '1°', abbreviation: 'ENG', color: '#FF33A6' },
        { course: '2°A', day: 'Lunes', module: '2°', abbreviation: 'MAT', color: '#FFBD33' },
        { course: '2°A', day: 'Martes', module: '3°', abbreviation: 'HIS', color: '#FF5733' },
        { course: '2°A', day: 'Martes', module: '4°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '2°A', day: 'Miércoles', module: '5°', abbreviation: 'GEO', color: '#5733FF' },
        { course: '2°A', day: 'Miércoles', module: '6°', abbreviation: 'BIO', color: '#FF33A6' },
        { course: '2°A', day: 'Jueves', module: '7°', abbreviation: 'ART', color: '#BD33FF' },
        { course: '2°A', day: 'Jueves', module: '8°', abbreviation: 'PHY', color: '#FFBD33' },
        { course: '2°A', day: 'Viernes', module: '9°', abbreviation: 'CHE', color: '#33FFBD' },
        { course: '2°A', day: 'Viernes', module: '10°', abbreviation: 'MUS', color: '#FF5733' },
        { course: '1°C', day: 'Lunes', module: '1°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '1°C', day: 'Martes', module: '2°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '2°A', day: 'Miércoles', module: '3°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '3°B', day: 'Jueves', module: '4°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '4°C', day: 'Viernes', module: '5°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '1°A', day: 'Lunes', module: '2°', abbreviation: 'BIO', color: '#8E44AD' },
        { course: '2°B', day: 'Martes', module: '3°', abbreviation: 'PHY', color: '#3498DB' },
        { course: '3°C', day: 'Miércoles', module: '4°', abbreviation: 'CHE', color: '#1ABC9C' },
        { course: '4°A', day: 'Jueves', module: '5°', abbreviation: 'LIT', color: '#E74C3C' },
        { course: '5°B', day: 'Viernes', module: '6°', abbreviation: 'ART', color: '#F39C12' },
        { course: '6°C', day: 'Lunes', module: '3°', abbreviation: 'HIS', color: '#C0392B' },
        { course: '7°A', day: 'Martes', module: '4°', abbreviation: 'GEO', color: '#27AE60' },
        { course: '1°B', day: 'Miércoles', module: '1°', abbreviation: 'MAT', color: '#9B59B6' },
        { course: '2°C', day: 'Jueves', module: '2°', abbreviation: 'ENG', color: '#2980B9' },
        { course: '3°A', day: 'Viernes', module: '3°', abbreviation: 'SCI', color: '#16A085' },
        { course: '4°B', day: 'Lunes', module: '4°', abbreviation: 'PHY', color: '#F1C40F' },
        { course: '5°C', day: 'Martes', module: '5°', abbreviation: 'BIO', color: '#E67E22' },
        { course: '6°A', day: 'Miércoles', module: '6°', abbreviation: 'CHE', color: '#D35400' },
        { course: '7°B', day: 'Jueves', module: '7°', abbreviation: 'LIT', color: '#2ECC71' },
        { course: '1°C', day: 'Viernes', module: '8°', abbreviation: 'ART', color: '#EC7063' },
        { course: '2°A', day: 'Lunes', module: '5°', abbreviation: 'GEO', color: '#AF7AC5' },
        { course: '3°B', day: 'Martes', module: '6°', abbreviation: 'HIS', color: '#45B39D' },
        { course: '4°C', day: 'Miércoles', module: '7°', abbreviation: 'SCI', color: '#3498DB' },
        { course: '5°A', day: 'Jueves', module: '8°', abbreviation: 'MAT', color: '#E74C3C' },
        { course: '6°B', day: 'Viernes', module: '9°', abbreviation: 'ENG', color: '#52BE80' },
        { course: '7°C', day: 'Lunes', module: '10°', abbreviation: 'BIO', color: '#F5B041' },
        { course: '1°A', day: 'Martes', module: '1°', abbreviation: 'CHE', color: '#58D68D' },
        { course: '2°B', day: 'Miércoles', module: '2°', abbreviation: 'PHY', color: '#7FB3D5' },
        { course: '3°C', day: 'Jueves', module: '3°', abbreviation: 'LIT', color: '#EC7063' },
        { course: '4°A', day: 'Viernes', module: '4°', abbreviation: 'ART', color: '#F0B27A' },
        { course: '5°B', day: 'Lunes', module: '11°', abbreviation: 'HIS', color: '#D5DBDB' },
        { course: '6°C', day: 'Martes', module: '7°', abbreviation: 'GEO', color: '#1ABC9C' },
        { course: '7°A', day: 'Miércoles', module: '8°', abbreviation: 'SCI', color: '#16A085' },
        { course: '1°B', day: 'Jueves', module: '9°', abbreviation: 'MAT', color: '#E74C3C' },
        { course: '2°C', day: 'Viernes', module: '10°', abbreviation: 'ENG', color: '#3498DB' },
        { course: '3°A', day: 'Lunes', module: '11°', abbreviation: 'BIO', color: '#2ECC71' },
        { course: '4°B', day: 'Martes', module: '6°', abbreviation: 'CHE', color: '#E67E22' },
        { course: '5°C', day: 'Miércoles', module: '5°', abbreviation: 'PHY', color: '#9B59B6' },
        { course: '6°A', day: 'Jueves', module: '4°', abbreviation: 'LIT', color: '#2980B9' },
        { course: '7°B', day: 'Viernes', module: '3°', abbreviation: 'ART', color: '#52BE80' },
        { course: '1°A', day: 'Lunes', module: '1°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '1°A', day: 'Lunes', module: '2°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '1°A', day: 'Martes', module: '3°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '1°A', day: 'Martes', module: '4°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '1°A', day: 'Miércoles', module: '5°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '1°A', day: 'Miércoles', module: '6°', abbreviation: 'ART', color: '#33CFFF' },
        { course: '1°B', day: 'Jueves', module: '1°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '1°B', day: 'Jueves', module: '2°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '1°B', day: 'Viernes', module: '3°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '1°C', day: 'Viernes', module: '4°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '2°A', day: 'Lunes', module: '5°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '2°A', day: 'Lunes', module: '6°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '2°A', day: 'Martes', module: '1°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '2°A', day: 'Martes', module: '2°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '2°B', day: 'Miércoles', module: '3°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '2°B', day: 'Miércoles', module: '4°', abbreviation: 'ART', color: '#33CFFF' },
        { course: '2°B', day: 'Jueves', module: '5°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '2°C', day: 'Jueves', module: '6°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '3°A', day: 'Viernes', module: '1°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '3°A', day: 'Viernes', module: '2°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '3°B', day: 'Lunes', module: '3°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '3°B', day: 'Lunes', module: '4°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '3°B', day: 'Martes', module: '5°', abbreviation: 'ART', color: '#33CFFF' },
        { course: '3°C', day: 'Martes', module: '6°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '4°A', day: 'Miércoles', module: '1°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '4°A', day: 'Miércoles', module: '2°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '4°B', day: 'Jueves', module: '3°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '4°B', day: 'Jueves', module: '4°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '4°C', day: 'Viernes', module: '5°', abbreviation: 'ART', color: '#33CFFF' },
        { course: '5°A', day: 'Viernes', module: '6°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '5°B', day: 'Lunes', module: '1°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '5°C', day: 'Lunes', module: '2°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '6°A', day: 'Martes', module: '3°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '6°B', day: 'Martes', module: '4°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '6°C', day: 'Miércoles', module: '5°', abbreviation: 'ART', color: '#33CFFF' },
        { course: '7°A', day: 'Miércoles', module: '6°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '7°B', day: 'Jueves', module: '1°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '7°C', day: 'Jueves', module: '2°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '7°A', day: 'Viernes', module: '3°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '7°B', day: 'Viernes', module: '4°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '7°C', day: 'Viernes', module: '5°', abbreviation: 'ART', color: '#33CFFF' },
        { course: '6°C', day: 'Jueves', module: '6°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '5°C', day: 'Jueves', module: '7°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '4°C', day: 'Jueves', module: '8°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '3°C', day: 'Jueves', module: '9°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '2°C', day: 'Jueves', module: '10°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '1°C', day: 'Jueves', module: '11°', abbreviation: 'ART', color: '#33CFFF' },
        { course: '7°A', day: 'Viernes', module: '6°', abbreviation: 'MAT', color: '#FF5733' },
        { course: '7°B', day: 'Viernes', module: '7°', abbreviation: 'SCI', color: '#33FF57' },
        { course: '7°C', day: 'Viernes', module: '8°', abbreviation: 'ENG', color: '#3357FF' },
        { course: '7°A', day: 'Lunes', module: '9°', abbreviation: 'HIS', color: '#FF33A6' },
        { course: '7°B', day: 'Lunes', module: '10°', abbreviation: 'GEO', color: '#FFBD33' },
        { course: '7°C', day: 'Lunes', module: '11°', abbreviation: 'ART', color: '#33CFFF' },
    ];

    const [schedule, setSchedule] = useState(
        Array.from({ length: courses.length }, () => Array(hours.length * days.length).fill(''))
    );

    const handleInputChange = (courseIndex, hourIndex, dayIndex, event) => {
        const newSchedule = schedule.map((course, i) =>
            i === courseIndex
                ? course.map((subject, j) =>
                    j === (hourIndex * days.length + dayIndex)
                        ? event.target.value
                        : subject
                )
                : course
        );
        setSchedule(newSchedule);
    };

    const getInitialValueAndColor = (course, day, module) => {
        const foundSubject = scheduleList.find(item =>
            item.course === course && item.day === day && item.module === module
        );
        return foundSubject ? { value: foundSubject.abbreviation, color: foundSubject.color } : { value: '', color: 'transparent' };
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
            <Calendario />

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
