// Timer.test.js
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountdownCircle from './CountdownCircle';

describe('CountdownCircle Component', () => {
  // mock functions to pass as props just for testing
  const mockSetSessionCounter = jest.fn();
  const mockSetIsWork = jest.fn();
  const mockSetIsLongBreak = jest.fn();
  const mockSetIsPlaying = jest.fn();
  const mockSetNewSession = jest.fn();
  
  const defaultProps = {
    settings: {
      workTime: 25 * 60, 
      shortBreak: 5 * 60, 
      longBreak: 15 * 60,
      maxSessions: 5,
      autoStart: false,
    },
    sessionCounter: 0,
    setSessionCounter: mockSetSessionCounter,
    isWork: true,
    setIsWork: mockSetIsWork,
    isLongBreak: false,
    setIsLongBreak: mockSetIsLongBreak,
    isPlaying: false,
    setIsPlaying: mockSetIsPlaying,
    autoStart: false,
    setNewSession: mockSetNewSession
  };

  beforeEach(() => {
    jest.setTimeout(10000); 
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders timer with correct initial time', () => {
    render(<CountdownCircle {...defaultProps} />);
    
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
    expect(screen.getByText('0 out of 5 sessions done!')).toBeInTheDocument();
  });

  test('play button starts the timer', async () => {
    render(<CountdownCircle {...defaultProps} />);
    const user = userEvent.setup();
    // const resumeDiv = screen.getByTestId('resume-button');
    // const playButton = within(resumeDiv).getByRole('button');
    const playButton = screen.getByTestId('resume-button');

    await user.click(playButton);
    expect(mockSetIsPlaying).toHaveBeenCalledWith(true);    
  });

  test('pause button pauses the timer', async () => {
    render(<CountdownCircle {...defaultProps} isPlaying={true} />);
    const user = userEvent.setup();
    // const resumeDiv = screen.getByTestId('resume-button');
    // const playButton = within(resumeDiv).getByRole('button');
    const pauseButton = screen.getByTestId('resume-button');

    await user.click(pauseButton);
    expect(mockSetIsPlaying).toHaveBeenCalledWith(false);
  });


  test('restart button resets the timer', async () => {
    render(<CountdownCircle {...defaultProps} />);
    const user = userEvent.setup();
    // const restartDiv = screen.getByTestId('restart-button');
    // const restartButton = within(restartDiv).getByRole('button');
    const restartButton = screen.getByTestId('restart-button');

    await user.click(restartButton);
    expect(mockSetNewSession).toHaveBeenCalledWith(true);
  });

  test('skip button changes timer state', async () => {
    render(<CountdownCircle {...defaultProps} />);
    const user = userEvent.setup();
    // const skipDiv = screen.getByTestId('skip-button');
    // const skipButton = within(skipDiv).getByRole('button');
    const skipButton = screen.getByTestId('skip-button');

    await user.click(skipButton);
    expect(mockSetIsWork).toHaveBeenCalledWith(false);
  });

  test('timer counts down when playing', () => {
    jest.useFakeTimers();
    render(<CountdownCircle {...defaultProps} isPlaying={true} />);
    expect(screen.getByText('25:00')).toBeInTheDocument();
    
    // fast-forward timer
    act(() => {
      jest.advanceTimersByTime(1000 + 100); //adding a small buffer to ensure everything has time to update
    });
    
    expect(screen.getByText('24:59')).toBeInTheDocument();
  });

  test('transitions from work to short break and increments session counter', () => {
    jest.useFakeTimers();
    render(<CountdownCircle {...defaultProps} isPlaying={true}/>);
    
    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000 + 100); 
    });

    expect(mockSetIsWork).toHaveBeenCalledWith(false);
    expect(mockSetSessionCounter).toHaveBeenCalled();
  });

  test('transitions from short break to work', async() => {
    jest.useFakeTimers();
    const shortBreakToWorkProps = {
      ...defaultProps,
      isWork: false,
      sessionCounter: 1,
      isPlaying: true
    };
    render(<CountdownCircle {...shortBreakToWorkProps} />);

    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000 + 100);
    });

    expect(mockSetIsWork).toHaveBeenCalledWith(true);
  });

  test('long break occurs after set number of sessions', () => {
    jest.useFakeTimers();
    const { rerender } = render(<CountdownCircle {...defaultProps}/>);
    const workToLongBreakProps = {
      ...defaultProps,
      isWork: true,
      sessionCounter: 4,
      isPlaying: true
    };
    render(<CountdownCircle {...workToLongBreakProps} />);
    
    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000 + 100);
    });

    expect(mockSetIsWork).toHaveBeenCalledWith(false);
    expect(mockSetSessionCounter).toHaveBeenCalled();

    rerender(<CountdownCircle {...defaultProps} isPlaying={true} sessionCounter={5}/>);

    expect(mockSetIsLongBreak).toHaveBeenCalledWith(true);
  });

  test('transitions from long break to work', async() => {
    jest.useFakeTimers();
    const longBreakToWorkProps = {
      ...defaultProps,
      isWork: false,
      isLongBreak: true,
      sessionCounter: 5,
      isPlaying: true
    };
    render(<CountdownCircle {...longBreakToWorkProps} />);

    act(() => {
      jest.advanceTimersByTime(15 * 60 * 1000 + 100);
    });

    expect(mockSetIsWork).toHaveBeenCalledWith(true);
    expect(mockSetSessionCounter).toHaveBeenCalledWith(0);
  });
  
  test('auto start feature starts next timer automatically', () => {
    jest.useFakeTimers();
    const autoStartProps = {
      ...defaultProps,
      isWork: false,
      isPlaying: true,
      autoStart: true
    };
    render(<CountdownCircle {...autoStartProps} />);
    
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000 + 100);
    });
    
    expect(mockSetIsPlaying).toHaveBeenCalledWith(true);
  });
});