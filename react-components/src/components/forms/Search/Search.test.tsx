import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Search from './Search';
import { setupStore } from '../../../store/store';

const store = setupStore();

describe('Search component', () => {
  const searchWord = 'test search 123';
  it('render empty search component', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('search input changes', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const input = screen.getByRole('searchbox');
    userEvent.type(input, searchWord);
    expect(input).toHaveValue(searchWord);
  });
});
