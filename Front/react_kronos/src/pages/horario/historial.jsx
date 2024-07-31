import React from 'react';
import { Button, Flex, Select, DatePicker, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRef } from 'react';

export default function Historial() {

    const now = new Date()

    return (
        <Flex vertical>
            <Flex justify='space-between'>
                <Select
                    size='large'
                    style={{
                        width: 150,
                    }}
                    showSearch
                    placeholder="Materias"
                />
                <Select
                    size='large'
                    style={{
                        width: 150,
                    }}
                    showSearch
                    placeholder="Curso"
                />
                <DatePicker
                    size='large'
                    style={{
                        width: 150,
                    }}

                />

            </Flex>


        </Flex>
    );
}