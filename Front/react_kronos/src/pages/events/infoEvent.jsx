import React, { useState } from 'react';
import { List, Divider, Flex, Form, Input, Button, Select, DatePicker } from 'antd';
import moment, { duration } from 'moment';
import './events.scss';
import { calc } from 'antd/es/theme/internal';

const dateFormat = 'DD/MM/YYYY';

export default function InfoWorker({ event }) {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [dur, setDur] = useState(calculateDuration(event.startDate, event.endDate));
    console.log(event);

    function calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        console.log('Start:', start, 'End:', end);
    
        
        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))+1;
        console.log('Difference in days:', differenceInDays);
        
        return differenceInDays;
    }
    
    form.setFieldsValue({
        name: event.name,
        eventType: event.eventType.name,
        description: event.description,
        startDate:  moment(event.startDate).format(dateFormat),
        endDate:  moment(event.endDate).format(dateFormat),
        duration: dur,
    });

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            form.setFieldsValue({
                name: event.name,
                eventType: event.eventType,
                description: event.description,
                
                duration: dur
            });
        }
    };

    const handleSave = () => {
        form.validateFields().then(values => {
            const updatedEvent = {
                ...event,
                ...values,
                startDate: moment(event.startDate).format(dateFormat),
                endDate: moment(event.endDate).format(dateFormat),
            };
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
                    <Input
                            size='large'
                            value={event.startDate}
                            disabled={!isEditing}
                            style={!isEditing ? customDisabledStyle : { height: '38px' }}
                        />
                </Form.Item>
                <Form.Item className="formInfoEventItem" label="Fecha de fin" name="endDate" layout='horizontal'>
                        <Input
                            size='large'
                            value={event.endDate}
                            disabled={!isEditing}
                            style={!isEditing ? customDisabledStyle : { height: '38px' }}
                        />
                   

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
