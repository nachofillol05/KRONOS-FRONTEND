import {React} from "react";
import './selects.scss';

export default function Select(props) {
        const largo = props.largo ? props.largo : 15;
        const datos = props.datos;
        const onChange = props.onChange;
        
        return(
            <>
            <select onChange={onChange} name="TipoDocumento" style={{'--numero': `${largo}px`}} className={props.solid ? 'solid-select' : 'transparent-select'}>
            {datos.map((dato) => {
                            return (
                                <option value={dato}>{dato}</option>
                            )
                        })}
            </select>
            </>
        )
    
}