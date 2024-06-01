import {React} from "react";
import './select.scss';

export default function Select(props) {
        const largo = props.largo ? props.numero: 30;
        const datos = props.datos;
        const onChange = props.onChange;
        
        return(
            <>
            <select onChange={onChange} name="TipoDocumento" style={{'--largo': `${largo}px`}} className={props.solid ? 'solid-select' : 'transparent-select'}>
            {datos.map((dato) => {
                            return (
                                <option value={dato}>{dato}</option>
                            )
                        })}
            </select>
            </>
        )
}