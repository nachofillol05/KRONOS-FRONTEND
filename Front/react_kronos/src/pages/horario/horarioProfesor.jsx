import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import CalendarioProfesor from '../../components/calendario/CalendarioProfesor.jsx';
import './horarios.scss';
const format = 'DD/MM/YYYY';

function HorarioProfesor() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/ViewTeacherSchedule/", {
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
            .then(data => setSubjects(data), setLoading(false))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    console.log(subjects)
    return (
        <Spin
            spinning={subjects.length==0}>
            {/*<div className="contenedor-filtros contenedor-filtros-horario">
                <DatePicker size='large' format={format} />
                <Button icon={<FilterOutlined />} size='large' type='primary'>
                    Filtrar
                </Button>
            </div>*/}
            <CalendarioProfesor subjects={subjects} />
        </Spin>
    );
}

export default HorarioProfesor;
