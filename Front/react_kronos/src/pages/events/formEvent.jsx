import { useState, useEffect } from "react";
import Input from "./../../components/input/inputs"
import Select from "./../../components/select/select";

const dataTypeEvents = [
  {
    "id": 1,
    "name": "Paro",
    "description": "Paro de la empresa ERSA en la ciudad de Córdoba"
  },
  {
    "id": 2,
    "name": "Concierto",
    "description": "Concierto de la banda Los Piojos en el estadio Mario Alberto Kempes"
  },
  {
    "id": 3,
    "name": "Deporte",
    "description": "Maratón anual en el centro de la ciudad"
  },
  {
    "id": 4,
    "name": "Feria",
    "description": "Feria de tecnología y startups en el predio ferial"
  },
  {
    "id": 5,
    "name": "Taller",
    "description": "Taller de cocina saludable en el parque Sarmiento"
  },
  {
    "id": 6,
    "name": "Exposición",
    "description": "Exposición de arte contemporáneo en el museo Caraffa"
  },
  {
    "id": 7,
    "name": "Carrera",
    "description": "Carrera de autos en el autódromo Oscar Cabalén"
  },
  {
    "id": 8,
    "name": "Festival",
    "description": "Festival de Jazz en la Plaza de la Música"
  },
  {
    "id": 9,
    "name": "Curso",
    "description": "Curso intensivo de fotografía en el centro cultural"
  },
  {
    "id": 10,
    "name": "Competencia",
    "description": "Competencia de robótica en la facultad de ingeniería"
  }
]

export default function FormEvent ({event, onSave}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        type_event: event.type
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          numero={25}
          requerided={true}
          placeholder="Nombre del evento"
          type="text"
          // falta el onChange={handleChange}
        >{formData.name}</Input>
      </div>
      <div>
      <Input
          numero={25}
          requerided={true}
          placeholder="Descripcion del evento"
          type="text"
          // falta el onChange={handleChange}
        >{formData.description}</Input>
      </div>
      <div>
        <Input
          label="Fecha de inicio del evento"
          numero={20}
          requerided={true}
          type="date"
          // falta el onChange={handleChange}
        >{formData.startDate}</Input>
      </div>
      <div>
      <Input
          label="Fecha de fin del evento"
          numero={20}
          requerided={true}
          type="date"
          // falta el onChange={handleChange}
        >{formData.endDate}</Input>
      </div>
      <div>
        <label>Tipo de Evento:</label>
        {/* <Select 
          onChange={(v) => alert(v)}
          datos={dataTypeEvents}
          solid={true}
          // falta el llenar el valor en todosada
        /> */}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};