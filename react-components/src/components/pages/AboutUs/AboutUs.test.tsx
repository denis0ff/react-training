import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs';

describe('About us page', () => {
  it('renders about us page', () => {
    render(<AboutUs />);
    expect(screen.getByText(/About us/i)).toBeInTheDocument();
    expect(screen.getByText(/strongly motivated/i)).toBeInTheDocument();
  });
});
