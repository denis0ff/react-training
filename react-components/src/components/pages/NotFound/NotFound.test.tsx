import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';

describe('Not found page', () => {
  it('renders 404 page', () => {
    render(<NotFound />);
    expect(screen.getByText(/404 error/i)).toBeInTheDocument();
  });
});
