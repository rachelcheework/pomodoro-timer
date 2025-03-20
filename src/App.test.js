// App.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  test('renders Timer and Settings components', () => {
    render(<App />);
    
    // check if both main navigation items are present
    expect(screen.getByText(/Timer/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });

  test('navigates between Timer and Settings pages', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    // App should start with Timer view
    expect(screen.getByText('25:00')).toBeInTheDocument();
    
    // Navigate to Settings
    await user.click(screen.getByText(/Settings/i));
    expect(screen.getByText(/Work Duration/i)).toBeInTheDocument();
    
    // Navigate back to Timer
    await user.click(screen.getByText(/Timer/i));
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });
});