// Settings.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App'; 
import userEvent from '@testing-library/user-event';
import Settings from './Settings';

describe('Settings Component', () => {
  // mock functions to pass as props just for testing
  const mockUpdateSetting = jest.fn();
  const mockSetAutoStart = jest.fn();

  const defaultProps = {
    settings: {
      workTime: 25 * 60, 
      shortBreak: 5 * 60, 
      longBreak: 15 * 60,
      maxSessions: 5,
      autoStart: false,
    },
    updateSetting: mockUpdateSetting,
    autoStart: false,
    setAutoStart: mockSetAutoStart
  };

  beforeEach(() => {
    jest.setTimeout(10000); 
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  
  test('renders all settings options', () => {
    render(<Settings {...defaultProps}/>);
    
    expect(screen.getByText(/Work Duration/i)).toBeInTheDocument();
    expect(screen.getByText(/Short Break Duration/i)).toBeInTheDocument();
    expect(screen.getByText(/Long Break Duration/i)).toBeInTheDocument();
    expect(screen.getByText(/Sessions/i)).toBeInTheDocument();
    expect(screen.getByText(/Auto Start/i)).toBeInTheDocument();
  });

  test('settings sliders have correct initial values', () => {
    render(<Settings {...defaultProps}/>);

    // const workTimeSlider = screen.getByTestId('workTime');
    // expect(workTimeSlider).toBeInTheDocument();
    // expect(workTimeSlider).toHaveTextContent("25 mins");

    const workTimeSlider = screen.getByLabelText('workTime');
    expect(workTimeSlider).toBeInTheDocument();
    expect(workTimeSlider.tagName).toBe('INPUT');
    expect(workTimeSlider).toHaveAttribute('aria-valuenow', '25');

    const shortBreakSlider = screen.getByLabelText('shortBreak');
    expect(shortBreakSlider).toBeInTheDocument();
    expect(shortBreakSlider.tagName).toBe('INPUT');
    expect(shortBreakSlider).toHaveAttribute('aria-valuenow', '5');

    const longBreakSlider = screen.getByLabelText('longBreak');
    expect(longBreakSlider).toBeInTheDocument();
    expect(longBreakSlider.tagName).toBe('INPUT');
    expect(longBreakSlider).toHaveAttribute('aria-valuenow', '15');

    const sessionsSlider = screen.getByLabelText('maxSessions');
    expect(sessionsSlider).toBeInTheDocument();
    expect(sessionsSlider.tagName).toBe('INPUT');
    expect(sessionsSlider).toHaveAttribute('aria-valuenow', '5');


    const autoStartToggle = screen.getByRole('checkbox');;
    expect(autoStartToggle).toBeInTheDocument();
    expect(autoStartToggle).not.toBeChecked();
  });

  test('changing work duration slider calls update function', async () => {
    render(<Settings {...defaultProps}/>);
    
    const user = userEvent.setup();
    const workTimeSlider = screen.getByLabelText('workTime');
    expect(workTimeSlider.tagName).toBe('INPUT');
    expect(workTimeSlider).toHaveAttribute('aria-valuenow', '25');
    fireEvent.change(workTimeSlider, { target: { value: 30 } });
    expect(mockUpdateSetting).toHaveBeenCalled();
    expect(workTimeSlider).toHaveAttribute('aria-valuenow', '30');

  });

  test('toggling auto start calls update function', async () => {
    render(<Settings {...defaultProps} autoStart={true}/>);
    
    const user = userEvent.setup();
    const autoStartToggle = screen.getByRole('checkbox');
    await user.click(autoStartToggle);
    
    expect(autoStartToggle).toBeChecked();    
  });

  test('changing settings affects timer display', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    // initial timer should be 25:00
    expect(screen.getByText('25:00')).toBeInTheDocument();
    
    // navigate to Settings
    await user.click(screen.getByText(/Settings/i));
    
    // change work duration slider to 30 mins
    const workTimeSlider = screen.getByLabelText('workTime');
    fireEvent.change(workTimeSlider, { target: { value: 30 } });
    
    // go back to Timer
    await user.click(screen.getByText(/Timer/i));
    
    // timer should reflect new setting (30:00)
    expect(screen.getByText('30:00')).toBeInTheDocument();
  });
});



  

