import {React} from "react";
import './select.scss';

export default function Select(props) {
        const largo = props.largo;
        const datos = props.datos;
        
        return(
            <>
            <select name="TipoDocumento" style={{ '--largo': `${largo}px` }} className={props.solid ? 'solid-select' : 'transparent-select'}>
            {datos.map((dato) => {
                            return (
                                <option value={dato}>{dato}</option>
                            )
                        })}
            </select>
            </>
        )
}