import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main page', () => {
  it('renders main page', () => {
    render(<Main />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument;
  });

  it('search word restore from local storage', () => {
    const testValue = 'new test value 12345';
    localStorage.setItem('searchWord', testValue);
    render(<Main />);
    expect(screen.getByRole('searchbox')).toHaveValue(testValue);
  });
});
