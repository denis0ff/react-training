import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';

describe('List component', () => {
  it('List render', () => {
    render(<CardList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
