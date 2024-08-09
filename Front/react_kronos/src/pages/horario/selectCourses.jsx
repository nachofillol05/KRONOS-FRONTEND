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
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const mappedData = data.map((course) => ({
          year: course.year.name,
          division: course.name,
          key: course.id,
        }));
        console.log(mappedData);
        setCursos(mappedData);
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
      title: "Año",
      dataIndex: "year",
      key: "year",
      filters: [
        { text: "1°", value: "1°" },
        { text: "2°", value: "2°" },
        { text: "3°", value: "3°" },
        { text: "4°", value: "4°" },
        { text: "5°", value: "5°" },
        { text: "6°", value: "6°" },
        { text: "7°", value: "7°" },
        { text: "8°", value: "8°" },
        { text: "9°", value: "9°" },
        { text: "10°", value: "10°" },
      ],
      onFilter: (value, record) => record.year.includes(value),
    },
    {
      title: "División",
      dataIndex: "division",
      key: "division",
      filters: [
        { text: "A", value: "A" },
        { text: "B", value: "B" },
        { text: "C", value: "C" },
        { text: "D", value: "D" },
        { text: "E", value: "E" },
        { text: "F", value: "F" },
        { text: "G", value: "G" },
        { text: "H", value: "H" },
        { text: "I", value: "I" },
        { text: "J", value: "J" },
      ],
      onFilter: (value, record) => record.division.includes(value),
    },
  ];

  return (
    <div>
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={cursos}
        pagination={false}
        scroll={{ y: 450 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          onMouseEnter: () => handleMouseEnter(record),
          onMouseLeave: handleMouseLeave,
        })}
      />
      <Row gutter={10} style={{ marginTop: 10 }}>
        <Col>
          <Tooltip title="Agregar hora">
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
        <Col>
          <Tooltip title="Seleccionar curso">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              style={{ width: "100px" }}
            />
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
};

export default SelectCourse;
