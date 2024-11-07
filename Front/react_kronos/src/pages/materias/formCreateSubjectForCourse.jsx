import React, { useEffect,useState } from 'react';
import { Form, Input, Button, Tooltip, Select, Flex } from 'antd';
import { InfoCircleOutlined, RollbackOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function FormCreateSubject({ handleSubmit, onClose, cursos, value, setValue, values}) {
    const [materiasSelect, setMateriasSelect] = useState([]);
    const [materiasSeleccionada, setMateriasSeleccionada] = useState(null);
    const [materiasCompleta, setMateriasCompleta] = useState([]);
    const [cursosSelect, setCursosSelect] = useState([]);
    const [form] = Form.useForm();
    
    useEffect(() => {
    const url = new URL('http://127.0.0.1:8000/api/subjects/');
        fetch(url.toString(), {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMateriasCompleta(data);
                setMateriasSelect(data.map(materia => ({label: materia.name, value: materia.id})));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    //EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESTO NO ANDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    useEffect(() => {
        if (materiasSeleccionada !== null) {
            const materiaSeleccionadaCompleta = materiasCompleta.find(materia => materiasSeleccionada === materia.id);
    
            if (materiaSeleccionadaCompleta && Array.isArray(materiaSeleccionadaCompleta.courses)) {
                console.log('materia seleccionada', materiaSeleccionadaCompleta);
    
                // Obtener los idCourse de los cursos ya asignados a la materia seleccionada
                const cursosAsignadosId = materiaSeleccionadaCompleta.courses.map(curso => curso.idCourse);
                console.log('cursos asignados', cursosAsignadosId);
    
                // Filtrar cursos que NO están en el array de cursos asignados
                console.log('cursos', cursos);
                const cursosNoAsignados = cursos.filter(curso => !cursosAsignadosId.includes(curso.id)).map(curso => ({label: curso.name, value: curso.id}));
                console.log('cursos no asignados', cursosNoAsignados);
    
                // Actualizar el estado de cursosSelect con los cursos no asignados
                setCursosSelect(cursosNoAsignados);
            }
        }
    }, [materiasSeleccionada, materiasCompleta, cursos]);
    
    
    
    
    
    
    return (
        <Form form={form} layout="vertical" >
            <Flex gap={10}>
                <Form.Item
                    style={{ width: '40%' }}
                    name="materia"
                    label="Materia"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la materia ',
                        },
                    ]}
                >
                    <Select
                        size='large'
                        onChange={(value) => setMateriasSeleccionada(value)}
                        placeholder="Materia"
                        options={materiasSelect}
                    />
                </Form.Item>
                <Form.Item
                    style={{ width: '30%' }}
                    name="curso"
                    label="Curso"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el curso ',
                        },
                    ]}
                >
                    {cursosSelect.length !== 0?(
                    <Select
                        disabled={materiasSeleccionada == null}
                        size='large'
                        placeholder="Curso"
                        options={cursosSelect}
                    />): materiasSeleccionada != null?(
                        "Tiene todos los cursos seleccionados"): "Seleccione la materia"}
                </Form.Item>
                <Form.Item
                    style={{ width: '30%' }}
                    name="horasCatedras"
                    label="Horas Catedras"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese las horas catedra ',
                        },
                    ]}
                >
                    <Input
                        autoSize
                        size='large'
                        value={value}
                        onChange={setValue}
                        type='number'
                        placeholder="Horas catedras"
                        suffix={
                            <Tooltip arrow={false} title="Cantidad de horas cátedra por semana, las cuales la materia se llevará a cabo en el curso seleccionado">
                                <InfoCircleOutlined style={{ color: 'gray' }} />
                            </Tooltip>
                        }
                    />
                </Form.Item>

            </Flex>
            <Form.Item
                name="planEstudio"
                label="Plan de estudio"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el plan de estudio ',
                    },
                ]}
            >
                <TextArea size='large' placeholder="Ingrese el plan de estudio" allowClear style={{ height: '150px' }} />
            </Form.Item>
            <Form.Item>
                <Flex justify='flex-end' gap={10}>
                    <Tooltip title="Volver">
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={onClose} />
                    </Tooltip>
                    <Tooltip title="Agregar">
                        <Button type='primary' size='large' disabled={cursosSelect.length == 0 } iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                    </Tooltip>
                </Flex>
            </Form.Item>

        </Form>
    );
}
