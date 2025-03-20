import React from "react";
import LightBlueSlider from "./components/LightBlueSlider";
import LightBlueToggle from "./components/LightBlueToggle";

const Settings = ({ settings, updateSetting, autoStart, setAutoStart}) => {
  // {name, label, min, max, defaultValue, marks}
  const settingsList = [
    { name: "Work Duration", label: "workTime", min: 5, max: 60, defaultValue: settings.workTime/60,
      marks: [
      { value: 5, label: '5 mins' },
      { value: 25, label: '25 mins' },
      { value: 60, label: '60 mins' },
    ] },

    { name: "Short Break Duration", label: "shortBreak", min: 1, max: 30, defaultValue: settings.shortBreak/60,
      marks:  [
      { value: 1, label: '1 min' },
      { value: 5, label: '5 mins' },
      { value: 30, label: '30 mins' },
    ] },


    { name: "Long Break Duration", label: "longBreak", min: 1, max: 45, defaultValue: settings.longBreak/60,
      marks:[
        { value: 1, label: '1 min' },
        { value: 15, label: '15 mins' },
        { value: 45, label: '45 mins' },
    ] },


    { name: "Sessions", label: "maxSessions", min: 1, max: 20, defaultValue: settings.maxSessions,
      marks:  [
        { value: 1, label: '1' },
        { value: 5, label: '5' },
        { value: 20, label: '20' },
      ]}
  ];


  // {name, checked, onChange, inputProps}
  const toggleButtonProps = [
    {name: 'Auto Start', checked: autoStart, onChange: () => setAutoStart(prev => !prev), inputProps: { 'aria-label': 'autoStart' }},
  ]
  
  function valuetext(value) {
    return `${value}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const intValue = parseInt(value, 10);
    updateSetting(name, intValue);
  };

  return (
    <div className="page-component">
      <div className="settings">
      {settingsList.map(({name, label, min, max, defaultValue, marks})=>(
        <LightBlueSlider key={name} name={name} label={label} min={min} max={max} defaultValue={defaultValue} marks={marks} handleChange={handleChange} valuetext={valuetext}/>
      ))}

      {toggleButtonProps.map(({name, checked, onChange, inputProps})=>(
        <LightBlueToggle key={name} name={name} checked={checked} onChange={onChange} inputProps={inputProps}/>
      ))}
      </div>
    </div>
  );
};

export default Settings;
