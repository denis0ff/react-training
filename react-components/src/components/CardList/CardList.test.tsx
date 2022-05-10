import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import axiosMock from '../../__mocks__/axios';
import CardList from './CardList';
import { setupStore } from '../../store/store';

const store = setupStore();

const emptyResults = {
  searchWord: '',
  data: { data: { results: [{ name: 'Rick Sanchez' }, { name: 'Morty Smith' }] } },
};

const mortyResults = {
  searchWord: 'morty',
  data: {
    data: {
      results: [{ name: 'Morty Smith' }, { name: 'Alien Morty' }, { name: 'Antenna Morty' }],
    },
  },
};

const incorrectResults = {
  searchWord: 'some_wrong_value_12345',
  data: {
    error: 'There is nothing here',
  },
};

const mockCall = (data: typeof emptyResults.data | typeof incorrectResults.data) =>
  axiosMock.request.mockResolvedValueOnce({
    ...data,
  });

afterEach(() => axiosMock.request.mockClear());

describe('Card list', () => {
  it('show loader while fetching data', async () => {
    mockCall(emptyResults.data);
    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
  });
});
