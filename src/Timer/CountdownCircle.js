import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import TimerButtons from "./components/TimerButtons";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const CountdownCircle = ({ settings, sessionCounter, setSessionCounter, isWork, setIsWork, isLongBreak, setIsLongBreak, isPlaying, setIsPlaying, autoStart, setNewSession}) => {
    const [size, setSize] = useState(getSize());
    function getSize() {
        const isMobile = window.innerWidth <= 768; 
        const multiplier = isMobile ? 0.8 : 0.5; 
        return Math.min(window.innerWidth * multiplier, window.innerHeight * multiplier);
    }
    useEffect(() => {
        const handleResize = () => {
            setSize(getSize());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const strokeWidth = size * 0.08;

    const [key, setKey] = useState(0);
    
    const switchMode = () => {
        setKey(prevKey => prevKey + 1); // reset timer key

        //after work timer is completed
        if (isWork) {
            setIsWork(false);
            setSessionCounter(prevCounter => prevCounter + 1);
        } 

        else {
            // after long break is completed, reset everything
            if (isLongBreak) {
                setIsLongBreak(false);
                setSessionCounter(0);
                setIsWork(true);
            } else {
                // after short break is completed
                setIsWork(true);
            }
        }
        setNewSession(!autoStart);
        setIsPlaying(autoStart); // pause timer automatically
    };

    useEffect(() => {
        if (sessionCounter >= settings.maxSessions) {
            setIsLongBreak(true);
            setIsWork(false);
        } else {
            setIsLongBreak(false); // if maxSessions increases, ensure long break is not falsely set
        }
    }, [settings.maxSessions, sessionCounter]);

    

    const timerButtons = [
        { 
            label: 'restart-button', 
            icon: <RestartAltIcon />,
            func: () => {
                setKey(prevKey => prevKey + 1); 
                // setAutoStart(false);
                setIsPlaying(false); 
                setNewSession(true); 
            }
        },
        { 
            label: 'resume-button', 
            icon: isPlaying ? <PauseIcon /> : <PlayArrowIcon />,
            func: () => {
                setIsPlaying(!isPlaying);
                if (!isPlaying) setNewSession(false);
            }
        },
        { 
            label: 'skip-button', 
            icon: <SkipNextIcon />,
            func: () => {
                switchMode(); 
                setIsPlaying(autoStart); 
                setNewSession(!autoStart); 
            }
        }
    ];

    return (
        <div className="page-component">
            <div className="timer-wrapper">
                <CountdownCircleTimer
                key={key} //use for restarting timer
                isPlaying = {isPlaying} //use for pausing/resuming timer
                duration = {isWork ? settings.workTime : isLongBreak ? settings.longBreak : settings.shortBreak}
                colors={isWork ? '#90caf9' : '#FFD580' }
                size={size}
                strokeWidth={strokeWidth}
                onComplete={switchMode}
                children={({remainingTime}) => {
                    const minutes = Math.floor(remainingTime/60)
                    const seconds = remainingTime % 60
                    return (
                        <div>
                            <p className="timer-number">{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
                            <p className="timer-mode-label">{isWork ? 'Focus' : isLongBreak ? 'Long Break' : 'Short Break'}</p>
                        </div>
                    )
                }}/>
            </div>

            <div className="button-wrapper">
                {timerButtons.map(({label, icon, func})=>(
                    <TimerButtons key={label} id={label} label={label} icon={icon} func={func}/>
                ))}
            </div>
            <div className="session-counter-wrapper">
                <h3 id="session-counter"> {sessionCounter} out of {settings.maxSessions} sessions done!</h3>
            </div>

        </div>
    );
};

export default CountdownCircle;