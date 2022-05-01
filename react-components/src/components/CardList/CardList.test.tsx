import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import axiosMock from '../../__mocks__/axios';
import CardList from './CardList';

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

const getResolve = (word: string) => ({
  baseURL: `https://rickandmortyapi.com/api/character/?name=${word}`,
  headers: { 'Content-type': 'application/json' },
});

describe('Card list', () => {
  it('show loader while fetching data', async () => {
    mockCall(emptyResults.data);
    render(<CardList />);
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
  });

  it('fetches and renders data with empty search word', async () => {
    mockCall(emptyResults.data);
    render(<CardList />);
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByTestId(/loader/i));

    const cards = await screen.findAllByTestId(/card/i);

    expect(cards).toHaveLength(2);
    expect(cards.map((card) => card.textContent)).toEqual(
      emptyResults.data.data.results.map(({ name }) => name)
    );
    expect(axiosMock.request).toHaveBeenCalledWith(getResolve(emptyResults.searchWord));
    expect(axiosMock.request).toHaveBeenCalledTimes(1);
  });

  it('fetches and renders data with some search word', async () => {
    mockCall(mortyResults.data);
    render(<CardList />);
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByTestId(/loader/i));

    const cards = await screen.findAllByTestId(/card/i);

    expect(cards).toHaveLength(3);
    expect(cards.map((card) => card.textContent)).toEqual(
      mortyResults.data.data.results.map(({ name }) => name)
    );
    expect(axiosMock.request).toHaveBeenCalledWith(getResolve(mortyResults.searchWord));
    expect(axiosMock.request).toHaveBeenCalledTimes(1);
  });

  it('render error when data was not found', async () => {
    mockCall(incorrectResults.data);
    render(<CardList />);
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByTestId(/loader/i));

    expect(screen.getByTestId(/not-found/i)).toBeInTheDocument();
    expect(axiosMock.request).toHaveBeenCalledWith(getResolve(incorrectResults.searchWord));
    expect(axiosMock.request).toHaveBeenCalledTimes(1);
  });
});
