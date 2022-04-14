import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from './DatePicker';

const setError = jest.fn();
const message = 'some_error_message';

describe('Datepicker component', () => {
  it('render datepicker without error', () => {
    render(<DatePicker setError={setError} />);
    expect(screen.getByLabelText(/delivery date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delivery date/i)).toHaveValue('');
  });

  it('render datepicker with error', () => {
    render(<DatePicker message={message} setError={setError} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('datepicker works', () => {
    render(<DatePicker setError={setError} />);
    const input = screen.getByLabelText(/delivery date/i);
    const date = '2022-12-17';
    userEvent.type(input, date);
    expect(input).toHaveValue(date);
    expect(input).toHaveDisplayValue(date);
  });
});
