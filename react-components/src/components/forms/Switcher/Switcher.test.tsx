import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switcher from './Switcher';

const message = 'some_error_message';
const func = jest.fn();
const data = {
  name: 'gender',
  options: ['Male', 'Female'],
  register: {
    validate: func,
  },
};

describe('Switcher component', () => {
  it('render switcher without error', () => {
    render(<Switcher data={data} register={func} clearErrors={func} />);
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    screen.getAllByRole('radio').forEach((el) => expect(el).not.toBeChecked());
  });

  it('render switcher with error', () => {
    render(<Switcher data={data} error={message} register={func} clearErrors={func} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('switcher works', () => {
    render(<Switcher data={data} register={func} clearErrors={func} />);
    const [toggle1, toggle2] = screen.getAllByRole('radio');
    userEvent.click(toggle1);
    expect(toggle1).toBeChecked();
    expect(toggle2).not.toBeChecked();
    userEvent.click(toggle2);
    expect(toggle2).toBeChecked();
  });
});
