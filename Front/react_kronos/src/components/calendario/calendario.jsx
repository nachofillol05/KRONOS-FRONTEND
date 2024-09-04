// src/Calendario.js
import React, { useState } from 'react';
import './Calendario.css';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const hours = ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°', '10°', '11°'];

const courses = [
    'MODULOS',
    '1°A', '1°B', '1°C',
    '2°A', '2°B', '2°C',
    '3°A', '3°B', '3°C',
    '4°A', '4°B', '4°C',
    '5°A', '5°B', '5°C',
    '6°A', '6°B', '6°C',
    '7°A', '7°B', '7°C'
];

const subjects = [
    { value: 'MAT', label: 'Matemática', color: 'red' },
    { value: 'LEN', label: 'Lengua', color: 'darkgreen' },
    { value: 'BIO', label: 'Biología', color: 'limegreen' },
    { value: 'QIM', label: 'Química', color: 'violet' },
    { value: 'MUS', label: 'Música', color: 'yellow' }
];

function Calendario() {
    const [schedule, setSchedule] = useState(
        Array.from({ length: courses.length }, () => Array(hours.length * days.length).fill(''))
    );
    const [selectedCell, setSelectedCell] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSubjectSelect = (subject) => {
        if (selectedCell) {
            const { courseIndex, hourIndex, dayIndex } = selectedCell;
            const newSchedule = schedule.map((course, i) =>
                i === courseIndex
                    ? course.map((item, j) =>
                        j === (hourIndex * days.length + dayIndex)
                            ? subject
                            : item
                    )
                    : course
            );
            setSchedule(newSchedule);
            setSelectedCell(null);
            setSearchText(''); // Limpiar el texto de búsqueda
        }
    };

    const handleCellClick = (courseIndex, hourIndex, dayIndex) => {
        setSelectedCell({ courseIndex, hourIndex, dayIndex });
    };

    const filteredSubjects = subjects.filter(
        (subject) =>
            subject.label.toLowerCase().includes(searchText.toLowerCase()) ||
            subject.value.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="Calendario">
            <table>
                <thead>
                    <tr>
                        <th>Día</th>
                        {courses.map((course, index) => (
                            <th key={index}>{course}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {days.map((day, dayIndex) => (
                        hours.map((hour, hourIndex) => (
                            <tr key={`${dayIndex}-${hourIndex}`}>
                                {hourIndex === 0 && <td rowSpan={hours.length}>{day}</td>}
                                <td>{hour}</td>
                                {courses.map((course, courseIndex) => (
                                    <td
                                        key={`${courseIndex}-${dayIndex}-${hourIndex}`}
                                        style={{
                                            backgroundColor: schedule[courseIndex][hourIndex * days.length + dayIndex]?.color || 'white',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleCellClick(courseIndex, hourIndex, dayIndex)}
                                    >
                                        {schedule[courseIndex][hourIndex * days.length + dayIndex]?.label || ''}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
            {selectedCell && (
                <div
                    
                    className="dropdown"
                    style={{
                        position: 'absolute',
                        bottom: `${selectedCell.hourIndex * 30 + 100}px`,  // Ajusta estas coordenadas según tu diseño
                        right: `${selectedCell.courseIndex * 100 + 150}px`, // Ajusta estas coordenadas según tu diseño
                        width: '500px',
                        height: '300px',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Buscar materia..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {filteredSubjects.map((subject) => (
                        <div
                            key={subject.value}
                            className="dropdown-item"
                            style={{ backgroundColor: subject.color, color: '#fff' }}
                            onClick={() => handleSubjectSelect(subject)}
                        >
                            {subject.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Calendario;