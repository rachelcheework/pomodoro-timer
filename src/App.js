import logo from './logo.svg';
import './App.css';
import CountdownCircle from './Timer/CountdownCircle';
import Settings from './Settings/Settings';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavBar from './SideNavBar/components/SideNavBar';

function App() {
  const [sessionCounter, setSessionCounter] = useState(0); //keeps track of the number of completed sessions
  const [isWork, setIsWork] = useState(true);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoStart, setAutoStart] = useState(false);
  const [newSession, setNewSession] = useState(true);

  const [settings, setSettings] = useState({
    workTime: 25*60,
    shortBreak: 5*60,
    longBreak: 15*60,
    maxSessions: 5,
    autoStart: false,
  });

  const updateSetting = (key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: key === 'maxSessions' ? value : (value*60)
    }));
      
  };

  return (
    <Router>
      <div>
        <SideNavBar newSession={newSession}/>
        <Routes>
            <Route path="/" exact element={<CountdownCircle 
            settings={settings} 
            sessionCounter = {sessionCounter} 
            setSessionCounter = {setSessionCounter}
            isWork = {isWork} 
            setIsWork={setIsWork}
            isLongBreak={isLongBreak} 
            setIsLongBreak={setIsLongBreak}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            autoStart = {autoStart}
            setNewSession = {setNewSession}
            />}/>

            <Route path='/settings' element={<Settings 
            settings={settings}
            updateSetting={updateSetting}
            autoStart={autoStart}
            setAutoStart = {setAutoStart}
             />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
