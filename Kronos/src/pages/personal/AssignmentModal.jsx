import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, message,Flex } from 'antd';
import FilterDropdownPersonalizado from '../../components/filterDropTable/FilterDropPersonalizado';


const AssignmentModal = ({ visible, onClose, user, setCreatedPersonals,personal}) => {
    console.log(user);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [addedRoles, setAddedRoles] = useState([]);
    const [removedRoles, setRemovedRoles] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [courses, setCourse] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/api/years/", {
            method: "GET",
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
                "School-ID": sessionStorage.getItem("actual_school"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const courses = data.map((curs) => ({
                    value: curs.id,
                    label: curs.name,
                }));
                setCourse(courses);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


    /*useEffect(() => {
        const newAddedYears = selectedYear.filter(year => !yearsPrincipio?.includes(year));
        const newRemovedYears = yearsPrincipio.filter(year => !selectedYear?.includes(year));

        setAddedRoles(newAddedYears);
        setRemovedRoles(newRemovedYears);
    }, [selectedYear, yearsPrincipio]);*/

    const handleCheckboxChange = checkedValues => {
        setSelectedRoles(checkedValues);

        const newAddedRoles = checkedValues?.filter(role => !roles?.includes(role));
        const newRemovedRoles = roles?.filter(role => !checkedValues?.includes(role));

        setAddedRoles(newAddedRoles);
        setRemovedRoles(newRemovedRoles);
    };

    const handleAssign = () => {
        addedRoles?.forEach(role => {
            const data = { role, user_id: user.pk };
            if (role === 'Preceptor') {
                data.years_id = selectedYear;
            }

            fetch(process.env.REACT_APP_API_URL + '/api/addrole/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('token'),
                    'School-ID': sessionStorage.getItem('actual_school'),
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => console.log('Role assigned:', data))
                .catch(error => console.error('Error assigning role:', error));
        });

        removedRoles?.forEach(role => {
            const data = { role, user_id: user.pk };

            fetch(process.env.REACT_APP_API_URL + '/api/addrole/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('token'),
                    'School-ID': sessionStorage.getItem('actual_school'),
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => console.log('Role removed:', data))
                .catch(error => console.error('Error removing role:', error));
        });

        setCreatedPersonals((prev) => prev.map((p) => {
            if (p?.documento === personal?.documento) {
              return { ...p, deshabilitado: true };
            }
            return p;
          }
          ));
          message.success('Roles asignado correctamente');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            onOk={handleAssign}
            title={`Asigna un rol a ${user.first_name} ${user.last_name}`}
            okText="Asignar"
            cancelText="Cancelar"
            okButtonProps={{
                disabled: 
                (removedRoles?.length === 0 && addedRoles?.length === 0) ||
                (selectedYear?.length === 0 && selectedRoles?.includes("Preceptor")) 
              }}
        >
            <p>Seleccione los roles que desea asignar a este usuario:</p>
            <Checkbox.Group
                style={{ width: '100%' }}
                value={selectedRoles}
                onChange={handleCheckboxChange}
            >
                <Flex gap={30}>
                    <Checkbox value="Profesor">Profesor</Checkbox>
                    <Checkbox value="Preceptor">Preceptor</Checkbox>
                    <Checkbox value="Directivo">Directivo</Checkbox>
                </Flex>
            </Checkbox.Group>

            {selectedRoles?.includes("Directivo") && (
                <div style={{ marginTop: '20px', width: '80%' }}>
                    <p style={{ color: 'red' }}>Si le asignas el rol directivo, tendrá acceso a la lectura y modificación de toda la información del colegio.</p>
                </div>
            )}

            {selectedRoles?.includes("Preceptor") && (
                <div style={{ marginTop: '20px', width: '80%' }}>
                    <FilterDropdownPersonalizado options={courses} tempSelectedKeys={selectedYear} setTempSelectedKeys={setSelectedYear} onChange={(checkedValues)=>{setSelectedYear(checkedValues);}} placeholder={'Años del preceptor'} />
                </div>
            )}
        </Modal>
    );
};

export default AssignmentModal;
