import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';

const onChange = jest.fn();

describe('Search component', () => {
  it('render search component', () => {
    const searchWord = '';
    render(<Search searchWord={searchWord} setSearchWord={onChange} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument;
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('render search component with value', () => {
    const searchWord = 'some_value';
    render(<Search searchWord={searchWord} setSearchWord={onChange} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument;
    expect(screen.getByRole('searchbox')).toHaveValue('some_value');
  });

  it('onChange works', () => {
    const searchWord = '';
    render(<Search searchWord={searchWord} setSearchWord={onChange} />);
    userEvent.type(screen.getByRole('searchbox'), '12345');
    expect(onChange).toBeCalledTimes(5);
  });
});
