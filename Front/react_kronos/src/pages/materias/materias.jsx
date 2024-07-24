import React, { useState, useEffect } from 'react';
import './materias.scss';
import RangeSlider from "../../components/timerangeslider/timerange.jsx"
import { Table, Select, AutoComplete, FloatButton, Drawer, Input, Flex, ColorPicker, Space, Form, Button } from "antd";
import { FileAddOutlined, DownOutlined, UpOutlined, DownloadOutlined } from '@ant-design/icons';

const { TextArea } = Input

export default function Materias({ handleOpenDrawer, handleCloseDrawer }) {
    const [materias, setMaterias] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teacher, setTeacher] = useState('');
    const [Subjectname, setSubjectname] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [loading, setLoading] = useState(true);
    const [materiasMap, setMateriasMap] = useState([]);
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [drawerTitle, setDrawerTitle] = useState(null);

    const showDrawer = (content, title) => {
        setDrawerTitle(title);
        setDrawerContent(content);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setDrawerContent(null);
    };


    const onChange = (value) => {
        console.log(`selected ${value}`);
        setTeacher(value)
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };



    useEffect(() => {
        const url = new URL('http://127.0.0.1:8000/api/subjects/');
        if (end_time && start_time) {
            url.searchParams.append('start_time', start_time);
            url.searchParams.append('end_time', end_time);
        }
        if (teacher) {
            url.searchParams.append('teacher', teacher);
        }
        if (Subjectname) {
            url.searchParams.append('name', Subjectname);
        }
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", url.toString())
        fetch(url.toString(), {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 1,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("data: ", data);
                setMaterias(data.map(materia => ({ ...materia, key: materia.id })))
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [start_time, end_time, Subjectname, teacher]);

    const columns = [
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Abreviacion', dataIndex: 'abbreviation', key: 'abbreviation' },
        { title: 'Curso', dataIndex: 'course', key: 'course' },
        { title: 'Horas catedra semanales', dataIndex: 'weeklyHours', key: 'weeklyHours' },
        { title: 'Color', dataIndex: 'color', key: 'color' },
        { title: 'Descripcion', dataIndex: 'description', key: 'description' }
    ];

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teachers/', {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': 1,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const teacherNames = data.map(teacher => ({
                    value: teacher.id,
                    label: teacher.first_name + ' ' + teacher.last_name,
                }));

                setTeachers(teacherNames);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const [value, setValue] = useState('');

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectTeacher = (value) => {
        setTeacher(value);
        console.log(value);
    };

    const handleSearch = (searchText) => {
        setSubjectname(searchText);
        console.log("entro")
    };

    const handleFinalRangeChange = (newValues) => {
        console.log("hola")
        setStart_time(newValues[0]);
        setEnd_time(newValues[1]);
        console.log('New range values:', newValues);
    };

    const cursos = [{ id: 1, name: '1A' }, { id: 2, name: '1B' }, { id: 3, name: '2A' }, { id: 4, name: '2B' }, { id: 5, name: '3A' }, { id: 6, name: '3B' }, { id: 7, name: '4A' }, { id: 8, name: '4B' }, { id: 9, name: '5A' }, { id: 10, name: '5B' }];

    return (
        <React.StrictMode>
            <div className="filtros-container">
                <div style={{ width: '200px' }}>
                    <RangeSlider range defaultValue={[20, 50]} />
                </div>

                <Select
                    size='large'
                    showSearch
                    placeholder="Seleccione un Profesor"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={teachers}
                />

                <Select
                    size='large'
                    showSearch
                    placeholder="Seleccione un curso"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                        {
                            value: '1',
                            label: '1',
                        },
                        {
                            value: '2',
                            label: '2',
                        },
                        {
                            value: '3',
                            label: '3',
                        },
                    ]}
                />

                <AutoComplete
                    size='large'
                    style={{
                        width: 200,
                    }}
                    options={materias.map(materia => ({
                        value: materia.id,
                        label: materia.name,
                    }))}
                    placeholder="Buscar Materia"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>

            <Table dataSource={teachers} columns={columns}
                tableLayout={'fixed'}
                filterDropdownOpen={true}
                filtered={true}
            />

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
                        <Form layout="vertical" hideRequiredMark>
                            <Space.Compact>
                                <Form.Item
                                    style={{ width: '70%' }}
                                    name="materia"
                                    label="Nombre de la materia"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Porfavor ingrese el nombre de la materia',
                                        },
                                    ]}
                                >
                                    <Input size='large' autoSize={true} placeholder="Ingrese el nombre de la materia" />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '30%' }}
                                    name="abreviacion"
                                    label="Abreviacion"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Porfavor ingrese el nombre de la abreviacion',
                                        },
                                    ]}
                                >
                                    <Input size='large' autoSize placeholder="Abreviacion" count={{ show: true, max: 5 }} />
                                </Form.Item>
                            </Space.Compact>
                            <Flex gap={10}>
                                <Form.Item
                                    style={{ width: '70%' }}
                                    name="profesor"
                                    label="Profesor"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Porfavor ingrese el profesor',
                                        },
                                    ]}
                                >
                                    <Select

                                        size='large'
                                        showSearch
                                        placeholder="Profesor"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        options={teachers}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '30%' }}
                                    name="curso"
                                    label="Curso"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Porfavor ingrese el curso ',
                                        },
                                    ]}
                                >
                                    <Select
                                        size='large'
                                        placeholder="Curso"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        options={{ '1': 1, '2': 2, '3': 3 }}
                                    />
                                </Form.Item>
                            </Flex>
                            <Flex gap={10}>
                                <Form.Item
                                    style={{ width: '50%' }}
                                    name="horasCatedras"
                                    label="Horas Catedras"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Porfavor ingrese las horas catedra ',
                                        },
                                    ]}
                                >
                                    <Input
                                        autoSize
                                        size='large'
                                        value={value}
                                        onChange={setValue}
                                        type='number'
                                        placeholder="Ingrese las horas Catedras"
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '50%' }}
                                    name="color"
                                    label="Color de la materia"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Porfavor ingrese el color de la materia ',
                                        },
                                    ]}
                                >
                                    <ColorPicker defaultValue="#1677ff" size="large" showText style={{ width: '100%' }} />
                                </Form.Item>
                            </Flex>
                            <Form.Item
                                name="planEstudio"
                                label="Plan de estudio"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Porfavor ingrese el plan de estudio ',
                                    },
                                ]}
                            >
                                <TextArea size='large' placeholder="Ingrese el plan de estudio" allowClear onChange={onChange} style={{ height: '90px' }} />
                            </Form.Item>
                            <Form.Item
                                name="descripcion"
                                label="Descripcion"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Porfavor ingrese la descripcion ',
                                    },
                                ]}
                            >
                                <TextArea size='large' placeholder="Ingrese la descripcion" allowClear onChange={onChange} style={{ height: '90px' }} />
                            </Form.Item>
                            <Form.Item >
                                <Flex justify='flex-end'>
                                    <Button size='large' type="primary" onClick={onClose}>Submit</Button>
                                </Flex>
                            </Form.Item>

                        </Form>
                        , 'Agregar una materia')} />
            </FloatButton.Group>

            <Drawer width={600} title={drawerTitle} onClose={onClose} open={open} closeIcon={false}>
                <div style={{ width: '100%', height: '100%' }}>
                    {drawerContent}
                </div>
            </Drawer>
        </React.StrictMode>
    );
}
