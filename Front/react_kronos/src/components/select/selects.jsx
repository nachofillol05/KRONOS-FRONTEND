import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants(props) {
    const { datos = [], label } = props; // Set default value for datos
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedValue}
                    onChange={handleChange}
                    label={label}
                >
                    {datos.length > 0 ? (
                        datos.map((dato) => (
                            <MenuItem key={dato.id} value={dato.id}>{dato.name}</MenuItem>
                        ))
                    ) : (
                        <MenuItem value="" disabled>No options available</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );
}
