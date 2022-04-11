import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search component', () => {
  const searchWord = 'test search 123';
  const setter = jest.fn();
  it('render empty search component', () => {
    render(<Search setSearchWord={setter} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('search input changes', () => {
    render(<Search setSearchWord={setter} />);
    const input = screen.getByRole('searchbox');
    userEvent.type(input, searchWord);
    expect(input).toHaveValue(searchWord);
  });

  it('search word save after unmount in local storage', () => {
    const { unmount } = render(<Search setSearchWord={setter} />);
    unmount();
    expect(localStorage.getItem('searchWord')).toEqual(searchWord);
  });

  it('search word restore from local storage', () => {
    const testValue = 'new test value 12345';
    localStorage.setItem('searchWord', testValue);
    render(<Search setSearchWord={setter} />);
    expect(screen.getByRole('searchbox')).toHaveValue(testValue);
  });
});
