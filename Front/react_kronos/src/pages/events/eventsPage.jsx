import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import EventFilters from "./eventFilters";
import CardEvents from "./cardEvent";
import FormEvent from "./formEvent"
import Drawer from "./../../components/drawer/drawers"
import "./events.scss";

const data_events = [
  {
    id: 1,
    title: "Paro de transporte",
    description: "Paro de la empresa ERSA en la ciudad de Córdoba",
    type_event: {
      "id": 1,
      "name": "Paro",
      "description": "Paro de la empresa ERSA en la ciudad de Córdoba"
    },
    start_date: "2024-08-01",
    end_date: "2024-08-02",
  },
  {
    id: 2,
    title: "Concierto de Rock",
    description:
      "Concierto de la banda Los Piojos en el estadio Mario Alberto Kempes",
    type_event: {
      "id": 1,
      "name": "Paro",
      "description": "Paro de la empresa ERSA en la ciudad de Córdoba"
    },
    start_date: "2024-08-05",
    end_date: "2024-08-05",
  },
  {
    id: 3,
    title: "Maratón de Córdoba",
    description: "Maratón anual en el centro de la ciudad",
    type_event: {
      "id": 3,
      "name": "Deporte",
      "description": "Maratón anual en el centro de la ciudad"
    },
    start_date: "2024-08-10",
    end_date: "2024-08-10",
  },
  {
    id: 4,
    title: "Feria de Tecnología",
    description: "Feria de tecnología y startups en el predio ferial",
    type_event: {
      "id": 3,
      "name": "Deporte",
      "description": "Maratón anual en el centro de la ciudad"
    },
    start_date: "2024-08-15",
    end_date: "2024-08-17",
  },
  {
    id: 5,
    title: "Taller de cocina",
    description: "Taller de cocina saludable en el parque Sarmiento",
    type_event: "Taller",
    start_date: "2024-08-20",
    end_date: "2024-08-20",
  },
  {
    id: 6,
    title: "Exposición de arte",
    description: "Exposición de arte contemporáneo en el museo Caraffa",
    type_event: "Exposición",
    start_date: "2024-08-25",
    end_date: "2024-08-30",
  },
  {
    id: 7,
    title: "Carrera de autos",
    description: "Carrera de autos en el autódromo Oscar Cabalén",
    type_event: "Carrera",
    start_date: "2024-09-01",
    end_date: "2024-09-01",
  },
  {
    id: 8,
    title: "Festival de Jazz",
    description: "Festival de Jazz en la Plaza de la Música",
    type_event: "Festival",
    start_date: "2024-09-05",
    end_date: "2024-09-07",
  },
  {
    id: 9,
    title: "Curso de fotografía",
    description: "Curso intensivo de fotografía en el centro cultural",
    type_event: "Curso",
    start_date: "2024-09-10",
    end_date: "2024-09-12",
  },
  {
    id: 10,
    title: "Competencia de robótica",
    description: "Competencia de robótica en la facultad de ingeniería",
    type_event: "Competencia",
    start_date: "2024-09-15",
    end_date: "2024-09-16",
  },
];

export default function EventsPage() {
  const [isOpenDrawer, setOpenDrawer] = useState(true)
  const [events, setEvents] = useState([]);
  const [eventsType, setTypeEvent] = useState("");

  function handleChangeDrawer () {
    setOpenDrawer(!isOpenDrawer)
  }

  useEffect(() => {
    let data = data_events
    // hacer todo devuelta

    if (eventsType !== "") {
      data = events.filter(event => {return event.type_event.id === eventsType})
    }
    setEvents(data)
  }, [eventsType])

  return (
    <div className="page-events">
      <Typography variant="h3">Eventos</Typography>

      <EventFilters 
        isDirective={true} 
        setTypeEvent={setTypeEvent}
        openForm={() => setOpenDrawer(true)} 
      />

      <div className="events-cards">
        {events.map((event) => {
          return (
            <CardEvents
              key={event.id}
              title={event.title}
              description={event.description}
              type_event={event.type_event}
            />
          );
        })}
      </div>

      {isOpenDrawer &&
       <Drawer 
          content={<FormEvent />}
          onClose={handleChangeDrawer}
          title="Agregar Materia"
        />
      }
      
    </div>
  );
}
