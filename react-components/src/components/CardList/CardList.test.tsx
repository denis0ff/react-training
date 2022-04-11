import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  axiosMock.get.mockResolvedValueOnce({
    ...data,
  });

afterEach(() => axiosMock.get.mockClear());

const getUrl = (word: string) => `https://rickandmortyapi.com/api/character/?name=${word}`;

describe('Card list', () => {
  it('show loader while fetching data', async () => {
    mockCall(emptyResults.data);
    render(<CardList searchWord={emptyResults.searchWord} />);
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
  });

  it('fetches and renders data with empty search word', async () => {
    mockCall(emptyResults.data);
    render(<CardList searchWord={emptyResults.searchWord} />);
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByTestId(/loader/i));

    const cards = await screen.findAllByTestId(/card/i);

    expect(cards).toHaveLength(2);
    expect(cards.map((card) => card.textContent)).toEqual(
      emptyResults.data.data.results.map(({ name }) => name)
    );
    expect(axiosMock.get).toHaveBeenCalledWith(getUrl(emptyResults.searchWord));
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
  });

  it('fetches and renders data with some search word', async () => {
    mockCall(mortyResults.data);
    render(<CardList searchWord={mortyResults.searchWord} />);
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByTestId(/loader/i));

    const cards = await screen.findAllByTestId(/card/i);

    expect(cards).toHaveLength(3);
    expect(cards.map((card) => card.textContent)).toEqual(
      mortyResults.data.data.results.map(({ name }) => name)
    );
    expect(axiosMock.get).toHaveBeenCalledWith(getUrl(mortyResults.searchWord));
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
  });

  it('render error when data was not found', async () => {
    mockCall(incorrectResults.data);
    render(<CardList searchWord={incorrectResults.searchWord} />);
    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByTestId(/loader/i));

    expect(screen.getByTestId(/not-found/i)).toBeInTheDocument();
    expect(axiosMock.get).toHaveBeenCalledWith(getUrl(incorrectResults.searchWord));
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
  });
});

const modalResult = {
  searchWord: 'morty',
  data: {
    data: {
      results: [
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'unknown',
            url: '',
          },
          location: {
            name: 'Citadel of Ricks',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          created: '2017-11-04T18:50:21.651Z',
        },
      ],
    },
  },
};

describe('Modal works', () => {
  it('modal is displayed with card values', async () => {
    mockCall(modalResult.data);
    render(<CardList searchWord={modalResult.searchWord} />);

    const cards = await screen.findAllByTestId(/card/i);
    const modal = screen.getByTestId(/modal-window/i);

    expect(modal).toHaveClass('hide');
    userEvent.click(cards[0]);
    expect(modal).not.toHaveClass('hide');

    const { name, status, species, gender, created, image, origin, location } =
      modalResult.data.data.results[0];

    expect(screen.getAllByText(name)).toHaveLength(2);
    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText(species)).toBeInTheDocument();
    expect(screen.getByText(gender)).toBeInTheDocument();
    expect(screen.getByText(created.slice(0, 10))).toBeInTheDocument();
    expect(screen.getByText(origin.name)).toBeInTheDocument();
    expect(screen.getByText(location.name)).toBeInTheDocument();
    expect(screen.getByTestId<HTMLImageElement>(/modal-image/i).src).toEqual(image);
  });

  it('modal is closing on overlay click', async () => {
    mockCall(modalResult.data);
    render(<CardList searchWord={modalResult.searchWord} />);

    const cards = await screen.findAllByTestId(/card/i);
    const modal = screen.getByTestId(/modal-window/i);

    expect(modal).toHaveClass('hide');
    userEvent.click(cards[0]);
    expect(modal).not.toHaveClass('hide');

    userEvent.click(modal);
    expect(modal).toHaveClass('hide');
  });

  it('modal is not closing on content click', async () => {
    mockCall(modalResult.data);
    render(<CardList searchWord={modalResult.searchWord} />);

    const cards = await screen.findAllByTestId(/card/i);
    const modal = screen.getByTestId(/modal-window/i);
    const modalContainer = screen.getByTestId(/modal-container/i);

    expect(modal).toHaveClass('hide');
    userEvent.click(cards[0]);
    expect(modal).not.toHaveClass('hide');

    userEvent.click(modalContainer);
    expect(modal).not.toHaveClass('hide');
  });

  it('modal is closing on close button click', async () => {
    mockCall(modalResult.data);
    render(<CardList searchWord={modalResult.searchWord} />);

    const cards = await screen.findAllByTestId(/card/i);
    const modal = screen.getByTestId(/modal-window/i);
    const modalClose = screen.getByTestId(/modal-close/i);

    expect(modal).toHaveClass('hide');
    userEvent.click(cards[0]);
    expect(modal).not.toHaveClass('hide');

    userEvent.click(modalClose);
    expect(modal).toHaveClass('hide');
  });
});
