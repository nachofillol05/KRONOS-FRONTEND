import React, { useState, useEffect } from 'react';
import { List, Divider, Flex, Form, Input, Button, Select, Avatar, DatePicker, Modal } from 'antd';
import FilterDropdownTable from '../../components/filterDropTable/FilterDropTable.jsx';
import moment from 'moment';
import './events.scss';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

export default function InfoWorker({ event, estado, closeDrawer,closeDrawerDelete,showError }) {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [dur, setDur] = useState(calculateDuration(event.startDate, event.endDate));
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(event.affiliated_teachers || []);
    const [rolesList, setRolesList] = useState([]);
    const [types, setTypes] = useState([]);

    const confirmDelete = (nombre) => {
        Modal.confirm({
            title: `¿Está seguro que desea borrar el evento "${nombre}"?`,
            okText: 'Sí',
            cancelText: 'No',
            onOk: borrarEvento,
        });
    };
    const borrarEvento = () => {
        fetch('http://127.0.0.1:8000/api/events/'+event.id+'/', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'School-ID': sessionStorage.getItem('actual_school'),
            },
        })
        .then(response => {
            if (!response.ok) {
                showError();
                throw new Error('Network response was not ok');
            }
            closeDrawerDelete();
            if (response.status !== 204) {
                return response.json();
            }
        })
    };


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/typeevent/', {
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
            const typeEvents = data.map(event => ({
                value: event.id,
                label: event.name,
            }));
            setTypes(typeEvents);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/roles/', {
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
            const rols = data.map(rol => ({
                value: rol.id,
                label: rol.name,
            }));
            setRolesList(rols);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const startDate = moment.utc(event.startDate).format(dateFormat);
    const endDate = moment.utc(event.endDate).format(dateFormat);

    function calculateDuration(startDate, endDate) {
        if (!isEditing) {
            const start = new Date(startDate);
            const end = new Date(endDate);
        
            const differenceInTime = end.getTime() - start.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
            
            return differenceInDays;
        }
    }

    const rolesListaId = event.roles.map(role => role.id);
    const rolesLista = event.roles.map(role => role.name);

    // Configurar valores del formulario
    useEffect(() => {
        form.setFieldsValue({
            name: event.name,
            eventType: event.eventType.name,
            description: event.description,
            dateRange: [moment.utc(event.startDate), moment.utc(event.endDate)],
            Rolesdirigido: rolesLista,
            duration: dur,
        });
    }, [event, rolesListaId, startDate, endDate, dur, form]);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            form.setFieldsValue({
                name: event.name,
                eventType: event.eventType.id,
                description: event.description,
                Rolesdirigido: rolesListaId,
                dateRange: [moment.utc(event.startDate), moment.utc(event.endDate)],
                duration: dur
            });
        }
    };

    const onChangeDate = (date, dateString) => {
        const formattedMaxDate = moment(dateString).format('DD/MM/YYYY');
        console.log('Agregarlo despues en el form', encodeURIComponent(formattedMaxDate));
    }

    const handleSave = () => {
        let tipoEvento,rols;
        form.validateFields().then(values => {
            if(typeof values.eventType === 'undefined' || isNaN(parseInt(values.eventType))) {
                tipoEvento = event.eventType.id;
            }else{
                tipoEvento = values.eventType;
            }
            if (Array.isArray(values.Rolesdirigido) && values.Rolesdirigido.every(role => Number.isInteger(role))) {
                rols = values.Rolesdirigido;
                console.log("Es un array de enteros");
            } else {
                rols = event.roles.map(role => role.id);
                console.log("No es un array de enteros");
            }

            if(event.affiliated_teachers){
                values.affiliated_teachers = event.affiliated_teachers.map(teacher => teacher.id);
            }

            const updatedEvent = {
                ...event,
                ...values,
                eventType: tipoEvento,
                startDate: moment.utc(values.dateRange[0]).format('DD/MM/YYYY'),
                endDate: moment.utc(values.dateRange[1]).format('DD/MM/YYYY'),
                roles: rols,
            };
            console.log(JSON.stringify(updatedEvent))
            fetch('http://127.0.0.1:8000/api/events/'+event.id+'/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                    'School-ID': sessionStorage.getItem('actual_school'),
                },
                body: JSON.stringify(updatedEvent),
            })
            .then(response => {
                if (!response.ok) {
                    showError();
                    throw new Error('Network response was not ok');
                }
                closeDrawer();
                return response.json();
            })
            .then(data => console.log('Success:', data))
            .catch(error => showError());

            toggleEditMode();
        }).catch(errorInfo => {
            showError();
            console.error('Failed to save form:', errorInfo);
        });

    };

    const customDisabledStyle = {
        backgroundColor: 'transparent',
        color: 'black',
        cursor: 'default',
        borderColor: 'transparent',
        height: '38px',
        width: '100%',
    };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };
    

    return (
        <Form
            form={form}
            layout="vertical"
        >
            <Flex vertical style={{ width: '100%' }}>
                <h3>Claves del evento</h3>
                <Form.Item className="formInfoEventItem" label="Nombre" name="name" layout='horizontal'>
                    <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : { height: '38px' }}
                        disabled={!isEditing}
                    />
                </Form.Item>
                <Form.Item className="formInfoEventItem" layout="horizontal" label="Tipo de evento" name="eventType" style={{ width: '100%' }}>
                    {isEditing ? (
                        <Select
                            style={{ width: '100%', height: '38px' }}
                            size='large'
                            options={types}
                        />
                    ) : (
                        <Input
                            size='large'
                            disabled
                            style={{ height: '38px', ...customDisabledStyle }}
                        />
                    )}
                </Form.Item>
                <Form.Item className="formInfoEventItem" layout="horizontal" label="Roles dirigido" name="Rolesdirigido" style={{ width: '100%' }}>
                    {isEditing ? (
                        <FilterDropdownTable options={rolesList} placeholder={'Roles: '} />
                    ) : (
                        <Input
                            size='large'
                            disabled
                            style={{ height: '38px', ...customDisabledStyle }}
                        />
                    )}
                </Form.Item>
                <Form.Item className="formInfoEventItem" label="Descripción" name="description" layout='horizontal'>
                    <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : { height: '38px' }}
                        disabled={!isEditing}
                    />
                </Form.Item>
                <Divider />
                <h3>Fechas</h3>
                <Form.Item className="formInfoEventItem" label="Fechas" name="dateRange" layout='horizontal'>
                    <RangePicker
                        size='large'
                        disabled={true}
                        disabledDate={disabledDate}
                        format={dateFormat}
                    />
                </Form.Item>
                <Form.Item className="formInfoEventItem" label="Duracion" name="duration" layout='horizontal'>
                    <Input
                        size='large'
                        style={customDisabledStyle}
                        disabled={true}
                    />
                </Form.Item>
                <h3>Profesores adheridos</h3>
                <div
                    id="scrollableDiv"
                    style={{
                        height: 250,
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.profile_picure || 'default-avatar.png'} />}
                                    title={<h>{item.first_name} {item.last_name}</h>}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </div>         
            </Flex>
            {sessionStorage.getItem('rol') === 'Directivo'?(
            <Flex gap={'10px'} justify='end'>
                <Button
                    style={{ width: '100px', marginRight: '10px' }}
                    onClick={()=>confirmDelete(event.name)}
                    danger
                >
                    Borrar
                </Button>
                {isEditing ? (
                    <>
                        <Button
                            style={{ width: '100px', marginRight: '10px' }}
                            onClick={toggleEditMode}
                            danger
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            style={{ width: '100px' }}
                            onClick={handleSave}
                        >
                            Guardar
                        </Button>
                    </>
                ) : (
                    estado == "Pendiente" && (
                        <Button
                            style={{ width: '100px' }}
                            onClick={toggleEditMode}
                            type="primary"
                        >
                            Editar
                        </Button>
                    )
                )}
            </Flex>
            ):null}
        </Form>
    );
}
