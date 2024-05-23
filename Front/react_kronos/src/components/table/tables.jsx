import {React} from 'react';
import './tables.scss';


export default function Table(props) {
    const { data, columns } = props;
    console.log("las teachers son ",data);
    console.log(columns);
    return(
    <div class="grid-table">
        <div class="header-container">
            {columns.map((column, key) => {
                return (
                    <div class="cell">{column.header}</div>
                )
            })}
        </div>
        <div class="data-container">
            {data.map((row, key) => {
                return (
                    <div class="data-row" key={key}>
                        {columns.map((column, colKey) => {
                            return (
                                <div class="data-cell" key={colKey}>{row[column.field]}</div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}