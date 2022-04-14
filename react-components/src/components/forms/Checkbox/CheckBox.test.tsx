import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './CheckBox';

const setError = jest.fn();
const message = 'some_error_message';

describe('Checkbox component', () => {
  it('render checkbox without error', () => {
    render(<Checkbox setError={setError} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('render checkbox with error', () => {
    render(<Checkbox message={message} setError={setError} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('checkbox works', () => {
    render(<Checkbox setError={setError} />);
    const input = screen.getByRole('checkbox');
    userEvent.click(input);
    expect(screen.getByRole('checkbox')).toBeChecked();
    userEvent.click(input);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
