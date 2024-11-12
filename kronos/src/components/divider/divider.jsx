import React from 'react';
import { Box, Button, Divider } from '@mui/material';

const CustomStepperButtons = () => {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Button
                variant="contained"
                sx={{
                    minWidth: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    padding: 0,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                }}
            >
                1
            </Button>
            <Button
                variant="contained"
                sx={{
                    minWidth: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    padding: 0,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                }}
            >
                2
            </Button>
            <Button
                variant="contained"
                sx={{
                    minWidth: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    padding: 0,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                }}
            >
                3
            </Button>
        </Box>
    );
};

export default CustomStepperButtons;
