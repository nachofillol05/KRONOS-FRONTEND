import React, { useEffect,useState } from 'react';
import { Form, Input, Button, Tooltip, Select, Flex } from 'antd';
import { InfoCircleOutlined, RollbackOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function FormCreateSubject({ handleSubmit, onClose, cursos, value, setValue}) {
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

    useEffect(() => {
        if (materiasSeleccionada !== null) {
            const cursosId = cursos.map(curso => curso.id);
            const materiaSeleccionadaCompleta = materiasCompleta.find(materia => materiasSeleccionada === materia.id);
            if (materiaSeleccionadaCompleta && Array.isArray(materiaSeleccionadaCompleta.courses)) {
                const cursosAsignadosId = materiaSeleccionadaCompleta.courses.map(curso => curso.id);
                const cursosNoAsignados = cursos
                    .filter(curso => !cursosAsignadosId.includes(curso.id))
                    .map(curso => ({ label: curso.name, value: curso.id }));
                    setCursosSelect(cursosNoAsignados);
            } else {
                console.log('Materia seleccionada no encontrada o no tiene cursos asociados');
                console.log('la materia seleccionada esta asignada a todos los cursos');
            }
        }
    }, [materiasSeleccionada, cursos, materiasCompleta]);
    
    
    
    
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
                    <Select
                        disabled={materiasSeleccionada == null}
                        size='large'
                        placeholder="Curso"
                        options={cursosSelect}
                    />
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
                            <Tooltip arrow={false} color='gray' title="Las horas catedras es el tiempo en la que se lleva a cabo la clase ">
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
                        <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                    </Tooltip>
                </Flex>
            </Form.Item>

        </Form>
    );
}