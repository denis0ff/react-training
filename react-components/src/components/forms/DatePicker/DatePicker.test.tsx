import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from './DatePicker';

const message = 'some_error_message';
const func = jest.fn();
const data = {
  name: 'date',
  label: 'Delivery date',
  register: {
    validate: func,
  },
};

describe('Datepicker component', () => {
  it('render datepicker without error', () => {
    render(<DatePicker data={data} register={func} clearErrors={func} />);
    expect(screen.getByLabelText(data.label)).toBeInTheDocument();
    expect(screen.getByLabelText(data.label)).toHaveValue('');
  });

  it('render datepicker with error', () => {
    render(<DatePicker data={data} error={message} register={func} clearErrors={func} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('datepicker works', () => {
    render(<DatePicker data={data} register={func} clearErrors={func} />);
    const input = screen.getByLabelText(data.label);
    const date = '2022-12-17';
    userEvent.type(input, date);
    expect(input).toHaveValue(date);
    expect(input).toHaveDisplayValue(date);
  });
});
