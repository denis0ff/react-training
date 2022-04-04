import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { data } from '../../utils/data/data';

describe('List component', () => {
  it('List render', () => {
    render(<CardList data={data} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
