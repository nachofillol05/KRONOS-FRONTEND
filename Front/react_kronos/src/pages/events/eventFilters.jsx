import { useState } from 'react';
import { Input, DatePicker, Select, Button, Drawer } from 'antd';
import "./events.scss";
import FormEvent from "./formEvent"



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


export default function EventFilters(props) {
  const [openDrawer, setOpenDrawer] = useState(false)

  const { isDirective } = props;

  const now = new Date()
  const { Search } = Input

  function handleOpenDrawer() {
    setOpenDrawer(!openDrawer)
  }

  return (
    <div className="event-filters">
      <Select
        style={{width: 150}}
        defaultValue="Tipos de Eventos"
        onChange={(value) => alert(value)}
        options={datos}
        allowClear
      />
      <Search placeholder='Buscar evento' style={{width: 350}}/>
      <DatePicker 
        placeholder="Fecha limite"
        format={'DD-MM-YY'}
        minDate={now}
      />
      {isDirective && (
        <>
          <Button type="primary" onClick={handleOpenDrawer}>Agregar Evento</Button>
        </>
      ) }
      <Drawer
        title="Crear evento" 
        open={openDrawer}
        onClose={handleOpenDrawer}
        width={500}
      >
        <FormEvent />

      </Drawer>
    </div>
  );
}
