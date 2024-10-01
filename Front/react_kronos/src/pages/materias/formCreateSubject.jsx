import React, { useCallback } from 'react';
import { Form, Input, Button, Tooltip, Space, Select, ColorPicker, Flex, theme, Avatar } from 'antd';
import { InfoCircleOutlined, RollbackOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
const { TextArea } = Input;





export default function FormCreateSubject({ handleSubmit, onClose, cursos, value, setValue }) {
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const colorPrimary = token.colorPrimary;
    const [colorSelected, setColorSelected] = React.useState(token.colorPrimary);
    const [AbreviacionSelected, setAbreviacionSelected] = React.useState(value.abreviacion);

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

        if (/^#[0-9A-Fa-f]{3,6}$/.test(color)) {
            return hexToRgba(color);
        } else {
            return color;
        }
    }, []);

    console.log(colorSelected);
    return (
        <Form form={form} layout="vertical" hideRequiredMark >
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
                        label="Abreviacion"
                        onChange={(e) => setAbreviacionSelected(e.target.value)}
                        rules={[
                            {
                                required: true,

                                message: '',
                            },
                        ]}
                    >
                        <Input size='large' autoSize count={{ show: true, max: 5 }} />
                    </Form.Item>
                </Space.Compact>
                <Form.Item
                    initialValue={colorPrimary}
                    style={{ width: '40%' }}
                    name="color"
                    label="Color de la materia"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el color de la materia ',
                        },
                    ]}
                >
                    <ColorPicker onChange={(e) => setColorSelected(e.toHexString())} size="large" showText style={{ width: '100%' }} />
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
                onMouseEnter={(e) => e.currentTarget.style.borderColor = colorPrimary} // Cambia el color al hacer hover
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#cfcfcf'} // Vuelve al color original cuando quitas el hover
            >
                <Flex className="preview" align='center' gap={5}
                    style={{ color: colorSelected, backgroundColor: makeColorTransparent(colorSelected, 0.22) }}>
                    <Avatar size={'small'} icon={<UserOutlined />} />
                    {AbreviacionSelected}
                </Flex>

            </Flex>
            <Form.Item style={{ marginTop: '25px' }}>
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
