import { render, screen } from '@testing-library/react';
import CardGen from '../../CardGen';
import Generator from './Generator';

const cards = [
  {
    fullName: 'Denis',
    date: '2022-12-12',
    country: 'Belarus',
    gender: 'Male',
    image: 'test_image1',
  },
  {
    fullName: 'Olga',
    date: '2023-12-12',
    country: 'Russia',
    gender: 'Female',
    image: 'test_image2',
  },
];

describe('Generator page', () => {
  it('generator render', () => {
    render(<Generator />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(/card generator/i);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText(/delivery date/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByLabelText(/upload image/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('generator works', () => {
    const cardsState = [cards[0]];
    const { rerender } = render(
      <ul>
        {cardsState.map((item, idx) => (
          <CardGen
            key={idx}
            fullName={item.fullName}
            date={item.date}
            country={item.country}
            gender={item.gender}
            image={item.image}
          />
        ))}
      </ul>
    );

    expect(screen.getByText(cards[0].fullName)).toBeInTheDocument();
    expect(screen.getByText(cards[0].date)).toBeInTheDocument();
    expect(screen.getByText(cards[0].country)).toBeInTheDocument();
    expect(screen.getByText(cards[0].gender)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', cards[0].image);

    cardsState.push(cards[1]);

    rerender(
      <ul>
        {cardsState.map((item, idx) => (
          <CardGen
            key={idx}
            fullName={item.fullName}
            date={item.date}
            country={item.country}
            gender={item.gender}
            image={item.image}
          />
        ))}
      </ul>
    );

    expect(screen.getByText(cards[1].fullName)).toBeInTheDocument();
    expect(screen.getByText(cards[1].date)).toBeInTheDocument();
    expect(screen.getByText(cards[1].country)).toBeInTheDocument();
    expect(screen.getByText(cards[1].gender)).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', cards[1].image);
  });
});
