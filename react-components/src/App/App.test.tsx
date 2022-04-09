import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('app renders', () => {
    render(<App />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByText(/main/i)).toBeInTheDocument();
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });
});
