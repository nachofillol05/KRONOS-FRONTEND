import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button, Tooltip, Space, ColorPicker, Flex, theme, Avatar } from 'antd';
import { RollbackOutlined, PlusOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function FormCreateSubject({ handleSubmit, onClose, cursos, value, setValue }) {
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const colorPrimary = token.colorPrimary;
    const [colorSelected, setColorSelected] = React.useState(value?.color || colorPrimary);
    const [AbreviacionSelected, setAbreviacionSelected] = React.useState(value?.abbreviation || "");
    const [edit, setEdit] = React.useState(false);

    const makeColorTransparent = useCallback((color, alpha) => {
        alpha = Math.max(0, Math.min(1, alpha));
        const hexToRgba = (hex) => {
            let r = 0, g = 0, b = 0;
            if (hex.length === 4) {
                r = parseInt(hex[1] + hex[1], 16);
                g = parseInt(hex[2] + hex[2], 16);
                b = parseInt(hex[3] + hex[3], 16);
            } else if (hex.length === 7) {
                r = parseInt(hex[1] + hex[2], 16);
                g = parseInt(hex[3] + hex[4], 16);
                b = parseInt(hex[5] + hex[6], 16);
            }
            return `rgba(${r},${g},${b},${alpha})`;
        };

        return /^#[0-9A-Fa-f]{3,6}$/.test(color) ? hexToRgba(color) : color;
    }, []);

    useEffect(() => {
        if (value) {
            form.setFieldsValue({
                id: value.id,
                materia: value.name,
                abreviacion: value.abbreviation,
                color: value.color, // Set the initial color here
                descripcion: value.description,
            });
            setColorSelected(value.color);
            setEdit(true);
        }
    }, [value, form]);

    // Update form value when color changes
    useEffect(() => {
        form.setFieldsValue({ color: colorSelected });
    }, [colorSelected, form]);

    return (
        <Form form={form} layout="vertical" hideRequiredMark>
            <Form.Item name="id" hidden={true} />
            <Flex gap={10}>
                <Space.Compact>
                    <Form.Item
                        style={{ width: '60%' }}
                        name="materia"
                        label="Nombre de la materia"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el nombre de la materia',
                            },
                        ]}
                    >
                        <Input size='large' autoSize={true} placeholder="Ingrese la materia" />
                    </Form.Item>
                    <Form.Item
                        style={{ width: '40%' }}
                        name="abreviacion"
                        label="Abreviación"
                        onChange={(e) => setAbreviacionSelected(e.target.value)}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            {
                                max: 5,
                                message: '',
                            }
                        ]}
                    >
                        <Input size='large' autoSize placeholder="Ingrese abreviacion" maxLength={5} />
                    </Form.Item>
                </Space.Compact>
                <Form.Item
                    name="color"
                    label="Color de la materia"
                    style={{ width: '40%' }}
                >
                    <ColorPicker 
                        value={colorSelected}
                        format='hex'
                        onChange={(e) => {
                            const newColor = e.toHexString();
                            setColorSelected(newColor);
                        }} 
                        size="large" 
                        showText 
                        style={{ width: '100%' }} 
                    />
                </Form.Item>
            </Flex>
            <Form.Item
                name="descripcion"
                label="Descripcion"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese la descripcion ',
                    },
                ]}
            >
                <TextArea size='large' placeholder="Ingrese la descripcion" allowClear style={{ height: '100px' }} />
            </Form.Item>
            <Flex
                className='previewContainer'
                justify='center'
                align='center'
                style={{ cursor: 'default' }}
            >
                <Flex
                    className="preview"
                    align='center'
                    gap={5}
                    style={{
                        color: colorSelected,
                        backgroundColor: makeColorTransparent(colorSelected, 0.22),
                        cursor: 'default'
                    }}
                >
                    <Avatar size={'small'} icon={<UserOutlined />} />
                    {AbreviacionSelected}
                </Flex>
            </Flex>
            <Form.Item style={{ marginTop: '25px' }}>
                <Flex justify='flex-end' gap={10}>
                    <Tooltip title="Volver">
                        <Button size='large' iconPosition='end' icon={<RollbackOutlined />} style={{ width: "100px" }} onClick={onClose} />
                    </Tooltip>
                    {!edit ?
                        <Tooltip title="Agregar">
                            <Button type='primary' size='large' iconPosition='end' icon={<PlusOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form)} />
                        </Tooltip>
                        :
                        <Tooltip title="Agregar">
                            <Button type='primary' size='large' iconPosition='end' icon={<EditOutlined />} style={{ width: "100px" }} onClick={() => handleSubmit(form) /*form.setValue(color selected color) */} />
                        </Tooltip>
                    }
                </Flex>
            </Form.Item>
        </Form>
    );
}
