import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from '@mui/material';
import Typography from "@mui/material/Typography";
import Button from './../../components/button/buttons'

export default function CardEvent({ title, description, type_event }) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>

        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            {type_event}
          </Typography>
        </CardContent>

      </CardActionArea>
        <CardActions>
          <Button text={'Ver mas'} numero={10} life={true} />
          <Button text={'Modificar'} numero={10} life={false} />
          <Button text={'Eliminar'} numero={10} life={false} />

        </CardActions>
    </Card>
  );
}
