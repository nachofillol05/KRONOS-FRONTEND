import React, { useState, useEffect } from 'react';
import { List, Flex, Form, Input, Button, Select, Avatar, Modal } from 'antd';
import { deleteEvent, fetchRoles, updateEvent } from '../../services/events.js'
import FilterDropdownTable from '../../components/filterDropTable/FilterDropTable.jsx';
import moment from 'moment';
import './events.scss';
import dayjs from 'dayjs';

const dateFormat = 'DD/MM-/YYYY';

export default function InfoWorker({ event, estado, closeDrawer, typeEvent, closeDrawerDelete, showError }) {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [rolesList, setRolesList] = useState([]);
    const [dur, setDur] = useState(calculateDuration(event.startDate, event.endDate) !== 1 ? + calculateDuration(event.startDate, event.endDate) + " días" : calculateDuration(event.startDate, event.endDate) + " día")
    const [data, setData] = useState(event.affiliated_teachers || [])

    const confirmDelete = (nombre) => {
        Modal.confirm({
            title: `¿Está seguro que desea borrar el evento "${nombre}"?`,
            okText: 'Sí',
            cancelText: 'No',
            onOk: borrarEvento,
        });
    };

    const borrarEvento = async () => {
        try {
            const data = await deleteEvent(event.id)
            closeDrawerDelete();
            return data
        } catch (error) {
            showError();
            throw new Error('Error fetch in event', error.data);
        }
    };

    useEffect(() => {
        const getRoles = async() => {
            try {
              const data = await fetchRoles();
              const dataConvert = data.map(rol => ({
                value: rol.id,
                label: rol.name,
              }));
              setRolesList(dataConvert);
            }  catch (error) {
              console.error("Error fetching data:", error);
            }
        }

        getRoles();
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
            dateRange: `${moment(event.startDate).format('DD/MM/YYYY')} - ${moment(event.endDate).format('DD/MM/YYYY')}`,
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
                dateRange: `${moment(event.startDate).format('DD/MM/YYYY')} - ${moment(event.endDate).format('DD/MM/YYYY')}`,
                duration: dur
            });
        }
    };

    const onChangeDate = (date, dateString) => {
        const formattedMaxDate = moment(dateString).format('DD/MM/YYYY');
        console.log('Agregarlo despues en el form', encodeURIComponent(formattedMaxDate));
    }

    const handleSave = () => {
        let tipoEvento, rols;
        form.validateFields().then(values => {

            if (typeof values.eventType === 'undefined' || isNaN(parseInt(values.eventType))) {
                tipoEvento = event.eventType.id;
            } else {
                tipoEvento = values.eventType;
            }

            if (Array.isArray(values.Rolesdirigido) && values.Rolesdirigido.every(role => Number.isInteger(role))) {
                rols = values.Rolesdirigido;
            } else {
                rols = event.roles.map(role => role.id);
            }

            if (event.affiliated_teachers) {
                values.affiliated_teachers = event.affiliated_teachers.map(teacher => teacher.id);
            }

            const updatedEvent = {
                ...event,
                ...values,
                eventType: tipoEvento,
                startDate: moment.utc(event.startDate).format('DD/MM/YYYY'),
                endDate: moment.utc(event.endDate).format('DD/MM/YYYY'),
                roles: rols,
            };
            
            updateEvent(event.id, updatedEvent)     
            .then(data => {
                console.log('Success:', data);
                closeDrawer();
            })
            .catch(error => {
                showError();
                console.error('Failed to save form:', error);
            });

        toggleEditMode();
    }).catch(errorInfo => {
        showError();
        console.error('Failed to save form:', errorInfo);
    });
};

    const customDisabledStyle = {
        background: 'transparent',
        color: 'black',
        borderColor: 'transparent',
        cursor: 'default',
        height: '40px'
    };

    return (
        <Form
            form={form}
        >
            <Flex vertical style={{ width: '100%' }}>
                <Form.Item className="formInfoEventItem" label="Nombre" name="name" layout='horizontal'>
                    <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : { height: '40px' }}
                        disabled={!isEditing}
                    />
                </Form.Item>
                <Form.Item className="formInfoEventItem" layout="horizontal" label="Tipo de evento" name="eventType" style={{ width: '100%' }}>
                    {isEditing ? (
                        <Select
                            style={{ width: '100%', height: '40px' }}
                            size='large'
                            options={typeEvent}
                        />
                    ) : (
                        <Input
                            size='large'
                            disabled
                            style={{ height: '40px', ...customDisabledStyle }}
                        />
                    )}
                </Form.Item>
                <Form.Item className="formInfoEventItem" layout="horizontal" label="Roles dirigido" name="Rolesdirigido" style={{ width: '100%' }}>
                    {isEditing ? (
                        <FilterDropdownTable options={rolesList} tempSelectedKeys={roless} setTempSelectedKeys={setRoless}  placeholder={'Roles: '} />
                    ) : (
                        <Input
                            size='large'
                            disabled
                            style={{ height: '40px', ...customDisabledStyle }}
                        />
                    )}
                </Form.Item>
                <Form.Item className="formInfoEventItem" label="Descripción" name="description" layout='horizontal'>
                    <Input
                        size='large'
                        style={!isEditing ? customDisabledStyle : { height: '40px' }}
                        disabled={!isEditing}
                    />
                </Form.Item>
                <Form.Item className="formInfoEventItem" label="Fechas" name="dateRange" layout='horizontal'>
                    <Input
                        size='large'
                        style={customDisabledStyle}
                        disabled={true}
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
                        marginBlock: '25px',
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
            {sessionStorage.getItem('rol') === 'Directivo' ? (
                <Flex gap={'10px'} justify='end' style={{ marginBlock: '20px' }}>
                    <Button
                        style={{ width: '100px', marginRight: '10px' }}
                        onClick={() => confirmDelete(event.name)}
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
            ) : null}
        </Form>
    );
}
