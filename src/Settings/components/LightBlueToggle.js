import React from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

const LightBlueToggle = ({name, checked, onChange, inputProps}) => {
    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography>{name}</Typography>
            <Switch
            checked={checked} 
            onChange={onChange} 
            inputProps={inputProps}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: "#42a5f5" },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: "#90caf9" },}}
            />
        </Stack>
    )
};

export default LightBlueToggle;