import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';

const setError = jest.fn();
const message = 'some_error_message';
const [Belarus, Russia] = ['Belarus', 'Russia'];

describe('Select component', () => {
  it('render select without error', () => {
    render(<Select setError={setError} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toBeDisabled();
  });

  it('render select with error', () => {
    render(<Select message={message} setError={setError} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('select works', () => {
    render(<Select setError={setError} />);
    const select = screen.getByRole('combobox');
    const [, option2, option3] = screen.getAllByRole('option');
    expect(select).toHaveValue('');
    userEvent.selectOptions(select, option2);
    expect(select).toHaveValue(Belarus);
    expect(select).toHaveTextContent(Belarus);
    userEvent.selectOptions(select, option3);
    expect(select).toHaveValue(Russia);
    expect(select).toHaveTextContent(Russia);
  });
});
