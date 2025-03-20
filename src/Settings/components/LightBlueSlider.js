import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const LightBlueSlider = ({name, label, min, max, defaultValue, marks, valuetext, handleChange}) => {

    return (
          <Box>
          <Typography id="input-slider" gutterBottom>
            {name}
          </Typography>
          <Slider
          aria-label={label}
          data-testid = {label}
          defaultValue={defaultValue}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={min}
          max={max}
          name={label}
          onChange={handleChange} 
          sx={{color: "#ADD8E6",
            "& .MuiSlider-thumb": { backgroundColor: "#42a5f5" },
            "& .MuiSlider-track": { backgroundColor: "#90caf9" },
            "& .MuiSlider-rail": { backgroundColor: "#42a5f5" },}}
          />
      </Box>
    )
};

export default LightBlueSlider;