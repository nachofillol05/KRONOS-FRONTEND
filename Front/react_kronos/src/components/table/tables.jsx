import {React} from 'react';
import './tables.scss';
 
export default function Table({ data = [], columns = []}) {
    return (
        <div className="grid-table">
            <div className="header-container">
                {columns.map((column, index) => (
                    <div className="header" key={index}>{column.header}</div>
                ))}
            </div>
            <div className="data-container">
                {data.map((item, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <div className="cell" key={colIndex}>{item[column.field]}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}