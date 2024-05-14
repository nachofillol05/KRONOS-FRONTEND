import {React, Component} from 'react';
const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
]

export default function Table(props) {
        const tdStyle={textAlign: 'center',};
        const thStyle={borderBottom: '1px solid black',};
        const tableStyle={
            border: '2px solid forestgreen',
            width: '800px',
            height: '200px',
        };
        
        return(
            <table style={tableStyle}>
                <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Age</th>
                    <th style={thStyle}>Gender</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td style={tdStyle}>{val.name}</td>
                            <td style={tdStyle}>{val.age}</td>
                            <td style={tdStyle}>{val.gender}</td>
                        </tr>
                    )
                })}
            </table>
    );
}