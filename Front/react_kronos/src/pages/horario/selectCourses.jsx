import React, { useEffect, useState } from 'react';
import { Table, Button, Tooltip, Typography, Row, Col } from 'antd';
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import FormCreateCourse from './formCreateCourse';

const { Title, Text } = Typography;

const SelectCourse = ({ showDrawer }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [hoveredInfo, setHoveredInfo] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/", {
      method: "GET",
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token'),
        'School-ID': sessionStorage.getItem('actual_school'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCursos(data);
      });
  }, []);

  const handleRowClick = (record) => {
    const newSelectedRowKeys = selectedRowKeys.includes(record.key)
      ? selectedRowKeys.filter((key) => key !== record.key)
      : [...selectedRowKeys, record.key];
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleMouseEnter = (record) => {
    setHoveredInfo(`Año: ${record.year}, División: ${record.division}`);
  };

  const handleMouseLeave = () => {
    setHoveredInfo('');
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns = [
    {
      title: "Curso",
      dataIndex: "name",
      key: "Course",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "Description",
    }
  ];

  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={cursos}
        pagination={false}
        scroll={{ y: 450 }} 
      />
      <Row gutter={10} style={{ marginTop: 10 }}>
        <Col>
          <Tooltip title="Agregar curso">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              style={{ width: "100px" }}
              onClick={() =>
                showDrawer(
                  <FormCreateCourse showDrawer={showDrawer} />,
                  "Agregar curso"
                )
              }
            />
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
};

export default SelectCourse;
