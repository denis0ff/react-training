import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main page', () => {
  it('renders main page', () => {
    render(<Main />);
    expect(screen.getByRole('list')).toBeInTheDocument;
    expect(screen.getByRole('searchbox')).toBeInTheDocument;
  });
});
