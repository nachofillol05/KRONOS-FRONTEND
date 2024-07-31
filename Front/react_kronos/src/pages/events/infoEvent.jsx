import React from 'react';
import { List, Divider } from 'antd';

export default function InfoWorker({ event }) {
    const data = [
        'Matematica',
        'Quimica',
        'Fisica',
        'Programacion',
    ];

    function calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Calcular la diferencia en tiempo
        const differenceInTime = end - start;
    
        // Calcular la diferencia en días
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))+1;
        return differenceInDays;
    }

    const duracion = calculateDuration(event.start_date, event.end_date);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>Claves del evento</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <label>Nombre:</label>
                <label>{event.title}</label>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <label>Tipo:</label>
                <label>{event.type_event.name}</label>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <label>Descripcion:</label>
                <label>{event.description}</label>
            </div>
            <Divider />
            <h3>Fechas</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <label>Fecha de inicio:</label>
                <label>{event.start_date}</label>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <label>Fecha de fin:</label>
                <label>{event.end_date}</label>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <label>Duración:</label>
                <label>{duracion} días</label>
            </div>
            <Divider />
            <h3>Personal Aderido</h3>
            <List
                size="small"
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </div>
    );
}
