import Buscador from "./../../components/buscador/buscador";
import Select from "./../../components/select/selects";
import Button from "./../../components/button/buttons";
import Input from "./../../components/input/inputs";



var datos = [
  {
    id: 1,
    name: "Opción 1",
  },
  {
    id: 2,
    name: "Opción 2",
  },
  {
    id: 3,
    name: "Opción 3",
  },
  {
    id: 4,
    name: "Opción 4",
  },
];

var dataTypeEvents = [
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


export default function EventFilters(props) {
  const { isDirective, setTypeEvent, openForm } = props;

  function handlerChangeTypeEvent (value) {
    setTypeEvent(value)
  }
  return (
    <form className="event-filters">
      <Select
        onChange={(value) => handlerChangeTypeEvent(value)}
        datos={dataTypeEvents}
        solid={true}
      />
      <Buscador />
      <Input 
        type={"date"}
        label={"Anterior a"}
        numero={20}
      />
      {isDirective && (
        <>
          <Select
            onChange={(value) => console.log(value)}
            datos={datos}
            solid={true}
          />
          <Button onClick={openForm} text={'Agregar evento'} numero={17} life={true}>Agregar evento</Button>
        </>
      ) }
    </form>
  );
}
