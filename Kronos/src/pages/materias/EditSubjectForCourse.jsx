import React, { useEffect,useState } from 'react';
import { Form, Input, Button, Tooltip, Select, Flex } from 'antd';
import { InfoCircleOutlined, RollbackOutlined, EditOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function EditSubjectForCourse({ recargar,setRecargar,onClose, values}) {
    console.log(values);
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields()
            .then(value => {
                const body = {
                    studyPlan: value.planEstudio,
                    weeklyHours: value.horasCatedras,
                }
                
                fetch('http://127.0.0.1:8000/api/coursesubjects/'+values.id+'/', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'School-ID': sessionStorage.getItem('actual_school'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                }).then(response => {
                    if (response.ok) {
                        setRecargar(!recargar);
                        onClose();
                    } else {
                        response.json().then(data => {
                            console.log(data);
                        });
                    }
                }
                ).catch(error => {
                    console.log(error);
                });
        })
    }

    useEffect(() => {
        if (values) {
            form.setFieldsValue({
                id: values.id,
                planEstudio: values.studyPlan,
                horasCatedras: values.weeklyHours,
            });
        }
    });

    return (
        <Form form={form} layout="vertical" >
            <h1>{values.name} {values.course}</h1>
            
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
            <Flex gap={10}>
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
            <Form.Item>
                <Flex justify='flex-end' gap={10}>
                    <Tooltip title="Volver">
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={onClose} />
                    </Tooltip>
                    <Tooltip title="Agregar">
                        <Button type='primary' size='large' iconPosition='end' icon={<EditOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                    </Tooltip>
                </Flex>
            </Form.Item>
            

        </Form>
    );
}
