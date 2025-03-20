import React from "react";
import { IconButton } from "@mui/material";

const TimerButtons = ({label, func, icon}) => {
    
    return (
        <IconButton 
            data-testid = {label}
            aria-label = {label}
            id={label}  
            onClick={func}
                sx={{
                    "&:hover": {
                    backgroundColor: "#90caf9", 
                    transform: "scale(1.05)", 
                    transition: "all 0.3s ease-in-out",
                    }
                }}
                >
                {icon}
        </IconButton>
    )
};

export default TimerButtons;