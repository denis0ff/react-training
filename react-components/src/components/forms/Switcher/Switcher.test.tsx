import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switcher from './Switcher';

const setError = jest.fn();
const message = 'some_error_message';

describe('Switcher component', () => {
  it('render switcher without error', () => {
    render(<Switcher setError={setError} />);
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    screen.getAllByRole('radio').forEach((el) => expect(el).not.toBeChecked());
  });

  it('render switcher with error', () => {
    render(<Switcher message={message} setError={setError} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('switcher works', () => {
    render(<Switcher setError={setError} />);
    const [toggle1, toggle2] = screen.getAllByRole('radio');
    userEvent.click(toggle1);
    expect(toggle1).toBeChecked();
    expect(toggle2).not.toBeChecked();
    userEvent.click(toggle2);
    expect(toggle1).not.toBeChecked();
    expect(toggle2).toBeChecked();
  });
});
