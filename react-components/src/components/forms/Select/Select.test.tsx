import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';

const message = 'some_error_message';
const func = jest.fn();
const data = {
  name: 'country',
  label: 'Country',
  options: ['', 'Belarus', 'Russia', 'Ukraine'],
  register: {
    validate: func,
  },
};

describe('Select component', () => {
  it('render select without error', () => {
    render(<Select data={data} register={func} clearErrors={func} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toBeDisabled();
  });

  it('render select with error', () => {
    render(<Select data={data} error={message} register={func} clearErrors={func} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('select works', () => {
    render(<Select data={data} register={func} clearErrors={func} />);
    const select = screen.getByRole('combobox');
    const [, option1, option2] = screen.getAllByRole('option');
    expect(select).toHaveValue('');
    userEvent.selectOptions(select, option1);
    expect(select).toHaveValue(data.options[1]);
    expect(select).toHaveTextContent(data.options[1]);
    userEvent.selectOptions(select, option2);
    expect(select).toHaveValue(data.options[2]);
    expect(select).toHaveTextContent(data.options[2]);
  });
});
