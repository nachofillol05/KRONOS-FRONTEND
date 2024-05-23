import {React} from "react";
import './select.scss';

export default function Select(props) {
        const largo = props.largo ? props.numero:98;

        return(
            <>
            <select name="TipoDocumento" style={{'--largo': `${largo}px`}} className={props.solid ? 'solid-select' : 'transparent-select'}>
                <option value="">Selecciona</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Cedula">Cedula</option>
            </select>
            </>
        )
}