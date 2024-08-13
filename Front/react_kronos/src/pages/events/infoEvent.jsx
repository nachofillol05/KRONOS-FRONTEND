import React, { useState } from 'react';
import { List, Divider, Flex, Form, Input, Button, Select, DatePicker } from 'antd';
import moment, { duration } from 'moment';
import './events.scss';

const dateFormat = 'DD/MM/YYYY';

export default function InfoWorker({ event }) {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    form.setFieldsValue({
        name: event.name,
        eventType: event.eventType,
        description: event.description,
        startDate: moment(event.startDate, dateFormat),
        endDate: moment(event.endDate, dateFormat),
    });

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            // If we are exiting edit mode, reset form values to the event's initial data
            form.setFieldsValue({
                name: event.name,
                eventType: event.eventType,
                description: event.description,
                startDate: moment(event.startDate, dateFormat),
                endDate: moment(event.endDate, dateFormat),
                duration: calculateDuration(event.startDate, event.endDate),
            });
        }
    };

    const handleSave = () => {
        form.validateFields().then(values => {
            const updatedEvent = {
                ...event,
                ...values,
                startDate: values.startDate.format(dateFormat),
                endDate: values.endDate.format(dateFormat),
            };
            // You can handle the update logic here, e.g., calling an API or updating state
            console.log('Updated Event:', updatedEvent);
            toggleEditMode();
        }).catch(errorInfo => {
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

    function calculateDuration(startDate, endDate) {
        const start = moment(startDate, dateFormat);
        const end = moment(endDate, dateFormat);
        return end.diff(start, 'days') + 1;
    }


    return (
        <Form
            form={form}
            layout="vertical"
        >
            <Flex vertical style={{ width: '70%' }}>
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
                            options={[
                                { label: 'Conference', value: 'conference' },
                                { label: 'Workshop', value: 'workshop' },
                                { label: 'Webinar', value: 'webinar' },
                                // Add more event types as needed
                            ]}
                        />
                    ) : (
                        <Input
                            size='large'
                            value={event.eventType}
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
                <Form.Item className="formInfoEventItem" label="Fecha de inicio" name="startDate" layout='horizontal'>
                    {isEditing ? (
                        <DatePicker
                        format={dateFormat}
                            minDate={moment().format(dateFormat)}
                            size='large'
                            style={!isEditing ? customDisabledStyle : { height: '38px', width: '100%' }}
                            disabled={!isEditing} />
                    ) : (
                        <Input
                            size='large'
                            value={event.eventType}
                            style={{ height: '38px', ...customDisabledStyle }}
                        />
                    )}
                </Form.Item>
                <Form.Item className="formInfoEventItem" label="Fecha de fin" name="endDate" layout='horizontal'>
                    {isEditing ? (
                        <DatePicker
                            size='large'
                            style={!isEditing ? customDisabledStyle : { height: '38px', width: '100%' }}
                            format={dateFormat}
                            disabled={!isEditing} />
                    ) : (
                        <Input
                            size='large'
                            value={event.eventType}
                            disabled
                            style={{ height: '38px', ...customDisabledStyle }}
                        />
                    )}

                </Form.Item>
                <Form.Item className="formInfoEventItem" label="Duracion" name="duration" layout='horizontal'>
                    <Input
                        size='large'
                        style={customDisabledStyle}
                        disabled={true}
                    />
                </Form.Item>            
                
            </Flex>
            <Flex gap={'10px'} justify='end'>
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
                    <Button
                        style={{ width: '100px' }}
                        onClick={toggleEditMode}
                    >
                        Editar
                    </Button>
                )}
                </Flex>
        </Form>
    );
}
