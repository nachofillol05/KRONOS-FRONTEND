import Typography from "@mui/material/Typography";
import CardEvents from "./cardEvent";

import './events.scss';

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Paro de transporte",
      description: "Paro de la empresa ERSA en la ciudad de Córdoba",
      type_event: "Paro",
    },
    {
      id: 2,
      title: "Concierto de Rock",
      description:
        "Concierto de la banda Los Piojos en el estadio Mario Alberto Kempes",
      type_event: "Concierto",
    },
    {
      id: 3,
      title: "Maratón de Córdoba",
      description: "Maratón anual en el centro de la ciudad",
      type_event: "Deporte",
    },
    {
      id: 4,
      title: "Feria de Tecnología",
      description: "Feria de tecnología y startups en el predio ferial",
      type_event: "Feria",
    },
    {
      id: 5,
      title: "Taller de cocina",
      description: "Taller de cocina saludable en el parque Sarmiento",
      type_event: "Taller",
    },
    {
      id: 6,
      title: "Exposición de arte",
      description: "Exposición de arte contemporáneo en el museo Caraffa",
      type_event: "Exposición",
    },
    {
      id: 7,
      title: "Carrera de autos",
      description: "Carrera de autos en el autódromo Oscar Cabalén",
      type_event: "Carrera",
    },
    {
      id: 8,
      title: "Festival de Jazz",
      description: "Festival de Jazz en la Plaza de la Música",
      type_event: "Festival",
    },
    {
      id: 9,
      title: "Curso de fotografía",
      description: "Curso intensivo de fotografía en el centro cultural",
      type_event: "Curso",
    },
    {
      id: 10,
      title: "Competencia de robótica",
      description: "Competencia de robótica en la facultad de ingeniería",
      type_event: "Competencia",
    },
  ];

  return (
    <div className="page-events">
      <Typography variant="h3">Eventos</Typography>
      <div className="events-cards">
        {events.map(event => {
          return <CardEvents key={event.id} title={event.title} description={event.description} type_event={event.type_event}/>;
        })}
      </div>
    </div>
  );
}
