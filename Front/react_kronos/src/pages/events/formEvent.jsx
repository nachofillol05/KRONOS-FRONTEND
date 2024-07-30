import { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;
const { TextArea } = Input

var datos = [
  {
    value: 1,
    label: "Opción 1",
  },
  {
    value: 2,
    label: "Opción 2",
  },
  {
    value: 3,
    label: "Opción 3",
  },
  {
    value: 4,
    label: "Opción 4",
  },
];

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function FormEvent ({event, onSave}) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        name: event.title,
        description: event.description,
        dateRange: [moment(event.start_date), moment(event.end_date)],
        typeEvent: event.type_event,
      });
    }
  }, [event, form]);

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      form={form}
  >
      <Form.Item
        label="Nombre del Evento"
        name="name"
        rules={[{ required: true, message: 'Por favor ingresa el nombre del evento' }]}
        style={{ marginBottom: '8px' }}
      >
        <Input placeholder="Nombre del evento"/>
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
        rules={[{ required: true, message: 'Por favor ingresa la descripción del evento' }]}
        style={{ marginBottom: '8px' }}
      >
        <TextArea rows={4} placeholder="Descripción del evento" />
      </Form.Item>

      <Form.Item
        label="Fecha de Inicio y Fin"
        name="dateRange"
        rules={[{ required: true, message: 'Por favor selecciona la fecha de inicio y fin del evento' }]}
        style={{ marginBottom: '8px' }}
      >
        <RangePicker
          format="DD-MM-YYYY"
        />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: '8px' }}
        label="Tipo de Evento"
        name="typeEvent"
        rules={[{ required: true, message: 'Por favor selecciona el tipo de evento' }]}
      >
        <Select placeholder="Selecciona el tipo de evento">
          {datos.map((type) => (
            <Select.Option key={type.value} value={type.value}>
              {type.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        style={{ marginBottom: '8px' }}
      >
        <Button type="primary" htmlType="submit">
          Crear Evento
        </Button>
      </Form.Item>
    </Form>
  );
};