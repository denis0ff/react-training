import { render, screen } from '@testing-library/react';
import CardGen from './CardGen';

describe('CardGen component', () => {
  it('card renders', () => {
    const card = {
      fullName: 'Denis',
      date: '2022-12-12',
      country: 'Belarus',
      gender: 'Male',
      image: 'test_image1',
    };

    render(
      <CardGen
        fullName={card.fullName}
        date={card.date}
        country={card.country}
        gender={card.gender}
        image={card.image}
      />
    );
    expect(screen.getByText(card.fullName)).toBeInTheDocument();
    expect(screen.getByText(card.date)).toBeInTheDocument();
    expect(screen.getByText(card.country)).toBeInTheDocument();
    expect(screen.getByText(card.gender)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', card.image);
  });
});
