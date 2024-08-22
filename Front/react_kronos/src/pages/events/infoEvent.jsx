import React, { useState, useEffect } from 'react';
import { List, Divider, Flex, Form, Input, Button, Select,Avatar, DatePicker } from 'antd';
import moment, { duration } from 'moment';
import './events.scss';

const dateFormat = 'DD/MM/YYYY';

export default function InfoWorker({ event, estado }) {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [dur, setDur] = useState(calculateDuration(event.startDate, event.endDate));
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(event.affiliated_teachers || []);




    function calculateDuration(startDate, endDate) {
        if(!isEditing){
            const start = new Date(startDate);
            const end = new Date(endDate);
        
            
            const differenceInTime = end.getTime() - start.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))+1;
            
            return differenceInDays;
        }
    }
    
    form.setFieldsValue({
        name: event.name,
        eventType: event.eventType.name,
        description: event.description,
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

    const onChangeDate = (date, dateString) => {
        const formattedMaxDate = moment(dateString).format('DD/MM/YYYY');
        console.log('Agregarlo despues en el form',encodeURIComponent(formattedMaxDate))
      }

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
    console.log(event.endDate);
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
                            options={[
                                { label: 'Conference', value: 'conference' },
                                { label: 'Workshop', value: 'workshop' },
                                { label: 'Webinar', value: 'webinar' },
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
                            size='large'
                            disabled={!isEditing}
                            style={!isEditing ? customDisabledStyle : { height: '38px' }}
                            value={moment(event.startDate, dateFormat)}
                            onChange={onChangeDate}
                            format={dateFormat}
                        />
                    ) : (
                        <Input
                            size='large'
                            value={event.startDate}
                            disabled
                            style={!isEditing ? customDisabledStyle : { height: '38px' }}
                        />
                    )}
                </Form.Item>
                <Form.Item className="formInfoEventItem" label="Fecha de fin" name="endDate" layout='horizontal'>
                {isEditing ? (
                        <DatePicker
                            size='large'
                            disabled={!isEditing}
                            style={!isEditing ? customDisabledStyle : { height: '38px' }}
                            value={moment(event.endDate, dateFormat)}
                            onChange={onChangeDate}
                            format={dateFormat}
                        />
                    ) : (
                        <Input
                            size='large'
                            value={event.endDate}
                            disabled
                            style={!isEditing ? customDisabledStyle : { height: '38px' }}
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
                    estado !="Finalizado" && (
                        <Button
                            style={{ width: '100px' }}
                            onClick={toggleEditMode}
                        >
                            Editar
                        </Button>
                    )
                )}
                </Flex>
        </Form>
    );
}
