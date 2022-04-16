import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './CheckBox';

const message = 'some_error_message';
const func = jest.fn();
const data = {
  name: 'gender',
  options: ['Male', 'Female'],
  register: {
    validate: func,
  },
};

describe('Checkbox component', () => {
  it('render checkbox without error', () => {
    render(<Checkbox data={data} register={func} clearErrors={func} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('render checkbox with error', () => {
    render(<Checkbox data={data} error={message} register={func} clearErrors={func} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('checkbox works', () => {
    render(<Checkbox data={data} register={func} clearErrors={func} />);
    const input = screen.getByRole('checkbox');
    userEvent.click(input);
    expect(screen.getByRole('checkbox')).toBeChecked();
    userEvent.click(input);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
