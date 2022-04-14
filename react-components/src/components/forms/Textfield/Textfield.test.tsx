import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textfield from './Textfield';

const setError = jest.fn();
const message = 'some_error_message';

describe('Textfield component', () => {
  it('render textfield without error', () => {
    render(<Textfield setError={setError} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('render textfield with error', () => {
    render(<Textfield message={message} setError={setError} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('textfield works', () => {
    render(<Textfield setError={setError} />);
    const input = screen.getByRole('textbox');
    const text = 'some_input_text';
    userEvent.type(input, text);
    expect(input).toHaveValue(text);
    expect(input).toHaveDisplayValue(text);
  });
});
