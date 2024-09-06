import React, { Suspense, lazy, useState, useEffect, useCallback, useMemo } from 'react';
import { FloatButton, Drawer, Button, Segmented, DatePicker } from 'antd';
import {
    InsertRowAboveOutlined, DownOutlined, UpOutlined, DownloadOutlined, HistoryOutlined, CloseOutlined, AppstoreOutlined, UserSwitchOutlined,
    EyeOutlined, EditOutlined, FilterOutlined
} from '@ant-design/icons';
import CalendarioProfesor from '../../components/calendario/CalendarioProfesor.jsx';
import './horarios.scss';
const format = 'DD/MM/YYYY';

function HorarioProfesor() {
    const [subjects, setSubjects] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/viewschedule/", {
            method: "GET",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
                "School-ID": sessionStorage.getItem("actual_school"),
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => setSubjects(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);


    return (
        <>
            <div className="contenedor-filtros contenedor-filtros-horario">
                <DatePicker size='large' format={format} />
                <Button icon={<FilterOutlined />} size='large' type='primary'>
                    Filtrar
                </Button>
            </div>
            <CalendarioProfesor subjects={subjects} />
        </>
    );
}

export default HorarioProfesor;